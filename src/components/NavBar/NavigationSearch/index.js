import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import SearchBar from './SearchBar';

export default class NavigationSearch extends PureComponent {
    state = {
        focus: false,
        searchString: '',
        isMobile: false,
    }

    componentDidMount() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
        window.addEventListener('focusout', this.keyBoardClosed);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkMobile);
        window.removeEventListener('focusout', this.keyBoardClosed);
    }

    checkMobile = () => {
        if (window.innerWidth <= 768) {
            this.setState(() => ({ isMobile: true }));
        } else {
            this.setState(() => ({ isMobile: false }));
        }
    }

    keyBoardClosed = () => {
        this.setState(() => ({ focus: false }));
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({ searchString: value }));
    }

    handleKeyPress = (e) => {
        const { value: searchString } = this.searchInput.myInput;
        if (e.key === 'Enter' && searchString.length >= 2) {
            this.setState(() => ({ focus: false, searchString: '' }));
            this.props.history.push(`/search/movies/${searchString}/`);
            this.props.loadSearch({ searchString, type: 'movies' });
        }
    }

    handleSearchClick = () => {
        if (this.state.focus) {
            this.setState(() => ({ focus: false }));
            if (!this.state.isMobile) {
                setTimeout(() => this.searchInput.myInput.blur(), 0);
            }
        } else {
            this.setState(() => ({ focus: true, searchString: '' }));
            if (!this.state.isMobile) {
                setTimeout(() => this.searchInput.myInput.focus(), 0);
            }
        }
    }

    render() {
        return (
            <div className="search">
                <SearchBar 
                    ref={(input) => { this.searchInput = input; }} 
                    focus={this.state.focus}
                    isMobile={this.state.isMobile}
                    onChange={this.handleChange} 
                    handleKeyPress={this.handleKeyPress}
                    searchString={this.state.searchString}
                    className="whats-showing-nav-searchbar " />
                <div onClick={this.handleSearchClick}>
                    <Icon type="search" />
                </div>
            </div>
        )
    }
}