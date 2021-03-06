import React, { Component } from 'react';
import { Filter } from 'shared';
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
        return (
            <div className="result-filter">
                <Filter defaultValue={sortby} value={sortby} label="Sort By" onChange={onSortChange}>
                    {Object.keys(sortOptions).map(key => <Filter.Option key={key} value={sortOptions[key]}>{key}</Filter.Option>)}
                </Filter>
                <Filter defaultValue={genre} value={genre} label="Genre" onChange={onGenreChange}>
                    <Filter.Option key="genre-default" value="All">All</Filter.Option>
                    {genres.map(filter => <Filter.Option key={filter.id} value={filter.name}>{filter.name}</Filter.Option>)}
                </Filter>
                <Filter defaultValue={decade} value={decade} label="Decade" onChange={onDecadeChange} options={decades}>
                    <Filter.Option key="decade-default" value="All">All</Filter.Option>
                    {decades.map(filter => <Filter.Option key={filter} value={filter}>{filter}</Filter.Option>)}
                </Filter>
            </div>
        );
    }
}