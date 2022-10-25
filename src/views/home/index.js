import React, { Component } from 'react';
import '../../App.css';
import Navbar from '../../components/Navbar';
import Item from '../../components/Item';
import CartItem from '../../components/CartItem';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rolls: [
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/original-cinnamon-roll.jpg",
                type: "Original Cinnamon Roll",
                basePrice: 2.49,
            },
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/apple-cinnamon-roll.jpg",
                type: "Apple Cinnamon Roll",
                basePrice: 3.49,
            },
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/raisin-cinnamon-roll.jpg",
                type: "Raisin Cinnamon Roll",
                basePrice: 2.99,
            },
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/walnut-cinnamon-roll.jpg",
                type: "Walnut Cinnamon Roll",
                basePrice: 3.49,
            },
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/double-chocolate-cinnamon-roll.jpg",
                type: "Double-Chocolate Cinnamon Roll",
                basePrice: 3.99,
            },
            {
                imageURL: process.env.PUBLIC_URL + "/assets/products/strawberry-cinnamon-roll.jpg",
                type: "Strawberry Cinnamon Roll",
                basePrice: 3.99,
            }
          ],
          cart: JSON.parse(localStorage.getItem("cart")) || [],

          totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
          totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
          // curType: "",
          // curGlazing: "",
          // curPackSize: 1,
          // curPrice: 0,
          // isPopupVisible: false,

          searchContent: "",
          searchSubmission: "",
          searchEmpty: "",

          sort: "name",
          cartOpen: false
        }
    }

    //Add to Cart button functionality
    addItem = (imageURL, type, glazingLabel, packSize, price) => {

        var newCart = this.state.cart
        newCart.push({imageURL: imageURL, type: type, glazingLabel: glazingLabel, packSize: packSize, price: price})

        localStorage.setItem("cart", JSON.stringify(newCart))
        localStorage.setItem("totalItems", JSON.stringify(parseFloat(this.state.totalItems) + parseFloat(packSize)))
        localStorage.setItem("totalPrice", JSON.stringify((parseFloat(this.state.totalPrice) + parseFloat(price)).toFixed(2)))

        console.log(JSON.parse(localStorage.getItem("cart")))

        this.setState(prevState => ({
            ...prevState,
            cart: newCart,
            totalItems: parseFloat(this.state.totalItems) + parseFloat(packSize),
            totalPrice: (parseFloat(this.state.totalPrice) + parseFloat(price)).toFixed(2),
            // curType: type,
            // curGlazing: glazingLabel,
            // curPackSize: packSize,
            // curPrice: price,
            // isPopupVisible: true
        }))
        // this.removePopup()
    }

    //removes an item from the cart display
    removeItemFromCart = (idx, itemCount, price) => {
        const newCart = this.state.cart
        newCart.splice(idx, 1)

        localStorage.setItem("cart", JSON.stringify(newCart))
        localStorage.setItem("totalItems", JSON.stringify(parseFloat(this.state.totalItems) - parseFloat(itemCount)))
        localStorage.setItem("totalPrice", JSON.stringify((parseFloat(this.state.totalPrice) - parseFloat(price)).toFixed(2)))

        console.log(JSON.parse(localStorage.getItem("cart")))

        this.setState(prevState => ({
            ...prevState,
            cart: newCart,
            totalItems: parseFloat(this.state.totalItems) - parseFloat(itemCount),
            totalPrice: (parseFloat(this.state.totalPrice) - parseFloat(price)).toFixed(2)
        }))
    }

    //toggles the cart display
    toggleCart = () => {
        this.setState(prevState => ({
            ...prevState,
            cartOpen: !this.state.cartOpen
        }))
    }

    //Removes add item popup after 3 seconds
    removePopup = () => {
        setTimeout(() => {
            this.setState(prevState => ({
                ...prevState,
                isPopupVisible: false
            }))
        }, 3000)
    }

    //updates the state to keep track of what's typed into the search bar
    updateSearch = (event) => {
        event.preventDefault()
        this.setState(prevState => ({
            ...prevState,
            searchContent: event.target.value
        }))
    }

    //updates the search submission state only when the search button is pressed
    submitSearch = () => {
        this.setState(prevState => ({
            ...prevState,
            searchSubmission: this.state.searchContent
        }))
    }

    //updates state when the user chooses a filter from the dropdown (name, basePrice)
    updateSort = (event) => {
        this.setState(prevState => ({
            ...prevState,
            sort: event.target.value
        }))
    }

    //returns an array containing an array of items to be shown and whether there are no items to be shown
    renderItems = () => {
        var itemData = [] //to hold base price, type, as well as the item component
        var itemsToRender = [] //to hold only the item components

        //sorting function for price
        const compareBasePrice = (a, b) =>
        {
            if (a[0] < b[0])
                return -1
            if (a[0] > b[0])
                return 1
            if (a[0] === b[0])
                return 0
        } 
    
        //sorting function for name
        const compareName = (a, b) => {
            return a[1].localeCompare(b[1])
        }

        let resultsCount = 0;
        
        //create an array of item data
        this.state.rolls.map((roll, idx) => {
            if (roll.type.toLowerCase().includes(this.state.searchSubmission)) resultsCount++
            itemData.push([roll.basePrice, roll.type, <Item
                imageURL={roll.imageURL}
                type={roll.type}
                basePrice={roll.basePrice}
                addItem={this.addItem}
                key={idx}
                searchSubmission={this.state.searchSubmission}
            />])
            return true;
        })

        //sort item data array based on base price or name
        if (this.state.sort === "basePrice") itemData.sort(compareBasePrice)
        if (this.state.sort === "name") itemData.sort(compareName)

        //create items to render array by extracting item components from item data array
        itemData.map((rollData) => {
            itemsToRender.push(rollData[2])
            return true;
        })

        let searchEmpty = resultsCount === 0

        return [itemsToRender, searchEmpty]
    }

    render() {
        return (
            <div>

                <Navbar 
                    totalItems={this.state.totalItems}
                    totalPrice={this.state.totalPrice}
                    curType={this.state.curType}
                    curGlazing={this.state.curGlazing}
                    curPackSize={this.state.curPackSize}
                    curPrice={this.state.curPrice}
                    isPopupVisible={this.state.isPopupVisible}
                    toggleCart={this.toggleCart}
                    />

                {this.state.cartOpen && <div className='cartContainer'>
                    <div className='cartHeader'>
                        <p>Shopping Cart ({this.state.totalItems} items)</p>
                        <p>Total: ${this.state.totalPrice}</p>
                    </div>
                    {this.state.cart.length === 0 ? <h2>The cart is empty!</h2> : null}
                    {this.state.cart.map((item, idx) => {
                        return <CartItem   
                                    key={idx} 
                                    index={idx}
                                    imageURL={item.imageURL}
                                    type={item.type}
                                    glazingLabel={item.glazingLabel}
                                    packSize={item.packSize}
                                    price={item.price}
                                    removeFn={this.removeItemFromCart}/>
                    })}
                </div>}
                
                <div className='searchContainer'>
                    <form>
                        <input type="text" value={this.state.searchContent} onChange={this.updateSearch}/>
                        <button type="button" onClick={this.submitSearch}>Search</button>
                    </form>
                    <p>sort by:</p>
                    <select onChange={this.updateSort}>
                        <option value="name">Name</option>
                        <option value="basePrice">Base Price</option>
                    </select>
                </div>

                {/* container for all items to be shown on store page  */}
                <div className="items-container"> 
                    {this.renderItems()[1] ? <h1>No matches</h1> : null}
                    {this.renderItems()[0]}
                </div>
            </div>
        );
  }
}

export default Index