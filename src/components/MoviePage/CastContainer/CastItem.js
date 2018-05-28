import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_IMG_URL } from '../../../constants';
import { ImageComponent } from 'shared';

export default class CastItem extends Component {
    render() {
        const { className, name, character, loading, id, profile_path } = this.props;

        return (
            <Link to={`/profile/${id}`} className={`${className} menu-item-link`}>
                <ImageComponent 
                    imagePath={profile_path}
                    placeholderURL="/assets/profile.png"
                    defaultURL={PROFILE_IMG_URL}
                >
                    {
                        ({ onError, onLoad, source }) => (
                            <picture className="intrinsic">
                                <img src={source} className="casting-person-image" onError={onError} onLoad={onLoad} alt="profile" />
                            </picture>
                        )
                    }
                </ImageComponent>
                <div className="casting-info">
                    {!loading && <div className="casting-name">{name} <span className="character"> / {character}</span></div>}
                </div>
            </Link>
        );
    }
}
