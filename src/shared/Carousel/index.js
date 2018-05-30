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
        window.addEventListener("resize", this.updateSlidesToShow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSlidesToShow);
    }

    componentDidUpdate(prevProps) {
        const { slideIndex: prevIndex, children: prevChildren } = prevProps;
        const { slideIndex, children, slideToIndex } = this.props;
        if (!slideToIndex) return;
        if (slideIndex !== prevIndex || children !== prevChildren) {
            this.CarouselEl.goTo(slideIndex, true);
        }
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
}

