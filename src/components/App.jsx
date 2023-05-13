import React, { Component } from 'react';
// import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
// import {ReactComponent as SearchIcon} from './icons/search.svg';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './FetchImages/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';

export class App extends Component {

  state = {
    inputData: '',
    images:[],
    status: 'idle',
    totalHits: 0,
    page: 1
  }

  componentDidUpdate(prevState) {
    if (this.state.inputData !== prevState.inputData) {
      this.onNextPage(this.state.inputData);
    }
    return;
  }

  fetchData = async (inputData) => {
      try {
        this.setState({ status: 'pending'});
        const { totalHits, hits, page } = await fetchImages(inputData);
          if(hits.length < 1) {
          this.setState({ status: 'idle'});
          Notiflix.Notify.info('Sorry, there are no images matching your search query');
          }
        else {
          this.setState({
            images: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
            page,
          })
        }
      }
      catch (error) {
        this.setState({ status: 'rejected' });
      }
    }    

  handleFormsubmit = async (inputData) => {

    if(inputData.trim() === '') {
      Notiflix.Notify.failure('Please input request data');
      return;
    } 
    else {
      this.fetchData(inputData);
    }
  }

  onNextPage = async() => {
    this.setState({ status: 'pending' });

    try {
      const { inputData, page } = this.state;
      const { hits } = await fetchImages(inputData, page + 1);
      this.setState(prevState => ({
        page: prevState.page + 1,
        images: [...prevState.images, ...hits],
        status: 'resolved'
      }))

    } catch (error) {
      this.setState({ status: 'rejected' });
    }
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