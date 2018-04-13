import React, { Component } from 'react';
import PosterCredit from '../../shared/PosterCredit';
import ResultFilter from './ResultFilter';
import Pager from '../../shared/Pager';

export default class MovieResults extends Component {
    renderPosters = () => {
        const { results } = this.props;
        if (!results || results.length < 0) return null;

        return results.map((r,i) => <PosterCredit key={`${r.id}-${i}`} {...r} />);
    }
    render() {
        const { className, onPageChange, ...movies } = this.props;
        return (
            <div className={`${className}-results`}>
                <ResultFilter {...this.props} />
                <div className="result-items">
                    {this.renderPosters()}
                </div>
                <Pager type="movies" onPageChange={onPageChange} movies={movies} />
            </div>
        );
    }
}