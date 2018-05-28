import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaContent from './MediaContent';
import { Toggle } from 'shared';
import classnames from 'classnames';

import './style.css';

const VIDEOS = 'videos';
const IMAGES = 'images';
export default class MediaContainer extends PureComponent {
    state = {
        tab: IMAGES,
    }

    static propTypes = {
        results: PropTypes.array,
        backdrops: PropTypes.array,
    }

    static defaultProps = {
        results: [],
        backdrops: [],
    }

    render() {
        const { className } = this.props;
        const { tab } = this.state;
        const videoClass = classnames('media-tab', { 'active': tab === VIDEOS });
        const imageClass = classnames('media-tab', { 'active': tab === IMAGES });

        return (
            <div className={`${className}-media`}>
                <div className="media-header">
                    <h2 className="media-title">Media</h2>
                    <ul className="media-tabs">
                        <li className={videoClass} onClick={() => this.handleTabClick(VIDEOS)}>Videos</li>
                        <li className={imageClass} onClick={() => this.handleTabClick(IMAGES)}>Images</li>
                    </ul>
                </div>
                <Toggle>
                    {({ on, toggle }) => (
                        <MediaContent open={on} onToggle={toggle} {...this.props} tab={tab} />
                    )}
                </Toggle>
            </div>
        );
    }
   
    handleTabClick = (tab) => {
        this.setState(() => ({ tab }));
    }
}
