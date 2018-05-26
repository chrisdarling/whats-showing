import React, { Component } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './slideStyle.css';

export default class SlideMenu extends Component {
    constructor() {
        super();
        this.slidemenu = null;
    }
    
    componentDidMount() {
        this.slidemenu.addEventListener('touchmove', this.disableScroll);
    }

    componentWillUnmount() {
        this.slidemenu.removeEventListener('touchmove', this.disableScroll);
    }

    disableScroll = e => e.preventDefault();

    render() {
        const { open, className, toggleMenu } = this.props
        const toggleClass = classnames(`${className}-slide`, { 'open': open });
        return (
            <aside ref={node => { this.slidemenu = node; }} className={toggleClass}>
                <div className="menu-item-link logo">
                    <div onClick={toggleMenu}><Icon type="close" /></div>
                </div>
                <ul className={`${className}-slide-list`}>
                    <Link to="/" onClick={toggleMenu} className="menu-item-link home">
                        <li className="menu-item home"><span className="text">HOME</span></li>
                    </Link>
                    <li className="menu-item">
                    <Link to="/movies/find/1" onClick={toggleMenu} className="menu-item-link movies"><span className="text">MOVIES</span></Link>
                        <ul className={`${className}-slide-sublist`}>
                        <Link to="/movies" onClick={toggleMenu} className="menu-item-link"><li className="menu-sub-item">Popular</li></Link>
                            <Link to="/movies/showing" onClick={toggleMenu} className="menu-item-link"><li className="menu-sub-item">Now Showing</li></Link>
                            <Link to="/movies/upcoming" onClick={toggleMenu} className="menu-item-link"><li className="menu-sub-item">Upcoming</li></Link>
                            <Link to="/movies/find/1" onClick={toggleMenu} className="menu-item-link"><li className="menu-sub-item">Discover Movies</li></Link>
                        </ul>
                    </li>
                </ul>
            </aside>
        );
    }
}