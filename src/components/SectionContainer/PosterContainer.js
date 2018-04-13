import React, { Component } from 'react';
import PosterCard from './PosterCard';
import PosterCardError from './PosterCardError';

export default class PosterContainer extends Component {
    state = {
        hasError: false,
    }

     componentDidCatch() {
        this.setState({ hasError: true });
     }

     render() {
        const { className } = this.props;

        if (this.state.hasError) {
            return (
                <div className={`${className}-wrapper`}>
                    <PosterCardError className={className} />
                </div>
            );
        }

        return (
            <div className={`${className}-wrapper`}>
                <PosterCard {...this.props} error={this.state.hasError} />
            </div>
        );
    }
}
