import React from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

const BookContainer = (props) => {
    const {books, onShelfChange} = props;
    const readStatus = books?books.filter(value => value.shelf === 'read' ):''
    const currentlyReading = books?books.filter(value => value.shelf === 'currentlyReading'):''
    const wantToRead = books?books.filter(value => value.shelf === 'wantToRead' ):''
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {currentlyReading.length > 0 ?
                                    currentlyReading.map((book) => (

                                        <li key={book.id}>
                                            <Book book={book} onShelfChange={onShelfChange}/>
                                        </li>)) : (
                                        <li>
                                            This shelf is currently empty{console.log(readStatus)}
                                        </li>
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {wantToRead.length > 0 ?
                                    wantToRead.map((book) => (

                                        <li key={book.id}>
                                            <Book book={book} onShelfChange={onShelfChange}/>
                                        </li>)) : (
                                        <li>
                                            This shelf is currently empty{console.log(readStatus)}
                                        </li>
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {readStatus.length > 0 ?
                                    readStatus.map((book) => (

                                        <li key={book.id}>
                                            <Book book={book} onShelfChange={onShelfChange}/>
                                        </li>)) : (
                                        <li>
                                            This shelf is currently empty{console.log(readStatus)}
                                        </li>
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

export default BookContainer;