import React, { Component } from 'react';
import '../App.css';
import RadioButton from './RadioButton';

class CountSelector extends Component {
    constructor(props){
        super(props);
        this.state={
            whichSelected: 1
        };
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected(event) {
        this.setState({
            whichSelected: event.target.id
        })
    }

    render() {
        return (
            <div className="selector">
                <div>Pack size:</div>
                <form className="options count">
                    <RadioButton
                        packSize={1}
                        multiplier={1}
                        whichSelected={this.state.whichSelected}
                        updatePackSize={this.props.updatePackSize}
                        toggleSelected={this.toggleSelected}
                        />
                    <RadioButton
                        packSize={3}
                        multiplier={3}
                        whichSelected={this.state.whichSelected}
                        updatePackSize={this.props.updatePackSize}
                        toggleSelected={this.toggleSelected}
                        />
                    <RadioButton
                        packSize={6}
                        multiplier={5}
                        whichSelected={this.state.whichSelected}
                        updatePackSize={this.props.updatePackSize}
                        toggleSelected={this.toggleSelected}
                        />
                    <RadioButton
                        packSize={12}
                        multiplier={10}
                        whichSelected={this.state.whichSelected}
                        updatePackSize={this.props.updatePackSize}
                        toggleSelected={this.toggleSelected}
                        />
                </form>
            </div>
        )
    }
}

export default CountSelector