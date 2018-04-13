import React, { Component } from 'react';
import './style.css';

export default class OverviewContainer extends Component {
    renderRunTime = () => {
        const { runtime } = this.props;

        return (
            <div className="runtime-container">
                <div className="title">Runtime</div>
                <div className="runtime-parent">
                    <span className="runtime">{runtime ? `${runtime}mins` : "N/A"}</span>
                </div>
            </div>
        );
    }
    
    renderLanguages = () => {
        const { spoken_languages } = this.props;
        let languages = [];

        if (!!spoken_languages) {
            spoken_languages.forEach(s =>  {
                if (!!s.name)
                    languages.push(<div key={s.name} className="language">{s.name}</div>);
            });
        }
        
        return (
            <div className="language-container">
                <div className="title">Languages</div>
                <div className="languages">
                    {languages}
                </div>
            </div>
        );
    }

    render() {
        const { className, overview, tagline } = this.props;
        return (
            <div className={`${className}-overview`}>
                <div className="tagline">{tagline}</div>
                <div className="overview">
                    <div className="overview-info">{overview}</div>
                    {this.renderRunTime()}
                    {this.renderLanguages()}
                </div>
            </div>
        );
    }
}