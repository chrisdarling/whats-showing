import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { Spinner, Carousel, Modal } from 'shared';
import VideoItem from './VideoItem';
import ImageItem from './ImageItem';
import PropTypes from 'prop-types';

const VIDEOS = 'videos';
const IMAGES = 'images';
const VIDEO_LIMIT = 4;
const IMAGES_LIMIT = 10;
const NoOptions = ({ tab }) => (
    <div className="no-media">
        <div className="media-default">
            <p>We currently have no {tab}</p>
        </div>
    </div>
);
export default class MediaContent extends Component {
    state = {
        modalData: {},
    }

    static propTypes = {
        tab: PropTypes.string,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
    }

    get NO_VIDEOS() {
        const { loading, results } = this.props;
        return (!loading && !results) || (results.length === 0);
    }

    get NO_IMAGES() {
        const { loading, backdrops } = this.props;
        return (!loading && !backdrops) || (backdrops.length === 0);
    }

    get NO_CONTENT() {
        const { tab } = this.props;
        return (this.NO_VIDEOS && tab === VIDEOS) || (this.NO_IMAGES && tab === IMAGES);
    }

    render() {
        const { loading, tab, open, onToggle, results, backdrops } = this.props;
        const videoContainer = classnames('media-container', { 'show-video': tab === VIDEOS });
        const imageContainer = classnames('media-container', { 'show-image': tab === IMAGES });

        return (
            <Fragment>
                {loading 
                    ? <Spinner /> : this.NO_CONTENT 
                    ? <NoOptions tab={tab} /> : 
                    (
                        <Fragment>
                            <Carousel className={videoContainer} totalChildren={results.length}>
                                {this.renderVideoContent()}
                            </Carousel>
                            <Carousel className={imageContainer} totalChildren={backdrops.length}>
                                {this.renderImageContent()}
                            </Carousel>
                        </Fragment>
                    )
                }
                <Modal onToggle={onToggle} open={open}>
                    <ImageItem {...this.state.modalData} onClick={this.handleClearToggle} />
                </Modal>
            </Fragment>
        )
    }

    renderVideoContent = () => {
        const { results } = this.props;
        
        if (!!results && results.length > 0) {
            return results
                        .filter(r => r.site === 'YouTube')
                        .slice(0, VIDEO_LIMIT).map(v => <VideoItem key={v.id} videoID={v.key} {...v} />);
        } 

        return null;
    }

    renderImageContent = () => {
        const { backdrops } = this.props; 
        if (!!backdrops && backdrops.length > 0)
            return backdrops.slice(0, IMAGES_LIMIT).map(i => <ImageItem onClick={() => this.handleToggle(i)} key={i.file_path} {...i} />);

        return null;
    }

    handleToggle = modalData => {
        const { onToggle } = this.props;
        this.setState({ modalData });
        onToggle();
    }

    handleClearToggle = () => {
        this.setState({ modalData: {} });
        this.props.onToggle();
    }
}