import React, { Component } from 'react';
import Spinner from '../../shared/Spinner';
import PosterCredit from '../../shared/PosterCredit';
import ProfileItem from './ProfileItem';
import { Pagination } from 'antd';

export default class SearchResults extends Component {
    get Page() {
        const { type, movies, people } = this.props;
        return type === 'movies' ? movies && movies.page  : people && people.page;
    }

    get Total() {
        const { type, movies, people } = this.props;
        return type === 'movies' ? movies && movies.total_results : people && people.total_results;
    }

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
            movies: { 
                loading,
            }, 
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

        const current = Number.parseInt(this.Page, 10) || 1;

        return (
            <div className={`${className}-results`}>
                <div className="result-header">SEARCH RESULTS FOR: <span className="search-string">{`${searchString.toUpperCase()}`}</span></div>
                {content}
                <Pagination size="small" current={current} pageSize={20} total={this.Total} onChange={onPageChange} />
            </div>
        );
    }
}
