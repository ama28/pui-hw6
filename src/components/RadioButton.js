import React, { Component } from 'react';
import '../App.css';

class RadioButton extends Component {
    render(){
        let buttonClass =  'radioButton'

        if (this.props.whichSelected == this.props.packSize){
            buttonClass += ' radioButtonSelected'
        }

        return(
            <div className="buttonContainer">
                <button type="button" name="packs" id={this.props.packSize} value={this.props.multiplier} className={buttonClass} 
                    onClick={(event) => {this.props.updatePackSize(event); this.props.toggleSelected(event);}}>{this.props.packSize}</button>
            </div>
        )
    }
}

export default RadioButton