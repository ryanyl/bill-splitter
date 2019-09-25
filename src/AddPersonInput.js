import React from 'react';
import {InputBox} from './InputBox';

export function AddPersonInput(props){
    return (
        <div>
            Add New Person:
            <InputBox inputType="text" handleSubmit={props.addPerson} messageIfEmpty="Please enter a name!" 
            buttonMessage="Add"/>
        </div>
    );
}