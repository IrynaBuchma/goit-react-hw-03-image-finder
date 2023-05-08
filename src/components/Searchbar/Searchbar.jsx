import React, {Component} from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

export default class Searchbar extends Component {

    state = {
        inputData: '',
    }

    onInputChange= (e) => {
        this.setState({ inputData: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { inputData } = this.state;
        this.props.onSubmit({ inputData });
        this.setState({ inputData: '', });
    }

    render() {

        const { inputData } = this.state;
        return (
            <header classNameName={css.searchbar}>
                <form className={css.searchform} onSubmit={this.handleSubmit}>
                    
                    <input
                        className={css.searchform__input}
                        name="inputData"
                        value={inputData}
                        onChange={this.onInputChange}
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />

                    <button type="submit" className={css.searchform__btn}>
                        <FaSearch width="2em" height="2em" fill="blue"/>
                        <span className={css.searchform__btnLabel}>Search</span>
                    </button>
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
 inputData: PropTypes.string.isRequired,
 onInputChange: PropTypes.func.isRequired,
 onSearch: PropTypes.func.isRequired,
}