import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { MID_IMG_URL, LARGE_IMG_URL } from '../../constants';
import moment from 'moment';

const DATE_FORMAT = 'MM/DD/YYYY';
export default class PosterCard extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        title: PropTypes.string,
    }

    state = {
        imageError: false,
        imageStatus: 'loading',
        imageURL: LARGE_IMG_URL,
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
            this.setState(state => ({ imageURL: MID_IMG_URL }));
        } else {
            this.setState(state => ({ imageURL: LARGE_IMG_URL }));
        }
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleImageError = () => {
        this.setState({ imageError: true });
    }

    renderBackDrop = () => {
        const { backdrop_path, id } = this.props;
        const { imageURL } = this.state;
        const imgClass = classnames('backdrop-image', { 'show': this.state.imageStatus === 'loaded' });
        return (
            <Link to={`/movies/movie/${id}`} className="menu-item-link">
                <picture className="intrinsic intrinsic--2x3">
                    <img
                        className={imgClass} 
                        onLoad={this.handleLoad} 
                        src={`${imageURL}${backdrop_path}`} 
                        alt="" />
                </picture>
            </Link>
        );
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