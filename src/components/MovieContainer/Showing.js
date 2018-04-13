import React, { Component } from 'react';
import { connect } from 'react-redux';
import SectionContainer from '../SectionContainer';
import * as movieActions from '../../actions/movies';

const POSTER_CARD_LIMIT = 20;

class ShowingMovieContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadShowingPage();
    }
    
    render() {
        const { movies } = this.props;
        return (
            <SectionContainer type="showing" title="Now Playing" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
        );
    }
}

export default connect(({ movies }) => ({ 
    movies,
}),
    movieActions,
)(ShowingMovieContainer);