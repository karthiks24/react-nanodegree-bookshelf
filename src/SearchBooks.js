import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {search} from './BooksAPI';
import Book from './Book';
import {DebounceInput} from 'react-debounce-input';

class SearchBooks extends Component {
    state = {
        query: '',
        searchResults: []
    }

    handleInputChange = (e) => {
        const { booksOnShelves } = this.props;
        const currentQuery = e.target.value;

        this.setState({
            query: currentQuery
        });

        //in case currentQuery is empty string or undefined -> reset searchResults
        if (!currentQuery) {
            this.setState({
                searchResults: []
            });
        } else {
            search(currentQuery)
                .then((response) => {
                    //if there are no results or the search field is empty, reset state.searchResults
                    if (!(response instanceof Array) || this.state.query === '') {
                        this.setState({
                            searchResults: []
                        });
                        return;
                    };

                    const updatedSearchResults = response.map((book) => {
                        //check if this book is currently on a shelf; if so, assign a "shelf" property
                        const i = booksOnShelves.findIndex((bookOnShelf) => bookOnShelf.id === book.id);
                        if (i !== -1){
                            book.shelf = booksOnShelves[i].shelf;
                        }
                        return book;
                    });
                    this.setState({
                        searchResults: updatedSearchResults
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const { onShelfChange } = this.props;
        const { query, searchResults } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                         <DebounceInput
                             minLength={2}
                             debounceTimeout={300}
                             type="text"
                             value={query}
                             placeholder="Search by title or author"
                             onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.length > 0 ?
                            searchResults.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} onShelfChange={onShelfChange} />
                                </li>
                            )) : (
                                <li>
                                    No results found
                                </li>
                            )
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;