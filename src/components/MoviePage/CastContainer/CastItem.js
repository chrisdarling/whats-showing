import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_IMG_URL } from '../../../constants';

export default class CastItem extends Component {
    state = {
        imageError: false,
        imageStatus: 'loading',
    }

    handleError = () => {
        this.setState({ imageError: false });
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    renderImage = () => {
        const { profile_path } = this.props;
        let image = <img className="casting-person-image" src="/assets/profile.png" alt="person"/>

        if (profile_path && !this.state.imageError) 
            image = <img className="casting-person-image" src={`${PROFILE_IMG_URL}${profile_path}`} onError={this.handleError} onLoad={this.handleLoad} alt="person"/>;

        return image;
    }

    render() {
        const { className, name, character, id } = this.props;

        return (
            <Link to={`/profile/${id}`} className={`${className} menu-item-link`}>
                {this.renderImage()}
                <div className="casting-info">
                    <span className="casting-name">{name}</span>
                    <span className="character">{character}</span>
                </div>
            </Link>
        );
    }
}
