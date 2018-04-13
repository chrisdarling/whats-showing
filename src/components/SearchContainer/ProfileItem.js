import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { POSTER_IMG_URL } from '../../constants';
import './style.css';

export default class PosterCredit extends Component {
    state = {
        imageStatus: 'loading',
        imageError: false,
    }

    get showPlaceholder() {
        return this.state.imageError || !this.props.profile_path;
    }

    get showProfileImg() {
        return !!this.props.profile_path;
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleError = () => {
        this.setState({ imageError: true });
    }

    renderProfile = () => {
        const { profile_path, id } = this.props;
        const placeholderImg = this.showPlaceholder && <img key={`placeholder-${id}`} className="profile-image" alt="profile" src="/assets/profile.png" />;
        const profileImg = this.showProfileImg && <img key={`poster-${id}`} className="profile-image" alt="profile" src={`${POSTER_IMG_URL}${profile_path}`} onLoad={this.handleLoad} onError={this.handleError} />;;

        return [placeholderImg, profileImg];
    }

    render() {
        const { id, name } = this.props;
        return (
            <Link to={`/profile/${id}`} className="credit-profile">
                <div className="profile-image-container">
                    {this.renderProfile()}
                </div>
                <div className="profile-info">
                    <div className="name">{name}</div>
                </div>
            </Link>
        );
    }
}