import React, { Component } from 'react';
import { connect } from 'react-redux';
import SectionContainer from '../SectionContainer';
import * as movieActions from '../../actions/movies';

const POSTER_CARD_LIMIT = 20;

class PopularMovieContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadPopularPage();
    }

    render() {
        const { movies } = this.props;
        return (
            <SectionContainer type="popular" title="Popular Movies" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
        );
    }
}

export default connect(({ movies }) => ({ 
    movies,
}),
    movieActions,
)(PopularMovieContainer);

