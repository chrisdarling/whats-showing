import React from 'react';
import { Icon } from 'antd';
export function NextNavButton(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block'}}
            onClick={onClick}
        >
            <Icon type="right-circle" />
        </div>
    );
}

export function PrevNavButton(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block'}}
            onClick={onClick}
        >
            <Icon type="left-circle" />
        </div>
    );
}