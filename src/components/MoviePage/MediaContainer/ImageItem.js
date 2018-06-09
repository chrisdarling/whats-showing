import React, { Component } from 'react';
import { BACKDROP_IMG_URL } from '../../../constants';
import { ImageComponent } from 'shared';

export default class ImageItem extends Component {
    render() {
        const { file_path, onClick } = this.props;
        return(
            <div className="image-item">
                <ImageComponent 
                    imagePath={file_path}
                    placeholderURL=""
                    defaultURL={BACKDROP_IMG_URL}
                    imageClass="poster"
                >
                    {
                        ({ onError, onLoad, source, registerRef, isVisible }) => (
                            <picture ref={registerRef} className="intrinsic intrinsic--2x3">
                                {isVisible ? 
                                    <img onClick={onClick} src={source} className="poster" onError={onError} onLoad={onLoad} alt="poster" />
                                    : <div className="poster"></div>}
                            </picture>
                        )
                    }
                </ImageComponent>
            </div>
        );
    }
}