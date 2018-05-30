import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from '../../actions/movies';
import { Container, Push } from 'shared';
import PosterSideBar from './PosterSideBar';
import OverviewContainer from './OverviewContainer';
import CastContainer from './CastContainer';
import MediaContainer from './MediaContainer';
import ReccomendationContainer from './ReccomendationContainer';
import './style.css';

class MoviePage extends Component {
    state = {
        hasError: false,
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        const { match, loadMovie } =  this.props;
        loadMovie(match.params.id);
    }

    handleLinkClick = id => {
        window.scrollTo(0, 0);
        const { loadMovie } = this.props;
        loadMovie(id);
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }
    render() {
        const baseClass = 'whats-showing-movie';
        const { movies: { movie, cast, videos, images, reccomendations } } = this.props;
        const { error, ...rest } = movie;

        if (this.state.hasError || error) 
            return <div>Sorry, there was an issue loading this Movie</div>;

        return (
            <Container className={baseClass}>
                <div className={`${baseClass}-details`}>
                    <div className="column-right">
                        <OverviewContainer className={baseClass} {...rest} {...cast} />
                        <CastContainer className={baseClass} {...cast} />
                        <MediaContainer className={baseClass} {...videos} {...images} />
                        <ReccomendationContainer className={baseClass} onClick={this.handleLinkClick} {...reccomendations} />
                    </div>
                    <div className="column-left">
                        <PosterSideBar className="movie-side-bar" onClick={this.handleLinkClick} videos={videos} {...rest} />
                    </div>
                </div>
                <Push />
            </Container>
        );
    }
}

export default connect(({ movies }) => ({ 
    movies,
}),
    movieActions,
)(MoviePage);