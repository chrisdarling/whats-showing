import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { NextNavButton, PrevNavButton } from '../../../shared/Arrows';
import Spinner from '../../../shared/Spinner';

import PosterCredits from '../../../shared/PosterCredit';

import './style.css';

const baseClass = 'whats-showing-now-playing';

export default class NowPlaying extends PureComponent {
    state = {
        settings: {
            infinite: true,
            arrows: "true",
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
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
                },
            }));
        } else {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    arrows: true,
                    slidesToShow: 6,
                },
            }));
        }
    }
    
    renderCarouselItems = () => {
        const posterProps = this.props[this.props.type];
        let { results } = posterProps;

        return results.slice(0, this.props.cardLimit).map((movie, i) => <PosterCredits key={`${movie.id}-${i}`} className={baseClass} {...movie} />)
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