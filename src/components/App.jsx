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
  
  componentDidUpdate(prevProps, prevState) {

    const { inputData, page } = this.state;
    

    if (inputData !== prevState.inputData || page !== prevState.page) {
      this.fetchData(inputData, page);
    }
  }

  handleFormsubmit = (inputData) => {

      this.setState({ 
        inputData,
        images:[],
        totalHits: 0,
        page: 1,
        status: 'idle',
        isButtonShown: false,
      });
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
              this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              totalHits: totalHits,
              isButtonShown: page < Math.ceil(totalHits / 12),
              status: 'resolved',
              }))
          }
      
      catch (error) {
        this.setState({ status: 'rejected' });
      }
    }  

  onNextPage = (page, totalHits) => {
    
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
    
  render() {

    const { status, images, isButtonShown } = this.state;

      return (
        <div className='app'> 
            <Searchbar onSubmit={this.handleFormsubmit}/>
            {status === 'pending' && (
            <Loader></Loader>
            )}
            {images.length > 0 && (
            <ImageGallery images={images}/>
            )}
            {status === 'rejected' && (
            <p>Something went wrong, please try again later</p>
            )}
            {isButtonShown && (
            <Button onClick={this.onNextPage}></Button>
            )}
        </div>
      )
    // if (status === 'idle') {
    //   return (
    //     <div className='app'>
    //       <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
    //     </div>
    //   )
    // }

    // if (status === 'pending') {
    //   return (
    //   <div className='app'>
    //     <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
    //     <ImageGallery images={images}></ImageGallery>
    //     <Loader></Loader>
    //     {isButtonShown && <Button onClick={this.onNextPage}></Button>}
    //   </div> 
    //   )
    // }

    // if (status === 'rejected') {
    //   return (
    //     <div className='app'>
    //       <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
    //       <p>Something went wrong, please try again later</p>
    //     </div>
    //   )
    // }

    // if (status === 'resolved') {
    //   return (
    //     <div className='app'>
    //       <Searchbar onSubmit={this.handleFormsubmit}></Searchbar>
    //       <ImageGallery page={page} images={images}></ImageGallery>
    //       {isButtonShown && <Button onClick={this.onNextPage}></Button>}
    //     </div>
    //   );
    // }
  }
}