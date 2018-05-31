import React, { Component, Fragment } from 'react';
import { PosterCredit, ImageComponent, Toggle, Modal, Carousel } from 'shared';
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../constants';
import { Button } from 'antd';
import moment from 'moment';
import Genre from './Genre';
import VideoItem from './VideoItem';

export default class PosterSideBar extends Component {
    static defaultProps = {
        genres: [],
        videos: {
            results: [],
        },
    }

    get HasVideos() {
        const { videos: { results } } = this.props;
        return results && results.length;
    }

    render() {
        const { className, title, status, genres, loading, release_date, poster_path } = this.props;
        const releaseDate = release_date ? moment(release_date, 'YYYY MM DD').format('Do MMM YYYY') : null;
        return (
            <div className={className}>
                {loading && <PosterCredit />}
                {!loading && (
                        <div className="credit-poster">
                            <ImageComponent
                                imagePath={poster_path}
                                placeholderURL="/assets/placeholder.jpg"
                                loading={loading}
                                defaultURL={POSTER_IMG_URL}
                                mobileURL={TINY_POSTER_URL}
                            >
                                {
                                    ({ onError, onLoad, source }) => (
                                        <picture className="intrinsic intrinsic--2x3">
                                            <img src={source} className="poster-image" onError={onError} onLoad={onLoad} alt="poster" />
                                        </picture>
                                    )
                                }
                            </ImageComponent>
                            <div className="poster-title">{title}</div>
                        </div>
                    )
                }
                <div className="details">
                    <div className="title">{title}</div>
                    <div className="genres">
                        {genres.slice(0, 3).map(g => <Genre className="genre-item" key={g.name} {...g} />)}
                    </div>
                    <div className="status-info">
                        <span className="status">{status}</span> 
                        <span className="release-date">{releaseDate}</span>
                    </div>
                    <Toggle>
                        {({ on: open, toggle: onToggle }) => (
                            <Fragment>
                                {this.HasVideos ? <Button onClick={onToggle} className="trailer" icon="play-circle-o">Play Trailer</Button> :  null}
                                <Modal open={open} onToggle={onToggle}>
                                    <Carousel className="media-container videos" slideToIndex={false}>
                                        {open && this.renderVideoItems()}
                                    </Carousel>
                                </Modal>
                            </Fragment>
                        )}
                    
                    </Toggle>
                </div>
            </div>  
        );
    }

    renderVideoItems = () => {
        const { videos: { results = [] } } = this.props;
        return results.map(v => <VideoItem key={v.id} {...v} videoID={v.key} />)
    }
}