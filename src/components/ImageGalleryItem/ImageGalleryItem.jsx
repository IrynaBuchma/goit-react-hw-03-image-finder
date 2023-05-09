import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
    state = {
      shownModal: false
    }

    toggleModal = () => {
        this.setState({shownModal: !this.state.shownModal});
      }

    render() {
        const { image } = this.props;
        const { webformatURL } = image;
        const { shownModal } = this.state;

        return (
            <li className={css.imageGalleryItem}>
                <img className={css.imageGalleryItem__image} src={webformatURL} alt="tags" onClick={this.toggleModal}/>
                {shownModal && <Modal onClose={this.toggleModal} image={image}/>}
            </li>
        )
    } 
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object,
}