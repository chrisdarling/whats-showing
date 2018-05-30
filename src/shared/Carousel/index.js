import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { NextNavButton, PrevNavButton } from 'shared';

export default class CarouselComponent extends Component {
    constructor() {
        super();
        this.CarouselEl = null;
    }

    state = {
        settings: {
            arrows: true,
            speed: 500,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextNavButton />,
            prevArrow: <PrevNavButton />,
        },
    }

    static propTypes = {
        children: PropTypes.any,
        total: PropTypes.number,
        settings: PropTypes.object,
        slideIndex: PropTypes.number,
        slideToIndex: PropTypes.bool,
    }

    static defaultProps = {
        slideIndex: 1,
        slideToIndex: true,
    }

    componentDidMount() {
        this.updateSlidesToShow();
        //this.nextSlide();
        window.addEventListener('resize', this.updateSlidesToShow);
        document.addEventListener('keydown', this.nextSlide);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSlidesToShow);
        document.removeEventListener('keypress', this.nextSlide);
    }

    componentDidUpdate(prevProps) {
        const { slideIndex: prevIndex, children: prevChildren } = prevProps;
        const { slideIndex, children, slideToIndex } = this.props;
        if (!slideToIndex) return;
        if (slideIndex !== prevIndex || children !== prevChildren) {
            if (this.CarouselEl)
                this.CarouselEl.goTo(slideIndex, true);
        }
    }

    render() {
        const { children, className } = this.props;
        return (
            <Fragment>
            {   children.length <= 1 ? 
                <div className={className}>{children}</div> :
                <Carousel ref={node => this.CarouselEl = node} className={className} {...this.state.settings}>
                    {children}
                </Carousel>
            }
            </Fragment>
        )
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

    nextSlide = e => {
        const { keyCode } = e;
        if (keyCode === 37) {
            if (this.CarouselEl) {
                this.CarouselEl.prev();
            }
        } else if (keyCode === 39) {
            if (this.CarouselEl) {
                this.CarouselEl.next();
            }
        }

    } 
}

