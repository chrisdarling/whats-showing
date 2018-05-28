import React, { Component, Fragment } from 'react';
import { Spinner, Modal } from 'shared';
import ImageItem from './ImageItem';
import PropTypes from 'prop-types';

const IMAGES_LIMIT = 10;

export default class MediaContent extends Component {
    state = {
        modalData: {},
    }

    static propTypes = {
        open: PropTypes.bool,
        onToggle: PropTypes.func,
    }

    get NO_IMAGES() {
        const { loading, backdrops } = this.props;
        return (!loading && !backdrops) || (backdrops.length === 0);
    }

    render() {
        const { loading, open, onToggle } = this.props;

        return (
            <Fragment>
                {loading 
                    ? <Spinner /> :
                    (
                        <Fragment>
                            <div className="media-container images">
                                {this.renderImageContent()}
                            </div>
                        </Fragment>
                    )
                }
                <Modal onToggle={onToggle} open={open}>
                    <ImageItem {...this.state.modalData} onClick={this.handleClearToggle} />
                </Modal>
            </Fragment>
        )
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