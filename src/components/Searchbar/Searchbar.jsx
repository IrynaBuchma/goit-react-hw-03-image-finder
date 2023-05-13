import React, {Component} from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import Notiflix from 'notiflix';

export default class Searchbar extends Component {

    state = {
        inputData: '',
    }

    onInputChange= (e) => {
        this.setState({ inputData: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.inputData.trim() === '') {
            Notiflix.Notify.failure('Please input request data');
            return;
          } 
        this.props.onSubmit(this.state.inputData);
        this.setState({ inputData: '', });
    }

    render() {

        const { inputData } = this.state;
        
        return (
            <header className={css.searchbar}>
                <form className={css.searchform} onSubmit={this.handleSubmit}>
                    
                    <input
                        className={css.searchform__input}
                        name="inputData"
                        value={inputData}
                        onChange={this.onInputChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />

                    <button type="submit" className={css.searchform__btn}>
                        <FaSearch size={25} fill="blue"/>
                        <span className={css.searchform__btnLabel}>Search</span>
                    </button>
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
 inputData: PropTypes.string,
 onInputChange: PropTypes.func,
 onSearch: PropTypes.func,
}