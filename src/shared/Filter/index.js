import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import './style.css';

const { Option } = Select;

export default class Filter extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        onChange: PropTypes.func,
    }

    render() {
        const {
            onChange,
            value,
            defaultValue,
            label,
            children,
        } = this.props;

        return (
            <div className="whats-showing-filter">
                <label className="filter-label">{label}</label>
                <Select className="sort-filter" defaultValue={defaultValue} value={value} onChange={onChange}>
                    {children}
                </Select> 
            </div>
        )
    }
}

Filter.Option = Option;