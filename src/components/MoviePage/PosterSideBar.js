import React, { Component } from 'react';
import { PosterCredit, ImageComponent } from 'shared';
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../constants';
import moment from 'moment';
import Genre from './Genre';

export default class PosterSideBar extends Component {
    renderGenres = () => {
        const { genres } = this.props;
        if (!genres) return null;

        return genres.slice(0, 3).map(g => <Genre className="genre-item" key={g.name} {...g} />);
    }

    render() {
        const { className, title, status, loading, release_date, poster_path } = this.props;
        const releaseDate = release_date ? moment(release_date, 'YYYY MM DD').format('Do MMM YYYY') : null;
        return (
            <div className={className}>
                {loading && <PosterCredit />}
                {!loading && (
                        <div className="credit-poster">
                            <ImageComponent
                                imagePath={poster_path}
                                placeholderURL="/assets/placeholder.jpg"
                                loading={loading}
                                defaultURL={POSTER_IMG_URL}
                                mobileURL={TINY_POSTER_URL}
                            >
                                {
                                    ({ onError, onLoad, source }) => (
                                        <picture className="intrinsic intrinsic--2x3">
                                            <img src={source} className="poster-image" onError={onError} onLoad={onLoad} alt="poster" />
                                        </picture>
                                    )
                                }
                            </ImageComponent>
                            <div className="poster-title">{title}</div>
                        </div>
                    )
                }
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