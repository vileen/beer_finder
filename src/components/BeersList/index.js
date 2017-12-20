import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller'

import { fetchBeers, beersSearch } from '../../actions';
import Image from './ImageWithLoader';
import SearchBar from './SearchBar';

class BeersList extends Component {
    constructor(props) {
        super(props);

        this.state = { isRestart: false };

        this.hasMore = true;
        this.handleVisit = this.handleVisit.bind(this);
    }

    renderList() {
        return _.map(this.props.beers, (beerData) => {
            if(beerData) {
                this.hasMore = true;
                return (
                    <div key={beerData.id} className="list-group-item list-group-item-action">
                        <Link to={`/beers/${beerData.id}`}>
                            <Image url={beerData.image_url}/>
                            <div className="beer-info">
                                <h4>{beerData.name}</h4>
                                <hr />
                                <p>{beerData.tagline}</p>
                            </div>
                        </Link>
                    </div>
                )
            } else {
                // getting rid of loader element so that scroll cant go further and trigger next search
                this.hasMore = false;
            }
        });
    }

    handleVisit(page) {
        if(this.state.isRestart) {
            this.setState({ isRestart: false });
        }
        if (!this.searchActive) {
            this.props.fetchBeers(page);
        }
    }

    onSearchTermChange(term) {
        if(term) {
            document.getElementsByClassName('loader')[0].style.display = 'none';
            this.props.beersSearch(term);
        } else {
            document.getElementsByClassName('loader')[0].style.display = 'block';
            this.hasMore = true;
            this.setState({ isRestart: true });
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
                <InfiniteScroll
                    className="list-group"
                    pageStart={0}
                    loadMore={this.handleVisit}
                    hasMore={this.hasMore}
                    isRestart={this.state.isRestart}
                    loader={<div className="loader" />}>
                    {this.renderList()}
                </InfiniteScroll>
            </div>
        );
    }
}

function mapStateToProps({ beers }) {
    return { beers };
}

export default connect(mapStateToProps, { fetchBeers, beersSearch })(BeersList);