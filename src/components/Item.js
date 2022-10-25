import React, { Component } from 'react';
import '../App.css';
import Dropdown from './Dropdown'
import CountSelector from './CountSelector';

class Item extends Component {
    constructor(props){
      super(props);
      this.state = {
        price: this.props.basePrice,
        glazing: 0,
        glazingLabel: "Keep Original",
        packSize: 1,
        packMultiplyer: 1
      }
    }

    //updates the price of the item
    updatePrice = () => {
      this.setState(prevState => ({
          ...prevState,
          price: ((parseFloat(this.props.basePrice) + parseFloat(this.state.glazing)) * parseFloat(this.state.packMultiplyer)).toFixed(2)
      }))
    }

    //updates glazing fields of the item after a dropdown option is selected
    updateGlazing = (event) => {
      var index = event.target.selectedIndex

      this.setState(prevState => ({
        ...prevState,
        glazing: event.target.value,
        glazingLabel: event.target[index].innerHTML
      }), () => {this.updatePrice()
      })
    }

    //updates pack size fields of the item after a pack size is selected
    updatePackSize = (event) => {
      const newPackMultiplyer = event.target.value
      const newPackSize = event.target.id
      
      this.setState(prevState => ({
        ...prevState,
        packMultiplyer: newPackMultiplyer,
        packSize: newPackSize
      }), () => {this.updatePrice()
      })
    }

    render() {
        return(
            (this.props.type.toLowerCase().includes(this.props.searchSubmission) && <div className="item">
              <img src={this.props.imageURL} alt={this.props.type} width="100%"/>
              
              <h2>{this.props.type}</h2>

              {/* <!-- dropdown --> */}
              <Dropdown updateGlazing={this.updateGlazing}/>

              {/* <!-- count selector --> */}
              <CountSelector updatePackSize={this.updatePackSize}/>

              {/* <!-- price & add to cart --> */}
              <div className="selector">
                <h2>$ {this.state.price}</h2>
                <div className="options cart">
                  <a onClick={() => this.props.addItem(this.props.imageURL, this.props.type, this.state.glazingLabel, this.state.packSize, this.state.price)} 
                    alt="Add to Cart Button"><h2>Add to Cart</h2></a>
                </div>
              </div>
            </div>)
        );
    }
}

export default Item