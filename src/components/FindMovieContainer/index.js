import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as findActions from '../../actions/find';
import { Container } from 'shared';
import MovieResults from './MovieResults';
import './style.css';

const baseClass = 'whats-showing-find-movies';
class FindMovieContainer extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
        const { location: { search } } = this.props;
        let items = {};
        const searchParams = new URLSearchParams(search);
        for (let p of searchParams.keys()) {
            items[p] = searchParams.get(p);
        }
        items = {
            ...items,
            page: 1,
        };
        this.props.loadFindMovies(items);
    }

    componentWillUnmount() {
        this.props.resetFilters();
    }

    handleSortChange = (sortby) => {
        const { find: { genre, decade } } = this.props;
        this.props.history.push(`/movies/find?sortby=${sortby}&genre=${genre}&decade=${decade}`);
        this.props.loadFindMovies({ sortby, genre, decade });
    }

    handleGenreChange = (genre) => {
        //window.scrollTo(0,0);
        const { find: { sortby, decade } } = this.props;
        this.props.history.push(`/movies/find?sortby=${sortby}&genre=${genre}&decade=${decade}`);
        this.props.loadFindMovies({ sortby, genre, decade });
    }

    handleDecadeChange = (decade) => {
        const { find: { sortby, genre } } = this.props;
        this.props.history.push(`/movies/find?sortby=${sortby}&genre=${genre}&decade=${decade}`);
        this.props.loadFindMovies({ sortby, genre, decade });
    }

    handleNextPage = (page) => {
        const { find: { sortby, genre, decade } } = this.props;
        this.props.history.push(`/movies/find?sortby=${sortby}&genre=${genre}&decade=${decade}`);
        this.props.loadFindMovies({ sortby, genre, decade, page });
    }

    render() {
        const { find } = this.props;
        return (
            <Container className={baseClass}>
                <div className={`${baseClass}-title-container`}>
                    <h2 className="section-title">
                        Discover and Find Movies
                    </h2>
                </div>
                <MovieResults 
                    className={baseClass} 
                    onSortChange={this.handleSortChange} 
                    onGenreChange={this.handleGenreChange} 
                    onDecadeChange={this.handleDecadeChange} 
                    onPageChange={this.handleNextPage}
                    {...find} />
            </Container>
        );
    }
}

export default connect(({ find }) => ({
    find,
}),
    findActions,
)(FindMovieContainer);