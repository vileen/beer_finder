import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: ''};

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
        this.props.onSearchTermChange(event.target.value);
    }

    render() {
        return (
            <input
                placeholder="Get your favourite beer!"
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}
            />
        );
    }
}