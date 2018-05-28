import React, { Component } from 'react';
import CastItem from './CastItem';
import './style.css';

const CAST_LIMIT = 8;

export default class CastContainer extends Component {
    static defaultProps = {
        cast: [],
    }
    
    render() {
        const { loading, className } = this.props;
        return (
            <div className={`${className}-casting`}>
                <h2 className="casting-title">Top Billed Cast</h2>
                <div className="casting-items">
                    {loading ? this.renderLoadingItems() : this.renderCastItems()}
                </div>
            </div>
        );
    }

    renderLoadingItems = () => {
        let items = [];
        for (let i = 0; i < CAST_LIMIT; i++) {
            items.push(<CastItem key={i} className="casting-item" loading={true}  />);
        }
        return items;
    }
    
    renderCastItems = () => {
        const { cast } = this.props;
        return cast
                .slice(0, CAST_LIMIT)
                .map(c => <CastItem className="casting-item" key={c.credit_id} {...c} />);
    }

}