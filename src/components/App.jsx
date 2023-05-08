import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import {ReactComponent as SearchIcon} from './icons/search.svg';
import Searchbar from './Searchbar/Searchbar';


export class App extends Component {

  state = {
    images:[],
    loading: false,
    showModal: false
  }

  componentDidMount() {
    this.setState({ loading: true });

    setTimeout(() => {
    fetch ('https://pixabay.com/api/?key=34731135-6d68099f6d308706ad328c34f&q=yellow+flowers')
      .then(res => res.json())
      .then(images => this.setState(({ images })))
      .finally(() => this.setState({ loading: false }));
    }, 2000);
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  render() {

    const { showModal } = this.state;

    return (
      <div
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
        <div>
          <Searchbar></Searchbar>
        </div>
          <Button children={<SearchIcon width="40" height="40" fill="blue"></SearchIcon>} onClick={this.toggleModal} aria-label="Search" allyProps/>
          <h1>Wellcome</h1>
          <button type="button" onClick={this.toggleModal}>Open Modal 
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <h2>Hello</h2>
                <button type="button" onClick={this.toggleModal}>Close
                </button>
              </Modal>)}
          </button>
        </div>
    );
  }
};
