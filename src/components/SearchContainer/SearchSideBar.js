import React, { Component } from 'react';
import classnames from 'classnames';

export default class SearchSideBar extends Component {
    render() {
        const { className, type, onClick, movies: { total_results: movieResults }, people: { total_results: peopleResults } } = this.props;
        const movieClass = classnames('movies', { 'active': type === 'movies'});
        const peopleClass = classnames('people', { 'active': type === 'people'});
        return (
            <div className={`${className}-sidebar`}>
                <div className="sidebar-title">SHOW RESULTS FOR</div>
                <div className={movieClass} onClick={() => onClick('movies')}>
                    <span className="result-title">Movies</span>
                    <span className="result-count">{movieResults}</span>
                </div>
                <div className={peopleClass} onClick={() => onClick('people')}>
                    <span className="result-title">People</span>
                    <span className="result-count">{peopleResults}</span>
                </div>
            </div>
        );
    }
}