import React, { Component } from 'react';
import { Select } from 'antd';
import Filter from '../../../shared/Filter';
import YearSelector from './YearSelector';
import { decades } from '../../../constants';
import './style.css';

const sortOptions = ['Popularity', 'Date desc', 'Date asc', 'Title'];
const { Option } = Select;

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

        return (
            <div className={className}>
                <div className="credit-filter-title">{this.renderTitle()} <span className="name">{name}</span> </div>
                <div className="credit-filter-column">
                    <Filter value={value} defaultValue={value} onChange={handleChange} label="Job Filter">
                        {jobs.map((job, i) => <Filter.Option key={`${job}-${i}`} value={job}>{job}</Filter.Option>)}
                    </Filter>
                    <Filter value={sortFilter} defaultValue={sortFilter} label="Sort By" onChange={onSortChange}>
                        {sortOptions.map(filter => <Filter.Option key={filter} value={filter}>{filter}</Filter.Option>)}
                    </Filter>
                    <Filter defaultValue={'All'} value={decadeFilter} options={decades} onChange={onDecadeChange} label="Decade">
                        <Option key="decade-default" value={'All'}>All</Option>
                        {decades.map(filter => <Filter.Option key={filter} value={filter}>{filter}</Filter.Option>)}
                    </Filter>
                </div>
                <YearSelector decadeFilter={decadeFilter} year={year} onYearChange={onYearChange} />
            </div>
        );
    }
}