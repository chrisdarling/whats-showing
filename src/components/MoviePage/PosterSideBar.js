import React, { Component } from 'react';
import moment from 'moment';
import { IMG_URL } from '../../constants';
import Genre from './Genre';

export default class PosterSideBar extends Component {
    state = {
        imageStatus: 'loading',
        imageError: false,
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleError = () => {
        this.setState({ imageError: true });
    }

    renderGenres = () => {
        const { genres } = this.props;
        if (!genres) return null;

        return genres.slice(0, 3).map(g => <Genre className="genre-item" key={g.name} {...g} />);
    }

    renderPoster = () => {
        const { poster_path } = this.props;
        const { imageError, imageStatus } = this.props;
        const placeholderImg = (imageStatus === 'loading' || imageError === true || !poster_path) 
            && <img key="placeholder" className="poster-image" alt="poster"  src="/assets/placeholder.jpg" />;
        const posterImg = poster_path && <img key="poster" className="poster-image" alt="poster" src={`${IMG_URL}${poster_path}`} onLoad={this.handleLoad} onError={this.handleError} />;
        return [placeholderImg, posterImg];
    }

    render() {
        const { className, title, status, release_date } = this.props;
        const releaseDate = release_date ? moment(release_date, 'YYYY MM DD').format('Do MMM YYYY') : null;
        return (
            <div className={className}>
                {this.renderPoster()}
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