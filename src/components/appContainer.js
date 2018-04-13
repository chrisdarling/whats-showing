import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from '../shared/AsyncComponent';
import NavBar from './NavBar';
import Footer from './Footer';
import Push from '../shared/Push';

const Main = AsyncComponent(() => import('./Main')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const MoviePage = AsyncComponent(() => import('./MoviePage')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const MovieContainer = AsyncComponent(() => import('./MovieContainer')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const SearchContainer = AsyncComponent(() => import('./SearchContainer')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const ProfileContainer = AsyncComponent(() => import('./ProfileContainer')
    .then(module => module.default)
    .catch(() => window.location.reload()));
const FindMovieContainer = AsyncComponent(() => import('./FindMovieContainer')
    .then(module => module.default)
    .catch(() => window.location.reload()));

export default class AppContainer extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <div className="wrapper">
                    <Switch>
                        <Route path="/movies/movie/:id" component={MoviePage} /> 
                        <Route path="/movies/find/:page" component={FindMovieContainer}/>
                        <Route path="/profile/:id" component={ProfileContainer} />
                        <Route path="/movies" component={MovieContainer} />
                        <Route path="/search/:type/:searchString/:page" component={SearchContainer} />
                        <Route path="/search/:type/:searchString/" component={SearchContainer} />
                        <Route path="/" exact component={Main} />
                    </Switch >
                    <Push />
                </div>
                <Footer />
            </div>
        );
    }
}