import React, { Component } from 'react';
import { PosterCredit } from 'shared';
import moment from 'moment';
import Genre from './Genre';

export default class PosterSideBar extends Component {
    renderGenres = () => {
        const { genres } = this.props;
        if (!genres) return null;

        return genres.slice(0, 3).map(g => <Genre className="genre-item" key={g.name} {...g} />);
    }

    render() {
        const { className, title, status, release_date, id } = this.props;
        const releaseDate = release_date ? moment(release_date, 'YYYY MM DD').format('Do MMM YYYY') : null;
        return (
            <div className={className}>
                {id && <PosterCredit {...this.props} />}
                {!id && <PosterCredit />}
                <div className="details">
                    <div className="title">{title}</div>
                    <div className="genres">
                        {this.renderGenres()}
                    </div>
                    <div className="status-info">
                        <span className="status">{status}</span> 
                        <span className="release-date">{releaseDate}</span>
                    </div>
                </div>
            </div>  
        );
    }
}