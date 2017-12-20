import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteLoader from 'react-infinite-loader'

import { fetchBeers, beersSearch } from '../../actions';
import Image from './ImageWithLoader';
import SearchBar from './SearchBar';

class BeersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        };

        this.handleVisit = this.handleVisit.bind(this);
    }

    componentDidMount() {
        this.props.fetchBeers();
    }

    renderList() {
        return _.map(this.props.beers, (beerData) => {
            if(beerData) {
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
            } else {
                // getting rid of loader element so that scroll cant go further and trigger next search
                document.getElementsByClassName('loader')[0].style.display = 'none';
            }
        });
    }

    handleVisit() {
        if (!this.searchActive) {
            this.setState({
                page: this.state.page + 1
            });
            this.props.fetchBeers(this.state.page);
        }
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

    setSearchActive(val) {
        this.searchActive = val;
    }

    render() {
        const beerSearch = _.debounce((term) => {this.onSearchTermChange(term)}, 500);

        return (
            <div className="beer-list">
                <SearchBar onSearchTermChange={beerSearch} searchActive={this.setSearchActive.bind(this)}/>
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