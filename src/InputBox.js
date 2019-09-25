import React from 'react';

export class InputBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Saves the user's input into state
    handleChange(e){
        this.setState({value: e.target.value});
    }
    handleSubmit(e){
        if(this.state.value === '')
            alert(`${this.props.messageIfEmpty}`);
        else{
            this.props.handleSubmit(this.state.value);
            this.setState({value: ''});
        }
        e.preventDefault();
    }
    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type={this.props.inputType} value={this.state.value} onChange={this.handleChange}/>
                <input type="submit" value={this.props.buttonMessage}/>
            </form> 
        </div>            
        );
    }
}