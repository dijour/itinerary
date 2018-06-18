import React, { Component } from 'react';
import '../../src/App.css';
import firebase from '../../src/firebase.js';

export class Menu extends Component {
    render() {
        return (
          <div className='app'>
            <header>
                <div className='wrapper'>
                  <h1>Fun Food Friends</h1>
                </div>
            </header>
            <div className='container'>
            <section className="add-item">
              <form onSubmit={this.props.onSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.props.onChange} value={this.props.username} />
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.props.onChange} value={this.props.currentItem} />
                <button disabled={!this.props.currentItem.length || !this.props.username.length }>Add Item</button>
              </form>
            </section>
                <div className='wrapper'>
                  <ul>
                  </ul>
                </div>
            </div>
            <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.props.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>brought by: {item.user}</p>
                        <button onClick={() => this.props.removeItem(item.id)}>Remove Item</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>
        );
      }
}
