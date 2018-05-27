import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../constants';
import { ImageComponent } from 'shared';
import './style.css';

export default class PosterCredit extends Component {
    render() {
        const { id, title, poster_path, loading, onClick } = this.props;
        return (
            <Tooltip placement="top" title={title}>
                <Link to={`/movies/movie/${id}`} className="credit-poster">
                    <ImageComponent
                        imagePath={poster_path}
                        placeholderURL="/assets/placeholder.jpg"
                        loading={loading}
                        defaultURL={POSTER_IMG_URL}
                        mobileURL={TINY_POSTER_URL}
                    >
                        {
                            ({ onError, onLoad, source }) => (
                                <picture className="intrinsic intrinsic--2x3" onClick={onClick}>
                                    <img src={source} className="poster-image" onError={onError} onLoad={onLoad} alt="poster" />
                                </picture>
                            )
                        }
                    </ImageComponent>
                    <div className="poster-title">{title}</div>
                </Link>
            </Tooltip>
        );
    }
}