import React, { Component } from 'react';
import DetailItem from './DetailItem';
import './style.css';

export default class DetailsContainer extends Component {
    renderDetailItems = () => {
        const { crew } = this.props;
        const jobs = ['Director', 'Editor'];
        const departments = ['Writing', 'Production', 'Camera', 'Editing', 'Sound', 'Visual Effects'];

        if (!!crew) {
            let jobCrew = [];
            let departmentCrew = [];
            jobs.forEach(job => {
                const jobCredits = crew.filter(c =>  c.job === job);
                jobCrew.push(<DetailItem className="detail-item" key={job} detailTitle={job} credits={jobCredits}  />);
            });
            departments.forEach(department => {
                const departmentCredits = crew.filter(c => c.department === department);
                departmentCrew.push(<DetailItem className="detail-item" key={department} detailTitle={department} credits={departmentCredits}  />);
            });

            return [jobCrew, departmentCrew];
        }

    }

    render() {
        const { className } = this.props;
        return (
            <div className={`${className}-additional-details`}>
                <h2 className="title">Movie Details</h2>
                <div className="detail-items">
                    {this.renderDetailItems()}
                </div>
            </div>
        );
    }
}