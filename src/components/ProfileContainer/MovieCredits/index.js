import React, { Component } from 'react';
import { PosterCredit } from 'shared';
import { sortHandler, decadeFilterHandler } from '../../../constants';
import './style.css';

const baseClass = 'whats-showing-profile-credits';
export default class MovieCredits extends Component {
    renderPosters = () => {
        const { cast, crew, filter, sortFilter, decadeFilter, year } = this.props;
        if (!( (typeof cast === 'undefined' || cast === null) && (typeof crew === 'undefined' || crew === null) )) {
            let results = [];
            if (filter === 'Actor') {
                results = cast.filter(c => c.media_type === 'movie')
                    .filter((item) => decadeFilterHandler(item, decadeFilter, year))
                    .sort((a, b) => sortHandler(a, b, sortFilter));
            } else {
                results = crew.filter(c => c.media_type === 'movie' && c.job === filter)
                    .filter((item) => decadeFilterHandler(item, decadeFilter, year))
                    .sort((a, b) => sortHandler(a, b, sortFilter));
            }
            return results.map((c, i) => <PosterCredit key={`${c.id}-${i}`} {...c} />);
        }
    }

    render() {
        return (
            <div className={baseClass}>
                {this.renderPosters()}
            </div>
        );
    }
}