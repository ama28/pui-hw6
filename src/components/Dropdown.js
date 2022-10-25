import React, { Component } from 'react';
import '../App.css';

class Dropdown extends Component {
    render () {
        return (
          <div className="selector">
            <div>Glazing:</div>
            {/* onChange="priceChange(this, true)" */}
            <select className="options dropdown glazingOptions" onChange={this.props.updateGlazing}>
                <option value="0">Keep Original</option>
                <option value="0">Sugar Milk</option>
                <option value="0.5">Vanilla Milk</option>
                <option value="1.5">Double Chocolate</option>
            </select>
          </div>
        )
    }
}

export default Dropdown