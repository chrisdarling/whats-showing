import React, { PureComponent } from 'react';
import { Carousel } from 'antd';
import { NextNavButton, PrevNavButton } from '../../../shared/Arrows';
import Spinner from '../../../shared/Spinner';
import VideoItem from './VideoItem';
import ImageItem from './ImageItem';
import classnames from 'classnames';
import './style.css';

const VIDEOS = 'videos';
const IMAGES = 'images';
const VIDEO_LIMIT = 4;
const IMAGES_LIMIT = 10;

export default class MediaContainer extends PureComponent {
    state = {
        tab: VIDEOS,
        settings: {
            arrows: "true",
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextNavButton />,
            prevArrow: <PrevNavButton />,
        }
    }
    
    handleTabClick = (tab) => {
        this.setState(() => ({ tab }));
    }

    renderVideoContent = () => {
        let { results } = this.props;
        
        if (!!results && results.length > 0) {
            results = results.filter(r => r.site === 'YouTube');
            return results.slice(0, VIDEO_LIMIT).map(v => <VideoItem key={v.id} videoID={v.key} {...v} />);
        } 

        return null;
    }

    renderImageContent = () => {
        let { backdrops } = this.props;
        
        if (!!backdrops && backdrops.length > 0)
            return backdrops.slice(0, IMAGES_LIMIT).map(i => <ImageItem key={i.file_path} {...i} />);

        return null;
    }

    render() {
        const { className, loading, results, backdrops } = this.props;
        const { tab } = this.state;
        const videoClass = classnames('media-tab', { 'active': tab === VIDEOS });
        const imageClass = classnames('media-tab', { 'active': tab === IMAGES });
        const videoContainer = classnames('media-container', { 'show-video': tab === VIDEOS });
        const imageContainer = classnames('media-container', { 'show-image': tab === IMAGES });

        let content = <Spinner />;
        const NO_VIDEOS = (!loading && !results) || (results && results.length === 0);
        const NO_IMAGES = (!loading && !backdrops) || (backdrops && backdrops.length === 0);

        const VIDECAROUSEL = () => (
            <Carousel className={videoContainer} {...this.state.settings}>
                {this.renderVideoContent()}
            </Carousel>
        );

        const IMAGECAROUSEL = () => (
            <Carousel className={imageContainer} {...this.state.settings}>
                {this.renderImageContent()}
            </Carousel>
        );

        if (!loading) {
            content = [
                <VIDECAROUSEL key={VIDEOS} />,
                <IMAGECAROUSEL key={IMAGES} />,
            ];
        }
        
        if ((NO_VIDEOS && tab === VIDEOS) || (NO_IMAGES && tab === IMAGES)) {
            content = (
                <div className="no-media" {...this.state.settings}>
                    <div className="media-default">
                        <p>We currently have no {this.state.tab}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${className}-media`}>
                <div className="media-header">
                    <h2 className="media-title">Media</h2>
                    <ul className="media-tabs">
                        <li className={videoClass} onClick={() => this.handleTabClick(VIDEOS)}>Videos</li>
                        <li className={imageClass} onClick={() => this.handleTabClick(IMAGES)}>Images</li>
                    </ul>
                </div>
                {content}
            </div>
        );
    }
}
