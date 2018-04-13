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
                    <span>Movies</span>
                    <span>{movieResults}</span>
                </div>
                <div className={peopleClass} onClick={() => onClick('people')}>
                    <span>People</span>
                    <span>{peopleResults}</span>
                </div>
            </div>
        );
    }
}