import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd'
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../constants';
import './style.css';

export default class PosterCredit extends Component {
    state = {
        imageStatus: 'loading',
        imageError: false,
        imageURL: POSTER_IMG_URL,
    }

    componentDidMount() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    }

    checkMobile = () => {
        if (window.innerWidth <= 768) {
            this.setState(state => ({ imageURL: TINY_POSTER_URL }));
        } else {
            this.setState(state => ({ imageURL: POSTER_IMG_URL }));
        }
    }

    get showPlaceholder() {
        return this.state.imageError || !this.props.poster_path;
    }

    get showPosterImg() {
        return !!this.props.poster_path;
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleError = () => {
        this.setState({ imageError: true });
    }

    renderPoster = () => {
        const { poster_path, id, onClick } = this.props;
        const { imageURL } = this.state;
        const clickAction = onClick ? () => onClick(id) : null;
        const placeholderImg = this.showPlaceholder 
            && (
                <picture key={`placeholder-${id}`}  className="intrinsic intrinsic--2x3">
                    <img 
                        onClick={clickAction} 
                        className="poster-image placeholder" 
                        alt="" 
                        src="/assets/placeholder.jpg" />
                </picture>
        );
        
        const posterImg = this.showPosterImg 
            && (
                <picture key={`poster-${id}`} className="intrinsic intrinsic--2x3">
                    <img  
                        onClick={clickAction} 
                        className="poster-image" 
                        alt="" 
                        src={`${imageURL}${poster_path}`} 
                        onLoad={this.handleLoad} 
                        onError={this.handleError} />
                </picture>
        );

        return [placeholderImg, posterImg];
    }

    render() {
        const { id, title } = this.props;
        const posterTitleClass = classnames('poster-title', { 'show': this.showPlaceholder });
        return (
            <Tooltip placement="top" title={title}>
                <Link to={`/movies/movie/${id}`} className="credit-poster">
                    {this.renderPoster()}
                    <div className={posterTitleClass}>{title}</div>
                </Link>
            </Tooltip>
        );
    }
}