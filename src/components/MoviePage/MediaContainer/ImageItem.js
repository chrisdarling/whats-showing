import React, { Component } from 'react';
import { BACKDROP_IMG_URL, BACKDROP_MID_URL } from '../../../constants';

export default class ImageItem extends Component {
    state = {
        imageURL: BACKDROP_IMG_URL,
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
            this.setState(state => ({ imageURL: BACKDROP_MID_URL }));
        } else {
            this.setState(state => ({ imageURL: BACKDROP_IMG_URL }));
        }
    }

    render() {
        const { file_path } = this.props;
        const { imageURL } = this.state;
        let image = <img className="poster" src={`${imageURL}${file_path}`} alt="poster" />
        return(
            <div className="image-item">
                {file_path && image}
            </div>
        );
    }
}