import React, { Component } from 'react';
import { Select } from 'antd';
import { genres, decades } from '../../constants';

const sortOptions = {
    "Popularity": 'popularity.desc',
    "Most Anticipated": 'vote_average.asc',
    "Most Voted": 'vote_count.desc',
    "Release Date": 'release_date.desc',
}
export default class ResultFilter extends Component {
    render() {
        const { onSortChange, sortby = 'popularity.desc', genre = 'All', onGenreChange, decade = 'All', onDecadeChange } = this.props;
        const { Option } = Select;
        return (
            <div className="result-filter">
                <Select className="sort-filter" value={sortby} size="small" onChange={onSortChange}>
                    {Object.keys(sortOptions).map(key =>  <Option key={key}  value={sortOptions[key]}>{key}</Option>)}
                </Select> 
                <Select className="sort-filter" value={genre} size="small" onChange={onGenreChange}>
                    <Option value="All">Genre</Option>
                    {genres.map(g => <Option key={g.name} value={g.name}>{g.name}</Option>)}
                </Select>
                <Select className="sort-filter" value={decade} size="small" onChange={onDecadeChange}>
                    <Option value="All">Decade</Option>
                    {decades.map(d => <Option key={d} value={d}>{d}</Option>)}
                </Select> 
            </div>
        );
    }
}