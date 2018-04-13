import React, { Component } from 'react';

export default class VideoItem extends Component {
    render() {
        const { id, name, videoID } = this.props;
            
        return(
            <div className="video-item">
                <iframe ref="iframe" className="video" title={name} id={id} src={`https://www.youtube.com/embed/${videoID}`} frameBorder="0" allowFullScreen></iframe>
            </div>
        );
    }
}