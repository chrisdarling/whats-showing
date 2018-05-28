import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { NextNavButton, PrevNavButton } from 'shared';

export default class CarouselComponent extends Component {
    state = {
        settings: {
            arrows: "true",
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextNavButton />,
            prevArrow: <PrevNavButton />,
        },
    }

    static propTypes = {
        children: PropTypes.any,
        totalChildren: PropTypes.number,
        settings: PropTypes.object,
        slidesToShow: PropTypes.number,
        mobileSlidesToShow: PropTypes.number,
    }

    static defaultProps = {
        slidesToShow: 1,
    }

    componentDidMount() {
        this.updateSlidesToShow();
        window.addEventListener("resize", this.updateSlidesToShow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSlidesToShow);
    }

    updateSlidesToShow = () => {
        const { mobileSlidesToShow, slidesToShow } = this.props;
        
        if(!mobileSlidesToShow) return;

        if (window.innerWidth <= 768) {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    slidesToShow: mobileSlidesToShow,
                },
            }));
        } else {
            this.setState(state => ({
                settings: {
                    ...state.settings,
                    slidesToShow,
                },
            }));
        }
    }

    render() {
        const { settings: { slidesToShow } } = this.state;
        const { totalChildren, children, className } = this.props;
        return (
            <Fragment>
                {
                    totalChildren > slidesToShow ?
                        (
                            <Carousel className={className} {...this.state.settings}>
                                {children}
                            </Carousel>
                        ):
                        (
                            <div className={className}>
                                {children}
                            </div>
                        )
                }
            </Fragment>
        )
    }
}

