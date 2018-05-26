import React,  { Component } from 'react';
import { Button } from 'antd';
import './style.css';

const baseClass = 'whats-showing-pager';
export default class Pager extends Component {
    get Results() {
        const { type, movies, people } = this.props;
        return type === 'movies' ? movies && movies.results : people && people.results;
    }

    get Page() {
        const { type, movies, people } = this.props;
        return type === 'movies' ? movies && movies.page  : people && people.page;
    }

    get TotalPages() {
        const { type, movies, people } = this.props;
        return type === 'movies' ? movies && movies.total_pages : people && people.total_pages;
    }

    handleMoreClick = () => {
        const { onPageChange } = this.props;
        if (!this.Page) return;

        if (this.Page < this.TotalPages) {
            onPageChange((this.Page*1)+1);
        }
    }

    handlePrevClick = () => {
        const { onPageChange } = this.props;
        if (!this.Page) return;

        if (this.Page > 1) {
            onPageChange((this.Page*1)-1);
        }
    }

    render() {
        if (!this.Results || this.Results.length === 0) return null;

        return (
            <div className={baseClass}>
                <Button type="default" className="prev" onClick={this.handlePrevClick}>
                    Prev
                </Button>
                <div className="page">Page {this.Page} of {this.TotalPages}</div>
                <Button type="default" className="more" onClick={this.handleMoreClick}>
                    More
                </Button>
            </div>
        );
    }
}