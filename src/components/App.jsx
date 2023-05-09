import React, { Component } from 'react';
// import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
// import {ReactComponent as SearchIcon} from './icons/search.svg';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './FetchImages/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
// import Notiflix from 'notiflix';

let page = 1;
export class App extends Component {

  state = {
    inputData: '',
    images:[],
    status: 'idle',
    totalHits: 0,
  }

  handleFormsubmit = async inputData => {
    page = 1;

    if(inputData.trim() === '') {
      Notiflix.Notify.failure('Please input request data');
      return;
    }
    else {
      try {
        this.setState({ status: 'pending'});
        const { totalHits, hits } = await fetchImages(inputData, page);
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
          })
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }     
  }
  onNextPage = async() => {
    this.setState({ status: 'pending' });

    try {

      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved'
      }))

    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  render() {

    const { totalHits, status, images } = this.state;

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
        <div className='app'
          style={{
            height: '100vh',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
          <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
          <ImageGallery page={page} images={images}></ImageGallery>
          {totalHits > 12 && totalHits > images.length && (
          <Button onClick={this.onNextPage}></Button>
          )}
        </div>
      );
    }
    }
};

