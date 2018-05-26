import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_IMG_URL } from '../../../constants';
import ImageComponent from '../../../shared/Image';

export default class CastItem extends Component {
    render() {
        const { className, name, character, id, profile_path } = this.props;

        return (
            <Link to={`/profile/${id}`} className={`${className} menu-item-link`}>
                <ImageComponent 
                    imagePath={profile_path}
                    placeholderURL="/assets/profile.png"
                    defaultURL={PROFILE_IMG_URL}
                    imageClass="casting-person-image"
                    render={({ onError, onLoad, source }) => (
                        <picture>
                            <img src={source} className="casting-person-image" onError={onError} onLoad={onLoad} alt="profile" />
                        </picture>
                    )}
                />
                <div className="casting-info">
                    <span className="casting-name">{name}</span>
                    <span className="character">{character}</span>
                </div>
            </Link>
        );
    }
}
