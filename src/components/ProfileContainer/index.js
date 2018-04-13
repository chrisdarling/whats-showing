import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import clasnames from 'classnames';
import * as profileActions from  '../../actions/profile';
import ProfileImage from './ProfileImage';
import MovieCredtis from './MovieCredits';
import CreditFilter from './CreditFilter';
import './style.css';

const baseClass = 'whats-showing-profile';
const biographyLength = 120;
const displayBiography = (bio, seeMore) => {
    if (!bio) {
        return null;
    } else if (bio.length > biographyLength && !seeMore) {
        return bio.substring(0, biographyLength) + '...';
    }

    return bio;
}
class ProfileContainer extends Component {
    state = {
        jobFilter: 'Actor',
        sortFilter: 'Popularity',
        jobs: ['Actor'],
        decadeFilter: 'All',
        year: null,
        seeMore: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { match, loadProfile } = this.props;
        loadProfile(match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        const { profile: { cast, crew } } = nextProps;
        if (!!cast && !!crew) {
            const jobs = crew.reduce((prev, cur) => {
                if (prev.some(p => !!cur && p === cur.job) || cur.media_type !== 'movie') {
                    return prev;
                }
                prev.push(cur.job);
                return prev;
            }, []);
            if (cast.length > 0) {
                jobs.push('Actor');
                this.setState({ jobs });
            } else {
                this.setState({ jobs, jobFilter: jobs[0] });
            } 
        }
    }

    get seeMore() {
        const { profile: { details: { biography } } } = this.props;
        return !!biography && biography.length > biographyLength;
    }
    
    handleChange = (jobFilter) => {
        this.setState({ jobFilter });
    }

    handleSortChange = (sortFilter) => {
        this.setState({ sortFilter });
    }

    handleDecadeChange = (decadeFilter) => {
        this.setState(() => ({ decadeFilter, year: null }));
    }

    handleShowBiography = () => {
        this.setState({ seeMore: !this.state.seeMore });
    }

    handleYearChange = (year) => {
        this.setState(() => ({ year }));
    }

    render() {
        const { profile: { details }, profile } = this.props;
        const { biography, name } = details; 
        const infoClass = clasnames('actor-info', { 'auto-height': this.state.seeMore });

        return (
            <div className={baseClass}>
                <div className="profile-container">
                    <div className="left-column">
                        <ProfileImage className="profile-image-container" {...details} />
                        <div className={infoClass} onClick={this.handleShowBiography}>
                            <div className="profile-name">{name}</div>
                            <div className="biography">{displayBiography(biography, this.state.seeMore)}</div>
                            {this.seeMore && <span className="see-more">{this.state.seeMore ? 'See Less' : 'See More'}</span>}
                        </div>
                    </div>
                    <div className="right-column">
                        <CreditFilter className="credit-filter" 
                            jobs={this.state.jobs} 
                            name={name}
                            sortFilter={this.state.sortFilter} 
                            decadeFilter={this.state.decadeFilter}
                            onYearChange={this.handleYearChange}
                            year={this.state.year}
                            onSortChange={this.handleSortChange} 
                            onDecadeChange={this.handleDecadeChange}
                            value={this.state.jobFilter} 
                            handleChange={this.handleChange} />
                        <MovieCredtis filter={this.state.jobFilter} 
                            sortFilter={this.state.sortFilter} 
                            decadeFilter={this.state.decadeFilter}
                            year={this.state.year}
                            {...profile} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ profile }) => ({
    profile,
}),
    profileActions,
)(ProfileContainer);