import React from 'react';
import {CheckBox} from "./Checkbox";
import {InputBox} from "./InputBox";

export function SplitBillInput(props){
    return (
        <div>
            Enter Bill Amount:
            <InputBox inputType="number" handleSubmit={props.splitBill} messageIfEmpty="Enter bill amount" 
            buttonMessage="Split"/>
            Include self in bill splitting calculation
            <CheckBox handleChange={props.toggleIncludeSelf}/>
            
        </div>
    );
}