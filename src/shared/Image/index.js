import { Component } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';

import './style.css';

export default class ImageComponent extends Component {
    constructor() {
        super();
        this.imageEl = null;
        this.io = new IntersectionObserver(this.checkIfVisible, {});
        this.state = {
            imageStatus: 'loading',
            imageError: false,
            isMobile: false,
            source: '',
            placeholder: false,
            isVisible: false,
        };
    } 

    static propTypes = {
        defaultURL: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
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
            placeholder: showPlaceholder,
        };
    }

    componentDidMount() {
        this.checkMobile();
        if (this.imageEl) {
            this.io.observe(this.imageEl);
        }
        window.addEventListener("resize", this.checkMobile);
    }

    componentWillUnmount() {
        this.io.disconnect();
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
        return this.props.children({ 
            ...this.state,
            onError: this.handleError,
            onLoad: this.handleLoad,
            registerRef: this.registerRef,
         })
    }

    handleLoad = () => {
        this.setState({ imageStatus: 'loaded' });
    }

    handleError = () => {
        this.setState({ imageError: true });
    }

    registerRef = node => {
       return this.imageEl = node;
    };

    checkIfVisible = entries => {
        const { isVisible: alreadyLoaded } = this.state;
        if (alreadyLoaded) return;
        const isVisible = entries.some(e => e.isIntersecting);
        this.setState({ isVisible });
    }
}