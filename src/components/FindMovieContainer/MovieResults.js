import React, { Component } from 'react';
import PosterCredit from '../../shared/PosterCredit';
import ResultFilter from './ResultFilter';
import { Pagination } from 'antd';

export default class MovieResults extends Component {
    renderPosters = () => {
        const { results } = this.props;
        if (!results || results.length < 0) return null;

        return results.map((r,i) => <PosterCredit key={`${r.id}-${i}`} {...r} />);
    }

    render() {
        const { className, onPageChange, total_results, page } = this.props;
        const current = parseInt(page, 10);
        return (
            <div className={`${className}-results`}>
                <ResultFilter {...this.props} />
                <div className="result-items">
                    {this.renderPosters()}
                </div>
                <Pagination current={current} size="small" total={total_results} pageSize={20} onChange={onPageChange} />
            </div>
        );
    }
}