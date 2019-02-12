// TESTES : https://github.com/udacity/live-codings-react-nanodegree/tree/master/react-fundamentals/2-iniciando-com-testes-em-react-solution

import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import BooksContent from './BooksContent';
import BooksSearch from './BooksSearch';

class BooksApp extends React.Component {
  onChangeShelf = (book, newShelf) => {
    return BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={() => (
            <BooksContent onChangeShelf={this.onChangeShelf} />
          )} 
        />
        <Route 
          path="/search" 
          render={() => (
            <BooksSearch onChangeShelf={this.onChangeShelf} />
          )} 
        />
      </div>
    )
  }
}

export default BooksApp