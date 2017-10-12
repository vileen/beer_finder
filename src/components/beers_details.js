import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from './loader';
import { fetchBeer } from '../actions';
import Image from './image_with_loader';

class BeerShow extends Component {
    componentDidMount() {
        if(!this.props.beer) {
            const { id } = this.props.match.params;
            this.props.fetchBeer(id);
        }
    }

    renderFoodPairing(foodData) {
        return (
            <li
                key={_.uniqueId('food_')}
            >
                {foodData}
            </li>
        )
    }

    render() {
        const { beer } = this.props;

        if(!beer) {
            return <Loader />
        }

        return (
            <div className="beer-details">
                <Image url={beer.image_url} />
                <div className="beer-info">
                    <div className="beer-primary-info">
                        <h2>{beer.name}</h2>
                        <h4>{beer.tagline}</h4>
                    </div>
                    <hr />
                    <div className="beer-specific-info">
                        <p>ABV: {beer.abv} / IBU: {beer.ibu} / EBC: {beer.ebc}</p>
                        <p>{beer.description}</p>
                        <div>
                            <h4>Tips: </h4>
                            <p>{beer.brewers_tips}</p>
                        </div>
                        <div className="beer-serverd-container">
                            <h4>Best serverd with:</h4>
                            <ul>
                                {this.props.beer.food_pairing.map(this.renderFoodPairing)}
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to="/" className="btn btn-primary">X</Link>
            </div>
        );
    }
}

function mapStateToProps({ beers }, ownProps) {
    return { beer: beers[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBeer })(BeerShow);