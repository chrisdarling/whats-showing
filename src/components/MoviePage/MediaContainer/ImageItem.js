import React, { Component } from 'react';
import { BACKDROP_IMG_URL } from '../../../constants';
import { ImageComponent } from 'shared';

export default class ImageItem extends Component {
    render() {
        const { file_path } = this.props;
        return(
            <div className="image-item">
                <ImageComponent 
                    imagePath={file_path}
                    placeholderURL=""
                    defaultURL={BACKDROP_IMG_URL}
                    imageClass="poster"
                >
                    {
                        ({ onError, onLoad, source }) => (
                            <picture className="intrinsic intrinsic--2x3">
                                <img src={source} className="poster" onError={onError} onLoad={onLoad} alt="poster" />
                            </picture>
                        )
                    }
                </ImageComponent>
            </div>
        );
    }
}