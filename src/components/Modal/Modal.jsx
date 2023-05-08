import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    };

    handleKeydown = e => {  
        if(e.code === 'Escape') {
            this.props.onClose();
        };
    };

    handleOverlayClick = evt => {
        if(evt.currentTarget === evt.target) {
            this.props.onClose();
        };
    };

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleOverlayClick}>
                <div className={css.modal}>{this.props.children}
                    <img src="" alt=""/>
                </div>
            </div>,
            modalRoot,
        );
};
};