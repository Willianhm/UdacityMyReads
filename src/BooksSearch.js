import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid';
import If from './If';
import Loading from './Loading';

const WAIT_INTERVAL = 700;

const propTypes = {
    onChangeShelf: PropTypes.func.isRequired
};

class BooksSearch extends Component {
    state = {
        value: '',
        isEmpty: false,
        loading: false,
        books: []
    };

    componentWillMount() {
        this.timer = null;
    }

    handleChangeSearch = (evt) => {
        const value = evt.target.value;
        this.setState((currState) => ({
            ...currState,
            isEmpty: false,
            value
        }));

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.showLoading(true);
            if(!value){
                this.setState(currState => ({
                    ...currState,
                    books: [],
                    loading: false,
                    isEmpty: false
                }));
                return;
            }
            BooksAPI.search(value).then((searchedBooks) => {
                const books = [];
                let promises = [];
                if(!searchedBooks.error){
                    promises = searchedBooks.map(currBook => {
                        return BooksAPI.get(currBook.id).then((result) => {
                            books.push(result);
                        });
                    });
                }
                Promise.all(promises).then(() => {
                    this.setState(currState => ({
                        ...currState,
                        books,
                        loading: false,
                        isEmpty: books.length ? false : true
                    }));
                });
            });
        }, WAIT_INTERVAL);
    }

    showLoading(show){
        this.setState({ loading: show });
    }

    onChangeShelf = (book, newShelf) =>{
        this.showLoading(true);
        const { books } = this.state;
        const changedBook = books.filter(currBook => {
            return currBook.id === book.id;
        });
        changedBook[0].shelf = newShelf;
        this.props.onChangeShelf(book, newShelf).then(() =>{
            this.showLoading(false);
        });
    }    

    render() {
        const { value, books, isEmpty, loading } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            value={value}
                            onChange={this.handleChangeSearch} 
                        />
                    </div>
                </div>
                <Loading show={loading} text="Searching..."/>
                <div className="search-books-results">
                    <If test={isEmpty}>
                        <p>No books found.</p>
                    </If>
                    <If test={!isEmpty}>
                        <BooksGrid 
                            books={books} 
                            onChangeShelf={this.onChangeShelf}
                        />
                    </If>
                </div>
            </div>
        )
    }
}

BooksSearch.propTypes = propTypes;

export default BooksSearch;
