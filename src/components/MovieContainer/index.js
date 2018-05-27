import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '../../shared/Container';
//import { AsyncComponent } from 'shared';
import PopularMovieContainer from './Popular';
import ShowingMovieContainer from './Showing';
import UpcomingMovieContainer from './Upcoming';

// const PopularMovieContainer = AsyncComponent(() => import('./Popular')
//     .then(module => module.default))
// const ShowingMovieContainer = AsyncComponent(() => import('./Showing')
//     .then(module => module.default))
// const UpcomingMovieContainer = AsyncComponent(() => import('./Upcoming')
//     .then(module => module.default))

export default class MovieContainer extends Component {
    render() {
        return (
            <Container>
                <Switch>
                    <Route path="/movies/showing" exact component={ShowingMovieContainer} />
                    <Route path="/movies/upcoming" exact component={UpcomingMovieContainer} />
                    <Route path="/" component={PopularMovieContainer} />
                </Switch>
            </Container>
        );
    }
}
