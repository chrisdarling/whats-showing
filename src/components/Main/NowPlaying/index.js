import React, { PureComponent } from 'react';
import ImageComponent from '../../../shared/Image';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { NextNavButton, PrevNavButton } from '../../../shared/Arrows';
import Spinner from '../../../shared/Spinner';
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../../constants';
import { Tooltip } from 'antd';

import './style.css';

const baseClass = 'whats-showing-now-playing';

export default class NowPlaying extends PureComponent {
    state = {
        settings: {
            infinite: true,
            arrows: "true",
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            graggable: true,
            nextArrow: <NextNavButton />,
            prevArrow: <PrevNavButton />,
        }  
    }

    componentDidMount() {
        this.updateSlidesToShow();
        window.addEventListener("resize", this.updateSlidesToShow);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSlidesToShow);
    }

    updateSlidesToShow = () => {
        if (window.innerWidth <= 768) {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            }));
        } else {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    arrows: true,
                    slidesToShow: 6,
                    slidesToScroll: 6,
                },
            }));
        }
    }
    
    renderCarouselItems = () => {
        const posterProps = this.props[this.props.type];
        let { results } = posterProps;

        return results.slice(0, this.props.cardLimit).map((movie, i) => 
            <ImageComponent
                key={`${movie.id}-${i}`}
                imagePath={movie.poster_path}
                placeholderURL={'/assets/placeholder.jpg'}
                defaultURL={POSTER_IMG_URL}
                mobileURL={TINY_POSTER_URL}
                imageClass="poster-image"
                render={({ onError, onLoad, source }) => {
                    return (
                        <Tooltip placement="top" title={movie.title}>
                            <Link to={`/movies/movie/${movie.id}`} className="credit-poster">
                                <picture className="intrinsic intrinsic--2x3">
                                    <img src={source} className="poster-image" onError={onError} onLoad={onLoad} alt="poster" />
                                </picture>
                            </Link>
                        </Tooltip>
                    ) 
                }}/>
        )   
    }

    render() {
        const { title, type, section } = this.props;
        const posterProps = this.props[this.props.type];
        let { results, loading } = posterProps;

        let content = <Spinner />;

        if (!loading && results.length > 0) {
            content = (
                <Carousel autoplay className="posters-container" {...this.state.settings}>
                    {this.renderCarouselItems()}
                </Carousel>
            );
        }

        return (
            <div className={baseClass}>
                <Link to={`/${section}/${type}`}  className="menu-item-link">
                    <h2 className="section-title">{title}</h2>
                </Link>
                {content}
            </div>
        );
    }
}