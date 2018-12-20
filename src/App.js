import React from 'react';
import {Route} from 'react-router-dom';
import {getAll} from './BooksAPI';
import './App.css';
import BookContainer from './BookContainer';
import SearchBooks from './SearchBooks'
class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        books: []
    }

    componentDidMount() {
        getAll()
            .then((books) => {
                console.dir((books[0]));
                this.setState({
                    books
                }, () => {
                    console.log(this.state.books)
                });
            });
    }

    handleShelfChange = (book, newShelf) => {
        //check if this book is currently on a shelf
        //if so, update its "shelf" property
        //otherwise add it to state with an updated "shelf"
        this.setState((prevState) => {
            let updatedBooks;
            const i = prevState.books.findIndex((bookOnShelf) => bookOnShelf.id === book.id);

            if (i !== -1) {
                updatedBooks = prevState.books.map((selectedBook) => {
                    if (selectedBook.id === book.id) {
                        selectedBook.shelf = newShelf;
                    }
                    return selectedBook;
                });
            } else {
                book.shelf = newShelf;
                updatedBooks = [...prevState.books, book]
            }

            return {
                books: updatedBooks
            }
        });
    }

    render() {
        return (
            this.state.books.length > 0 ? (
                <div className="app">
                    <Route exact path="/" render={() =>
                        <BookContainer
                            books={this.state.books}
                            onShelfChange={this.handleShelfChange}
                        />}
                    />
                    <Route path="/search" render={() => <SearchBooks
                        booksOnShelves={this.state.books}
                        onShelfChange={this.handleShelfChange}
                    />}
                    />
                </div>) : ''
        );
    }
}

export default BooksApp
