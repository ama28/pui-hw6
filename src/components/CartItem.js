import React, { Component } from 'react';
import '../App.css';

class CartItem extends Component {
    render() {
        return(
            <div className='cartItem'>
                <img src={this.props.imageURL} alt={this.props.type} width="150px"/>
                <p>{this.props.type}</p>
                <p>Glazing: {this.props.glazingLabel}</p>
                <p>Pack Size: {this.props.packSize}</p>
                <p><b>$ {this.props.price}</b></p>
                <button onClick={() => this.props.removeFn(this.props.index, this.props.packSize, this.props.price)}>Remove</button>
            </div>
        )
    }
}

export default CartItem