import React, { Component } from 'react';
import { connect } from 'react-redux';

import SectionContainer from '../SectionContainer';
import { Container } from 'shared';
import NowPlaying from './NowPlaying';
import * as movieActions from '../../actions/movies';

const POSTER_CARD_LIMIT = 12;

class Main extends Component {
    componentDidMount()  {
        this.props.loadHomePage();
    }

    render() {
        const { movies } = this.props;
        return (
            <Container>
                <NowPlaying type="showing" section="movies" title="Now Showing Movies" cardLimit={10} {...movies} />
                <SectionContainer type="popular" title="Popular Movies" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
                <SectionContainer type="upcoming" title="Upcoming Movies" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
            </Container>
        );
    }
}

export default connect(({ movies }) => ({ 
    movies,
}),
    movieActions,
)(Main);