import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { POSTER_IMG_URL } from '../../constants';
import ImageComponent from '../../shared/Image';
import './style.css';

export default class PosterCredit extends Component {
    render() {
        const { id, name, profile_path } = this.props;
        return (
            <Link to={`/profile/${id}`} className="credit-profile">
                <div className="profile-image-container">
                    <ImageComponent 
                        imagePath={profile_path}
                        placeholderURL="/assets/profile.png"
                        defaultURL={POSTER_IMG_URL}
                        imageClass="profile-image"
                        render={({ onError, onLoad, source }) => (
                            <picture className="intrinsic intrinsic--2x3">
                                <img src={source} className="profile-image" onError={onError} onLoad={onLoad} alt="profile" />
                            </picture>
                        )}
                    />
                </div>
                <div className="profile-info">
                    <div className="name">{name}</div>
                </div>
            </Link>
        );
    }
}