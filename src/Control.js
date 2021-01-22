import React, { Component } from 'react';
import SearchControl from './SearchControl';
import SortControl from './SortControl';
// import '../App.css';

class Control extends Component {
    render() {
        return (
            <div className="row mt-15 mb-10">
                <SearchControl onSearch={this.props.onSearch}/>
                <SortControl onSort={this.props.onSort}/>
            </div>
        );
    }
}

export default Control;