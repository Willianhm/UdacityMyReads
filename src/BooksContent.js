import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import Loading from './Loading';

const propTypes = {
    onChangeShelf: PropTypes.func.isRequired
};

class BooksContent extends Component {
    state = {
        books: [],
        loading: true
    }

    async componentDidMount() {
        // this.getBoooks();
        const books = await BooksAPI.getAll();
        this.setState({ books, loading: false });
    }

     getBoooks = () => {
        this.showLoading();
        // const books = await BooksAPI.getAll();
        // this.setState({ books, loading: false });

        // BooksAPI.getAll().then(books => {
        //     this.setState((currState) => ({
        //         ...currState,
        //         books,
        //         loading: false
        //     }));
        // });
    }

    showLoading(){
        this.setState({ loading: true });
    }

    onChangeShelf = (book, newShelf) => {
        this.showLoading();
        this.props.onChangeShelf(book, newShelf).then(() => {
            const books = this.state.books.map(b => {
                if(b.id === book.id){
                    b.shelf = newShelf;
                }
                return b;
            });
            this.setState({ books, loading: false });
        });
    }

    render() {
        const { books, loading } = this.state;
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                </div>
                <Loading show={loading}/>
                <div className="list-books-content">
                    <BookShelf 
                        title="Currently Reading" 
                        shelf="currentlyReading" 
                        books={books} 
                        onChangeShelf={this.onChangeShelf} 
                    />
                    <BookShelf 
                        title="Want to Read" 
                        shelf="wantToRead" 
                        books={books} 
                        onChangeShelf={this.onChangeShelf} 
                    />
                    <BookShelf 
                        title="Read" 
                        shelf="read" 
                        books={books} 
                        onChangeShelf={this.onChangeShelf} 
                    />
                </div>
                <Link to="/search" className="open-search">
                    <button>Add a book</button>
                </Link>
            </div>
        )
    }
}

BooksContent.protoTypes = propTypes;

export default BooksContent;