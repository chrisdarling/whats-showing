import React from 'react';

export default function Genre({ className, name }) {
    return (
        <div className={className}>{name}</div>
    );
}