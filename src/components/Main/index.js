import React, { Component } from 'react';
import { connect } from 'react-redux';

import SectionContainer from '../SectionContainer';
import NowPlaying from './NowPlaying';
import * as movieActions from '../../actions/movies';
import './style.css';

const POSTER_CARD_LIMIT = 12;

class Main extends Component {
    componentDidMount()  {
        this.props.loadHomePage();
    }

    render() {
        const { movies } = this.props;
        return (
            <div className="whats-showing-main">
                <NowPlaying type="showing" section="movies" title="Now Playing" cardLimit={10} {...movies} />
                <SectionContainer type="popular" title="Popular" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
                <SectionContainer type="upcoming" title="Upcoming Movies" section="movies" cardLimit={POSTER_CARD_LIMIT} {...movies} />
            </div>
        );
    }
}

export default connect(({ movies }) => ({ 
    movies,
}),
    movieActions,
)(Main);