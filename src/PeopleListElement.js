import React from 'react';
import {CheckBox} from './Checkbox';
import {InputBox} from './InputBox'; 

export class PeopleListElement extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateHandleSubmit = this.updateHandleSubmit.bind(this);
        this.paidBackFull = this.paidBackFull.bind(this);
    }
    updateHandleSubmit(amt){
        this.props.update(this.props.name, amt);
    }
    handleChange(){
        this.props.toggleSelect(this.props.name);
    }
    paidBackFull(){
        this.props.update(this.props.name, this.props.moneyOwed);
    }
    render(){
        return (
        <div>
            <h3>{this.props.name}</h3>
            <p>owes you: {this.props.moneyOwed.toFixed(2)}</p>
            <CheckBox handleChange={this.handleChange}/>
            <InputBox inputType="number" handleSubmit={this.updateHandleSubmit} messageIfEmpty="Please Enter a number!" 
            buttonMessage="Amount paid back"/>
            <button onClick={this.paidBackFull}>Paid Back Full</button>
        </div>

        );

    }
}