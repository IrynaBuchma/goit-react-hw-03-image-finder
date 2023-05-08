import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';


const Button = ({ children, onClick, ...allyProps }) => (
    <button class={css.searchform__button} type="submit" onClick={onClick} {...allyProps}>{children}</button>
        /* <img class={icon-search} src="./images/search.svg" alt="icon-search" width="16" heigh="18"/> */       
);

Button.defaultProps = {
    onClick: () => null,
    children: null,
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    'aria-label': PropTypes.string.isRequired,
};

export default Button;