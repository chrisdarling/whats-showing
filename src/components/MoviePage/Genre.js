import React from 'react';
import { Link } from 'react-router-dom';

export default function Genre({ className, name }) {
    return (
        <Link to={`/movies/find/1?sortby=popularity.desc&genre=${name}&decade=All`} className={className}>{name}</Link>
    );
}