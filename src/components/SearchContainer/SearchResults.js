import React, { Component } from 'react';
import Spinner from '../../shared/Spinner';
import PosterCredit from '../../shared/PosterCredit';
import ProfileItem from './ProfileItem';
import Pager from '../../shared/Pager';

export default class SearchResults extends Component {
    renderSearchItems = () => {
        const { movies: { results: movieResults }, people: { results: peopleResults }, type } = this.props;
        const results = type === 'movies' ? movieResults : peopleResults;
        let content = (
            <div className="no-content">
                <p>There are currently no {type} results</p>
            </div>
        );
        
        if (!results) return null;

        if (type === 'movies' && results.length > 0) {
            return results.map((r,i) => <PosterCredit key={`${r.id}-${i}-movie`} {...r} />);
        } else if (type === 'people' && results.length > 0) {
            return results.map((r, i) => <ProfileItem key={`${r.id}-${i}-people`} {...r} />);
        }

        return content;
     }

    render() {
        const { 
            className, 
            searchString, 
            type, 
            movies, 
            movies: { 
                loading,
            }, 
            people, 
            onPageChange 
        } = this.props;

        let content = <Spinner />;

        if (!loading) {
            content = (
                <div className="result-container">
                    {this.renderSearchItems()}
                </div>
            );
        }

        return (
            <div className={`${className}-results`}>
                <div className="result-header">SEARCH RESULTS FOR: <span className="search-string">{`${searchString.toUpperCase()}`}</span></div>
                {content}
                <Pager type={type} onPageChange={onPageChange} movies={movies} people={people} />
            </div>
        );
    }
}
