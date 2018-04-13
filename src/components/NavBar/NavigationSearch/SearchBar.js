import React, { Component }  from 'react';
import classnames from 'classnames';
import './searchBar.css';

export default class SearchBar extends Component {
    render() {
        const { focus, isMobile, handleKeyPress } = this.props;
        const containerClass = classnames('whats-showing-nav-search', { 'show': focus });
        const inputClass = classnames('nav-search-input', { 'show': focus });

        if (isMobile && !focus) return null;

        return (
            <div className={containerClass}>
                <input className={inputClass} 
                    ref={(input) => { this.myInput = input  }} 
                    autoFocus={isMobile}
                    type="text"
                    placeholder="Search movies and people"
                    onKeyPress={handleKeyPress}
                    />
            </div>
        );
    }
}