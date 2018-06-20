import React, { Component } from 'react';
import '../App.css';
import {NavLink} from "react-router-dom";

export class Navigation extends Component {
    render () {
        return (
            <div>
                <NavLink to="/" exact activeStyle={{color:'green'}}>
                    Home
                </NavLink>
                <div></div>
                <NavLink to="/book" exact activeStyle={{color:'green'}}>
                    Book a Meeting
                </NavLink>

            </div>
        );        
    }
};

export default Navigation;