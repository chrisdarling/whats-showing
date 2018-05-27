import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import SlideMenu from './SlideMenu';
import * as searchActions from '../../actions/search';
import NavigationSearch from './NavigationSearch';
import MovieMenu from './MovieMenu';
import { Toggle } from 'shared';
import './style.css';

const baseClass = 'whats-showing-navbar';

class NavBar extends Component {
    render() {
        return (
            <Toggle>
                {({ on: open, toggle }) => (
                    <header className={baseClass}>
                        <div className={`${baseClass}-container`}>
                            <div className="nav-bar-left hide-lg" onClick={toggle}>
                                <Icon className="menu-icon" type={open ? 'menu-fold': 'menu-unfold'} />
                            </div>
                            <div className="title-container">
                                <Link to="/" className="menu-item-link">
                                    <Icon type="play-circle-o" />
                                    <h1 className="title">WHAT'S SHOWING</h1>
                                </Link>
                            </div>
                            <div className="nav-bar-right">                        
                                <MovieMenu />
                                <NavigationSearch {...this.props}  />
                            </div>
                        </div>
                        <SlideMenu className={baseClass} toggleMenu={toggle} onChange={this.handleChange} open={open} />
                    </header>
                )}
            </Toggle>
        );
    }
}

export default withRouter(connect(({ search }) => ({
    search
}),
    searchActions,
)(NavBar));