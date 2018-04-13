import React, { Component } from 'react';

export default class PosterCardError extends Component {
    render() {
        const { className } = this.prop;
        const image = <img className="poster-image" src="/assets/placeholder.jpg" alt="poster" />;
        return ( 
            <div className={`${className}-card`}>
                {image}
                <div className="card-content">
                    <div className="card-body">
                        <h3 className="card-title">There Was an Error Loading this card</h3>
                    </div>
                </div>
            </div>
        );
    }
}