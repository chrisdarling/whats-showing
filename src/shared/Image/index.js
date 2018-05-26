import { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class ImageComponent extends Component {
    state = {
        imageStatus: 'loading',
        imageError: false,
        isMobile: false,
        source: '',
    }

    static propTypes = {
        defaultURL: PropTypes.string.isRequired,
        mobileURL: PropTypes.string,
        imagePath: PropTypes.string,
        placeholderURL: PropTypes.string,
        loading: PropTypes.bool,
    }

    static defaultProps = {
        loading: false,
    }

    static getDerivedStateFromProps(props, state) {
        const { defaultURL, placeholderURL, mobileURL, loading, imagePath } = props;
        const { isMobile, imageError } = state;
        const sourceURL = isMobile && mobileURL && imagePath 
            ? `${mobileURL}${imagePath}` : `${defaultURL}${imagePath}`;
        const showPlaceholder = imageError || !imagePath || loading;
        return {
            ...state,
            source: showPlaceholder ? placeholderURL : sourceURL,
        };
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
            this.setState({ isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
    }

    render() {
        return this.props.render({ 
            ...this.state,
            onError: this.handleError,
            onLoad: this.handleLoad,
         })
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleError = () => {
        this.setState({ imageError: true });
    }
}