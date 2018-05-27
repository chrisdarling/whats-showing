import React, { PureComponent } from 'react';
import { Carousel } from 'antd';
import { Arrows, Spinner, PosterCredit } from 'shared';
import './style.css';

const POSTER_LIMIT = 10;
const { NextNavButton, PrevNavButton } = Arrows;
export default class ReccomendationContainer extends PureComponent {
    state = {
        settings: {
            arrows: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            nextArrow: <NextNavButton />,
            prevArrow: <PrevNavButton />,
        },
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
                    slidesToShow: 4,
                },
            }));
        } else {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    slidesToShow: 6,
                },
            }));
        }
    }

    renderPosters = () => {
        const { results, onClick } = this.props;
        if (!results)
            return null;

        return results.slice(0, POSTER_LIMIT).map((p,i) => <PosterCredit key={`${p.id}-${i}`} onClick={() => onClick(p.id)} {...p} />);
    }

    render() {
        const { loading, className, results } = this.props;
        const { settings: { slidesToShow } } = this.state;
        let content = results && results.length >= slidesToShow 
        ? (
            <Carousel className="rec-poster-container" {...this.state.settings}>
                {this.renderPosters()}
            </Carousel>
        )
        : (
            <div className="rec-poster-container" {...this.state.settings}>
                {this.renderPosters()}
            </div>
        );

        if (loading) {
            content = <Spinner />
        }

        if (!loading && results && results.length === 0) {
            content = <div className="rec-default">We currently have no reccomendations</div>;
        }
        
        return (
            <div className={`${className}-reccomendations`}>
                <h2 className="rec-title">You might also like...</h2>
                {content}
            </div>
        );
    }
}
