import React, { Component } from 'react';
import { IMG_URL } from '../../constants';

export default class ProfileTop extends Component {
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

    renderProfileImage = () => {
        const { profile_path } = this.props;
        const { imageError, imageStatus } = this.props;
        const placeholderImg = (imageStatus === 'loading' || imageError === true || !profile_path) 
            && <img key="placeholder-profile" className="profile-image" alt="profile" src="/assets/profile.png" />
        const profileImg = profile_path 
            && <img key="profile" className="profile-image" alt="profile" src={`${IMG_URL}${profile_path}`} onLoad={this.handleLoad} onError={this.handleError} />
        return [placeholderImg, profileImg];
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.renderProfileImage()}
            </div>
        );
    }
}