import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import SlideMenu from './SlideMenu';
import * as searchActions from '../../actions/search';
import NavigationSearch from './NavigationSearch';
import MovieMenu from './MovieMenu';
import './style.css';

class NavBar extends Component {
    state = {
        open: false,
    }

    handleOpen = () => {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        const baseClass = 'whats-showing-navbar';
        const menuIconType = this.state.open ? 'menu-fold': 'menu-unfold';
        return (
            <header className={baseClass}>
                <div className={`${baseClass}-container`}>
                    <div className="nav-bar-left hide-lg" onClick={this.handleOpen}>
                        <Icon className="menu-icon" type={menuIconType} />
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
                <SlideMenu className={baseClass} toggleMenu={this.handleOpen} onChange={this.handleChange} open={this.state.open} />
            </header>
        );
    }
}

export default withRouter(connect(({ search }) => ({
    search
}),
    searchActions,
)(NavBar));