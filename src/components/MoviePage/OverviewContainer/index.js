import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const DetailItem = ({ title, children }) => (
    <div className="detail-container">
        <div className="title">{title}</div>
        <div className="detail-parent">
            {children}
        </div>
    </div>
);

export default class OverviewContainer extends Component {
    static defaultProps = {
        spoken_languages: [],
        crew: [],
    } 

    render() {
        const { className, overview, tagline, runtime, spoken_languages, crew } = this.props;
        const directors = crew.filter(c => c.job === 'Director');
        return (
            <div className={`${className}-overview`}>
                <div className="tagline">{tagline}</div>
                <div className="overview">
                    <div className="overview-info">{overview}</div>
                    <DetailItem title="Director">
                        {directors.map((d, i) => 
                            <Link to={`/profile/${d.id}`} key={`${d.name}-${i}`} className="detail">
                                <div>{d.name}</div>
                            </Link>)}
                    </DetailItem>
                    <DetailItem title="Runtime">
                        <span className="detail">{runtime ? `${runtime}mins` : "N/A"}</span>
                    </DetailItem>
                    <DetailItem title="Languages">
                        {spoken_languages.map((s,i) => <div key={`${s.name || 'N/A'}-${i}`} className="detail">{s.name || 'N/A'}</div>)}
                    </DetailItem>
                </div>
            </div>
        );
    }
}