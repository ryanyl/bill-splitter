import React from 'react';

export class CheckBox extends React.Component{
    render(){
        return(
            <input type="checkbox" onChange={this.props.handleChange}/>
        );
    }
}