import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import clasnames from 'classnames';
import * as profileActions from  '../../actions/profile';
import { Container } from 'shared';
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
        jobFilter: null,
        sortFilter: 'Popularity',
        jobs: ['Actor'],
        decadeFilter: 'All',
        year: null,
        seeMore: false,
    }

    static getDerivedStateFromProps(props, state) {
        const { profile = {} } = props;
        const { cast = [], crew = [] } = profile;
        if (!!cast && !!crew) {
            const jobCountDictionary = createJobCountDictionary(crew, cast);
            const jobCountArray = createJobCountArray(jobCountDictionary);

            if (!jobCountArray.length) {
                return {
                    ...state,
                    jobFilter: null,
                };
            }

            if (!state.jobFilter) {
                return {
                    ...state,
                    jobs: Object.keys(jobCountDictionary) || ['Actor'],
                    jobFilter: !!jobCountArray.length ? jobCountArray[0].job : null,
                }; 
            }
 
            return {
                ...state,
                jobs: Object.keys(jobCountDictionary) || ['Actor'],
            };
        }
        return null;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { match, loadProfile } = this.props;
        loadProfile(match.params.id);
    }

    get seeMore() {
        const { profile: { details: { biography } } } = this.props;
        return !!biography && biography.length > biographyLength;
    }

    render() {
        const { profile: { details, loading }, profile } = this.props;
        const { biography, name } = details; 
        const infoClass = clasnames('actor-info', { 'auto-height': this.state.seeMore });

        return (
            <Container className={baseClass}>
                <div className="profile-container">
                    <div className="left-column">
                        {!loading && <ProfileImage className="profile-image-container" {...details} />}
                        {loading && <ProfileImage className="profile-image-container" />}
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
            </Container>
        );
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
        this.setState(state => ({ seeMore: !state.seeMore }));
    }

    handleYearChange = (year) => {
        this.setState(() => ({ year }));
    }
}

function createJobCountDictionary(crew, cast) {
    let jobCountDictionary = {};
    crew.forEach(c => {
        if (!!jobCountDictionary[c.job]) {
            jobCountDictionary = {
                ...jobCountDictionary,
                [c.job]: jobCountDictionary[c.job] + 1,
            };
        } else {
            jobCountDictionary = {
                ...jobCountDictionary,
                [c.job]: 1,
            };
        }
    });
    
    if (!!cast.length) {
        jobCountDictionary = {
            ...jobCountDictionary,
            Actor: cast.length,
        };
    }

    return jobCountDictionary;
}

function createJobCountArray(jobCountDictionary) {
    return Object.keys(jobCountDictionary)
            .map(key => ({ job: key, count: jobCountDictionary[key] }))
            .sort((a, b) => {
                if (a.count > b.count) return -1;
                if (a.count < b.count) return 1;
                return 0;
            });
}

export default connect(({ profile }) => ({
    profile,
}),
    profileActions,
)(ProfileContainer);