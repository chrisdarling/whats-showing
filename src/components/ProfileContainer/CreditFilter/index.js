import React, { Component } from 'react';
import { Select } from 'antd';

import YearSelector from './YearSelector';
import { decades } from '../../../constants';
import './style.css';

const sortOptions = ['Popularity', 'Date desc', 'Date asc', 'Title'];
export default class CreditFilter extends Component {
    renderTitle = () => {
        const { value } = this.props;
        switch(value) {
            case 'Actor':
                return 'FILMS STARRING BY';
            case 'Director':
                return 'FILMS DIRECTED BY';
            case 'Producer':
                return 'FILMS PRODUCED BY';
            case 'Writer':
                return 'FILMS WRITTEN BY';
            case 'Screenplay':
                return 'FILMS WRITTEN BY';
            default:
                return 'FILMS FEATURING';
        }
       
    }
    render() {
        const { className, handleChange, onSortChange, onYearChange, year, value, name, sortFilter, jobs, decadeFilter, onDecadeChange } = this.props;
        const { Option } = Select;
        return (
            <div className={className}>
                <div className="credit-filter-title">{this.renderTitle()} <span className="name">{name}</span> </div>
                <div className="credit-filter-column">
                    <Select className="job-filter" defaultValue={value} size="small" value={value} onChange={handleChange}>
                        {jobs.map(j => <Option key={j} value={j} >{j}</Option>)}
                    </Select> 
                    <Select className="sort-filter" defaultValue={sortFilter} size="small" value={sortFilter} onChange={onSortChange}>
                        {sortOptions.map(j => <Option key={j} value={j} >{j}</Option>)}
                    </Select>
                    <Select className="sort-filter" defaultValue={'All'} size="small" value={decadeFilter} onChange={onDecadeChange}>
                        <Option value={'All'}>All</Option> 
                        {decades.map(j => <Option key={j} value={j} >{j}</Option>)}
                    </Select>
                </div>
                <YearSelector decadeFilter={decadeFilter} year={year} onYearChange={onYearChange} />
            </div>
        );
    }
}