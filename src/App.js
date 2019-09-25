import React from 'react';
import {AddPersonInput} from "./AddPersonInput";
import {SplitBillInput} from "./SplitBillInput";
import {PeopleListElement} from './PeopleListElement';

export class BillSplitter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      people: [],
      includeSelf: false,
      moneyCombined: 0      
    };
    this.addPerson = this.addPerson.bind(this);
    this.splitBill = this.splitBill.bind(this);
    this.toggleIncludeSelf = this.toggleIncludeSelf.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.paidBack = this.paidBack.bind(this);
  }
  addPerson(name){
    const newPerson = {
      name: name,
      moneyOwed: 0,
      selected: false,
    };
    let people = this.state.people.slice();
    people.push(newPerson);
    this.setState({
      people: people,
    });
  }
  
  paidBack(name, amt){
    amt = parseFloat(amt);
    let people = this.state.people.slice();
    let newMoneyCombined = this.state.moneyCombined-amt;
    for(let i = 0; i < people.length; i++){
      if(people[i].name === name){
        if(people[i].moneyOwed-amt < 0){
          alert('Please enter an amount smaller than what is owed');
          return;
        }else{
          people[i].moneyOwed = people[i].moneyOwed - amt;
          if(people[i].moneyOwed === 0){
            people.splice(i,1);
            alert(`${name} has paid you back completely!`);
          }
          break;
        }
      }
    }
    this.setState({people: people, moneyCombined: newMoneyCombined});
  }

  splitBill(amt){
    amt = parseFloat(amt);
    let newMoneyCombined = this.state.moneyCombined+amt;
    if(amt <= 0){
      alert("Please enter a positive, nonzero amount")
      return;
    }
    let people = this.state.people.slice();
    let numSelected = 0;
    for(let i = 0; i < people.length; i++){
      if(people[i].selected){
        numSelected=numSelected+1;
      }
    }
    if(numSelected === 0){
      alert("Please select one or more people");
      return;
    }

    if(this.state.includeSelf)
      numSelected++;

    let splitAmt = amt/numSelected;
    if(this.state.includeSelf)
      newMoneyCombined-=splitAmt;

    for(let i = 0; i < people.length; i++){
      if(people[i].selected){
        people[i].moneyOwed += splitAmt;
      }
    }
    this.setState({people: people, moneyCombined: newMoneyCombined});
  }
  toggleIncludeSelf(){
    let curr = this.state.includeSelf;
    this.setState({includeSelf: !curr});
  }
  toggleSelect(name){
    let people = this.state.people.slice();
    for(let i = 0; i < people.length; i++){
      if(name === people[i].name){
        people[i].selected = !people[i].selected;
      }
    }
    this.setState({people: people});
  }
  render(){
    const peopleList = this.state.people.map((person) => 
    (<PeopleListElement {...person} key={person.name} toggleSelect={this.toggleSelect} update={this.paidBack}/>));
    return(
      <div>
        <AddPersonInput addPerson={this.addPerson}/>
        <SplitBillInput toggleIncludeSelf={this.toggleIncludeSelf} splitBill={this.splitBill}/>
        <h3>Money Owed Combined: {this.state.moneyCombined.toFixed(2)}</h3>
        <ul>{peopleList}</ul>
      </div>
    );
  }
}