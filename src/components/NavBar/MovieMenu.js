import React from 'react';
import { Link } from 'react-router-dom';

const MovieMenu = () => 
    (
        <ul className="menu-items hide-sm">
            <Link to="/" className="menu-item-link"><li className="menu-item">HOME</li></Link>
            <li className="menu-item">
                <Link to="/movies/find" className="menu-item-link">MOVIES</Link>
                <div className="sub-menu-container">
                    <ul className="menu-sub-items">
                        <Link to="/movies/showing" className="menu-item-link"><li className="menu-sub-item">Now Showing</li></Link>
                        <Link to="/movies/upcoming" className="menu-item-link"><li className="menu-sub-item">Upcoming</li></Link>
                        <Link to="/movies" className="menu-item-link"><li className="menu-sub-item">Popular</li></Link>
                    </ul>
                </div>
            </li>
        </ul>
    );

export default MovieMenu;