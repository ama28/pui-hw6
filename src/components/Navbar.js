import { Component } from 'react';
import '../App.css';

class Navbar extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <img src={process.env.PUBLIC_URL + "/assets/logo/logo-01.svg"} alt="Bun Bun Bake Shop Logo" width="100%"/>
                </div>
    
                {/* container for navigation buttons and description */}
                <div className="header-detail">
                <div className="nav">
                    <a href="#">PRODUCTS</a>
                    <div className="cart">
                        <a onClick={this.props.toggleCart}>CART</a>
                        
                        {/* for the 3-second cart popup & display that is not in this iteration*/}

                        {/* <div id="cart-display">
                        <span>{this.props.totalItems}</span>
                        <span> items</span> 
                        <br />
                        <span>Total: $</span>
                        <span>{this.props.totalPrice}</span>
                        </div>
                        {this.props.isPopupVisible && <div id="popup">
                            <p>Added to Cart:</p>
                            <br />
    
                            <p id="popupLabel"><b>{this.props.curType}</b></p>
    
                            <p id="popupGlazing">{this.props.curGlazing}</p>
    
                            <span>Pack of </span>
                            <span id="popupPackSize">{this.props.curPackSize}</span>
                            <br />
    
                            <span>Price: </span>
                            <span id="popupPrice">${this.props.curPrice}</span>
                        </div>} */}
                    </div>
                </div>
                <div className="header-description">
                    <h1>Our hand-made cinnamon rolls</h1>
                </div>
                </div>
            </div>
        );
    }
}

export default Navbar