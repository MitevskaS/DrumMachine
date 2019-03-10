import React, { Component } from 'react';
import '../style/App.css';

// stateless Switch button component 
export default class Switch extends Component {

  render(){
    return (
      <label 
        className="switch">
        <input 
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span 
          className="slider">
        </span>
      </label>
    )
  }
}