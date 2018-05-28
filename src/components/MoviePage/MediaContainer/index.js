import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaContent from './MediaContent';
import { Toggle } from 'shared';

import './style.css';

export default class MediaContainer extends PureComponent {
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

        return (
            <div className={`${className}-media`}>
                <h3 className="media-title">Images/Posters</h3>
                <Toggle>
                    {({ on, toggle }) => (
                        <MediaContent open={on} onToggle={toggle} {...this.props} />
                    )}
                </Toggle>
            </div>
        );
    }
   
    handleTabClick = (tab) => {
        this.setState(() => ({ tab }));
    }
}
