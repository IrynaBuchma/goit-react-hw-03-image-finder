import React, { Component } from 'react';
import Button from '../components/Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from '../service/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';

export class App extends Component {
  
  state = {
    inputData: '',
    images:[],
    totalHits: 0,
    page: 1,
    status: 'idle',
    isButtonShown: false,
  }
  
  componentDidUpdate(prevProps) {

    const inputData = this.props.inputData;
    const page = this.props.page;

    if (inputData !== prevProps.inputData || page !== prevProps.page) {
      this.fetchData(inputData, page);
    }
  }

  handleFormsubmit = (inputData) => {

      this.setState({ inputData });
    }

  fetchData = async(inputData, page) => {
      
      try {
        this.setState({ status: 'pending'});
        const { totalHits, hits } = await fetchImages(inputData, page);
          if(hits.length < 1) {
          this.setState({ status: 'idle'});
          Notiflix.Notify.info('Sorry, there are no images matching your search query');
          return;
          }
              this.setState(prevProps => ({
              images: [...prevProps.images, ...hits],
              totalHits: totalHits,
              isButtonShown: true,
              status: 'resolved',
              }))
          }
      
      catch (error) {
        this.setState({ status: 'rejected' });
      }
    }  

  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isButtonShown: true,
    }))
  }
    
  render() {

    const { totalHits, status, images, page } = this.state;

    if (status === 'idle') {
      return (
        <div className='app'>
          <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
        </div>
      )
    }

    if (status === 'pending') {
      return (
      <div className='app'>
        <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
        <ImageGallery page={page} images={images}></ImageGallery>
        <Loader></Loader>
        {totalHits > 12 && <Button onClick={this.onNextPage}></Button>}
      </div> 
      )
    }

    if (status === 'rejected') {
      return (
        <div className='app'>
          <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
          <p>Something went wrong, please try again later</p>
        </div>
      )
    }

    if (status === 'resolved') {
      return (
        <div className='app'>
          <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
          <ImageGallery page={page} images={images}></ImageGallery>
          {totalHits > 12 && totalHits > images.length && (
          <Button onClick={this.onNextPage}></Button>
          )}
        </div>
      );
    }
  }
}