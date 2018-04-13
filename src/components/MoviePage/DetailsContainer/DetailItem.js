import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class DetailItem extends Component {
    renderItems = () => {
        const { credits } = this.props;
        if (!credits) return null;

        return credits.map((c, i) => <Link to={`/profile/${c.id}`} key={i} className="credit-name menu-item-link">{c.name}</Link>);
    }

    render() {
        const { className, detailTitle, credits } = this.props;
        if (!credits || credits.length === 0) return null;

        return (
            <div className={className}>
                <div className="detail-item-title">{detailTitle}</div>
                <div className="detail-item-values">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}