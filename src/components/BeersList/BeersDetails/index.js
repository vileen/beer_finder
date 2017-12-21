import _ from 'lodash';
import React from 'react';

import Image from '../ImageWithLoader';

export default (props) => {
    return (
        <div className="beer-details">
            <Image url={props.beer.image_url} />
            <div className="beer-info">
                <div className="beer-primary-info">
                    <h2>{props.beer.name}</h2>
                    <h4>{props.beer.tagline}</h4>
                </div>
                <hr />
                <div className="beer-specific-info">
                    <p>ABV: {props.beer.abv} / IBU: {props.beer.ibu} / EBC: {props.beer.ebc}</p>
                    <div>
                        <h4>Tips: </h4>
                        <p>{props.beer.brewers_tips}</p>
                    </div>
                    <div className="beer-served-container">
                        <h4>Best served with:</h4>
                        <ul>
                            {props.beer.food_pairing.map((foodData) => {
                                return ( <li
                                    key={_.uniqueId('food_')}
                                >
                                    {foodData}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}