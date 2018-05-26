import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Container = ({ children, className }) => (
    <div className={`whats-showing-page-container ${className}`}>
        {children}
    </div>
);

Container.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
};

Container.defaultProps = {
    className: "",
};

export default Container