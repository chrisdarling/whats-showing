import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from '../../shared/AsyncComponent';
import './style.css';

const PopularMovieContainer = AsyncComponent(() => import('./Popular')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const ShowingMovieContainer = AsyncComponent(() => import('./Showing')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const UpcomingMovieContainer = AsyncComponent(() => import('./Upcoming')
    .then(module => module.default)
    .catch(() => window.location.reload()));

const baseClass = 'whats-showing-movies';
export default class MovieContainer extends Component {
    render() {
        return (
            <div className={baseClass}>
                <Switch>
                    <Route path="/movies/showing" exact component={ShowingMovieContainer} />
                    <Route path="/movies/upcoming" exact component={UpcomingMovieContainer} />
                    <Route path="/" component={PopularMovieContainer} />
                </Switch>
            </div>
        );
    }
}
