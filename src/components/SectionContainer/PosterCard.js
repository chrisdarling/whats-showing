import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ImageComponent } from 'shared';
import { LARGE_IMG_URL, POSTER_IMG_URL } from '../../constants';
import moment from 'moment';

const DATE_FORMAT = 'MM/DD/YYYY';
export default class PosterCard extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        title: PropTypes.string,
    }

    renderBackDrop = () => {
        const { backdrop_path, id } = this.props;
        return (
            <ImageComponent
                imagePath={backdrop_path}
                defaultURL={LARGE_IMG_URL}
                mobileURL={POSTER_IMG_URL}
                placeholderURL="/assets/placeholder-1200.png"
                imageClass="backdrop-image"
            >
                {
                    ({ onError, onLoad, source, isVisible, registerRef }) => (
                        <Link to={`/movies/movie/${id}`} className="menu-item-link" >
                            <picture ref={registerRef} key="placeholder-backdrop" className="intrinsic intrinsic--2x3">
                                {isVisible ? 
                                    <img src={source} className="backdrop-image" onError={onError} onLoad={onLoad} alt="backdrop" /> 
                                    : <div className="backdrop-image"></div>}
                            </picture>
                        </Link>
                    )
                }
            </ImageComponent>
        )
    }

    render() {
        const { className, id, title, release_date } = this.props;
        const releaseDate = release_date ? moment(release_date).format(DATE_FORMAT) : null;
        return ( 
            <div className={`${className}-card`}>
                {this.renderBackDrop()}
                <Link to={`/movies/movie/${id}`} className="card-content menu-item-link">
                   <span className="small-title" >{title}</span>
                   <span className="small-date">{releaseDate}</span>
                </Link>
            </div>
        );
    }
}