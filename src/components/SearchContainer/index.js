import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/search';
import { Container } from 'shared';
import SearchResults from './SearchResults';
import SearchSideBar from './SearchSideBar';
import './style.css';

const baseClass = 'whats-showing-search';
class SearchContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        const { params: { searchString, page, type } } = this.props.match;
        this.props.loadSearch({ searchString, page, type });
    }

    handleClick = (type) => {
        const { searchString } = this.props.search
        this.props.history.push(`/search/${type}/${searchString}/`);
        this.props.loadSearch({ type, searchString });
    }

    handleNextPage = (page) => {
        window.scrollTo(0,0);
        const {  type, searchString } = this.props.search;
        this.props.history.push(`/search/${type}/${searchString}/${page}`);
        this.props.loadSearch({ searchString, page, type });
    }

    render() {
        const { search } =  this.props;
        return (
            <Container className={baseClass}>
                <SearchSideBar className={baseClass} onClick={this.handleClick} {...search}  />
                <SearchResults className={baseClass} onPageChange={this.handleNextPage} {...search} />
            </Container>
        );
    }
}

export default connect(({ search }) => ({
    search
}),
    searchActions,
)(SearchContainer);