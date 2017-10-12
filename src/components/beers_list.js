import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteLoader from 'react-infinite-loader'

import { fetchBeers, beersSearch } from '../actions';
import Image from './image_with_loader';
import SearchBar from './search_bar';

class BeersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        };

        this.handleVisit = _.throttle(this.handleVisit.bind(this), 500).bind(this);
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    renderList() {
        return _.map(this.props.beers, (beerData) => {
            return (
                <li key={beerData.id} className="list-group-item list-group-item-action">
                    <Link to={`/beers/${beerData.id}`}>
                        <Image url={beerData.image_url}/>
                        <div className="beer-info">
                            <h4>{beerData.name}</h4>
                            <hr />
                            <p>{beerData.tagline}</p>
                        </div>
                    </Link>
                </li>
            )
        });
    }

    handleVisit() {
        this.setState({
            page: this.state.page + 1
        });
        this.props.fetchBeers(this.state.page);
    }

    onSearchTermChange(term) {
        if(term) {
            this.props.beersSearch(term);
        } else {
            this.setState({
                page: 1
            });
            this.props.fetchBeers(this.state.page);
        }
    }

    render() {
        const beerSearch = _.debounce((term) => {this.onSearchTermChange(term)}, 500);

        return (
            <div className="beer-list">
                <SearchBar onSearchTermChange={beerSearch}/>
                <ul className="list-group">
                    {this.renderList()}
                </ul>
                <InfiniteLoader onVisited={ () => this.handleVisit() } />
            </div>
        );
    }
}

function mapStateToProps({ beers }) {
    return { beers };
}

export default connect(mapStateToProps, { fetchBeers, beersSearch })(BeersList);