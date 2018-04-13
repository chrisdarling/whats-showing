import React, { Component } from 'react';
import { Radio } from 'antd';

export default class YearSelector extends Component {
    renderYears = () => {
        const { decadeFilter } = this.props;
        let years = [];
        for (let i = decadeFilter; i < (decadeFilter+10); i++) {
            years = [...years, <Radio.Button key={i} value={i}>{i}</Radio.Button>];
        }

        return years;
    }

    render() {
        const { decadeFilter, year } = this.props;

        if (!decadeFilter || decadeFilter === 'All')
            return null;

        return (
            <div className="selector-wrapper">
                <Radio.Group size="default" className="year-selector" value={year} onChange={this.handleChange}>
                    {this.renderYears()}
                </Radio.Group>
            </div>
        );
    }

    handleChange = (e) => {
        this.props.onYearChange(e.target.value);
    }
}