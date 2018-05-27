import React, { Component } from 'react';
import { IMG_URL } from '../../constants';
import { ImageComponent } from 'shared';

export default class ProfileImage extends Component {
    render() {
        const { className, profile_path } = this.props;
        return (
            <div className={className}>
                <ImageComponent 
                    imagePath={profile_path}
                    placeholderURL="/assets/profile.png"
                    defaultURL={IMG_URL}
                    imageClass="profile-image"
                >
                    {
                        ({ onError, onLoad, source }) => (
                            <picture className="intrinsic intrinsic--2x3">
                                <img src={source} className="profile-image" onError={onError} onLoad={onLoad} alt="profile" />
                            </picture>
                        )
                    }
                </ImageComponent>
            </div>
        );
    }
}