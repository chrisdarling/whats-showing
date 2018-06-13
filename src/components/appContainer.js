import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import Main from './Main';
import MoviePage from './MoviePage';
import MovieContainer from './MovieContainer';
import SearchContainer from './SearchContainer';
import ProfileContainer from './ProfileContainer';
import FindMovieContainer from './FindMovieContainer';

export default class AppContainer extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <div className="wrapper">
                    <Switch>
                        <Route path="/movies/movie/:id" component={MoviePage} /> 
                        <Route path="/movies/find/" component={FindMovieContainer}/>
                        <Route path="/profile/:id" component={ProfileContainer} />
                        <Route path="/movies" component={MovieContainer} />
                        <Route path="/search/:type/:searchString/:page" component={SearchContainer} />
                        <Route path="/search/:type/:searchString/" component={SearchContainer} />
                        <Route path="/" exact component={Main} />
                        <Route component={Main} />
                    </Switch >
                </div>
                <Footer />
            </div>
        );
    }
}