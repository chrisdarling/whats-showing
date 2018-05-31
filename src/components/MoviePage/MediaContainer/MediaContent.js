import React, { Component, Fragment } from 'react';
import { Spinner, Modal, Carousel } from 'shared';
import ImageItem from './ImageItem';
import PropTypes from 'prop-types';

const IMAGES_LIMIT = 10;

export default class MediaContent extends Component {
    state = {
        imageIndex: 1,
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
        const { loading, open, onToggle, backdrops } = this.props;
        const images = !!backdrops ? backdrops.slice(0, IMAGES_LIMIT) : [];
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
                <Modal onToggle={onToggle} totalChildren={images.length} open={open}>
                    <Carousel className="media-container images" slideIndex={this.state.imageIndex}>
                        {open && this.renderImageModalContent()}
                    </Carousel>
                </Modal>
            </Fragment>
        )
    }

    renderImageContent = () => {
        const { backdrops } = this.props; 
        if (!!backdrops && backdrops.length > 0)
            return backdrops.slice(0, IMAGES_LIMIT).map((image,i) => <ImageItem onClick={() => this.handleToggle(i)} key={image.file_path} {...image} />);

        return <div className="">No Content Available</div>;
    }

    renderImageModalContent = () => {
        const { backdrops } = this.props; 
        if (!!backdrops && backdrops.length > 0) {
            const images = backdrops.slice(0, IMAGES_LIMIT);
            return images.map((image,i) => <ImageItem onClick={() => this.handleClearToggle(i)} key={`${image.file_path}-${i}`} {...image} />);
        }

        return null;
    }

    handleToggle = imageIndex => {
        const { onToggle } = this.props;
        this.setState({ imageIndex });
        onToggle();
    }

    handleClearToggle = () => {
        this.setState({ imageIndex: 1 });
        this.props.onToggle();
    }
}