import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PosterContainer from './PosterContainer';
import './style.css';

const baseClass = 'whats-showing-section';

export default class SectionContainer extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        section: PropTypes.string,
    }

    renderPosterCards = () => {
        const posterProps = this.props[this.props.type];
        let { results } = posterProps;
        results = results.slice(0, this.props.cardLimit);
        return results.map(movie => <PosterContainer key={movie.id} className={baseClass} {...movie} />);
    }

    renderLoadingCards = () => {
        let posterComponents = [];
        const movie = { title: "" };
        for (var i = 0; i < this.props.cardLimit; i++) {
            posterComponents.push(<PosterContainer key={i} loader={true} className={baseClass} {...movie} />);
        }

        return posterComponents;
    }

    render() {
        
        const { title, type, section } = this.props;
        const posterProps = this.props[type];
        
        if (posterProps.loading) {
            return (
            <section className={baseClass}>
                <Link to={`/${section}/${type}`} className="menu-item-link">
                    <h2 className="section-title">{title}</h2>
                    <div className="title-border"></div>
                </Link>
                <div className={`${baseClass}-card-container`}>
                    {this.renderLoadingCards()}
                </div>
            </section>
            );
        }

        return (
            <section className={baseClass}>
                <Link to={`/${section}/${type}`}  className="menu-item-link">
                    <h2 className="section-title">{title}</h2>
                </Link>
                <div className={`${baseClass}-card-container`}>
                    {this.renderPosterCards()}
                </div>
            </section>
        );
    }
}