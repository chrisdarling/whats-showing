import React from 'react';
import './style.css';

export default function Footer() {
    return (
        <footer className="whats-showing-footer">
            <div className="footer-info">
                <span className="info">&#169; What's Showing is an open source site by Christopher Darling</span>
                <span className="disclaimer">Movie Data provided by <a className="tmdb" href="https://www.themoviedb.org/">TMDB</a></span>
            </div>
        </footer>
    );
}