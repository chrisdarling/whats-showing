import React, { Component } from 'react';
import CastItem from './CastItem';
import './style.css';

const CAST_LIMIT = 20;

export default class CastContainer extends Component {
    renderLoadingItems = () => {
        let items = [];
        for (let i = 0; i < CAST_LIMIT; i++) {
            items.push(<CastItem key={i} className="casting-item" loading={true}  />);
        }
        return items;
    }
    
    renderCastItems = () => {
        const { cast } = this.props;
        if (typeof cast === 'undefined' || cast === null)
            return null;

        return cast.slice(0, CAST_LIMIT).map(c => <CastItem className="casting-item" key={c.credit_id} {...c} />);
    }

    render() {
        const { loading, className } = this.props;
        const content = loading ? this.renderLoadingItems : this.renderCastItems;

        return (
            <div className={`${className}-casting`}>
                <h2 className="casting-title">Cast</h2>
                <div className="casting-items">
                    {content()}
                </div>
            </div>
        );
    }
}