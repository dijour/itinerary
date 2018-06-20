import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { Meeting } from './components/meeting';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {Navigation} from './components/navigation.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: '',
      adminEmail: '',
      admins: [],
      user: null
    }
    //pass THIS to core methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {

    // return (
    //   <div>BOOM BEACH</div>
    // );
    return (
      <div>
        <Router>
          <div className="App">
          <Navigation />
          <Route path="/" exact render={
            () => {
              return (<h1>Hello</h1>);
            }
          }/>
          <Route path="/book" exact strict component={Meeting} />
          </div>
        </Router>
        <Meeting 
        clientName={this.state.clientName}
        date={this.state.date}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        meetingName={this.state.meetingName}
        meetingPurpose={this.state.meetingPurpose}
        meetingMembers={this.state.meetingMembers} 
        meetings={this.state.meetings} 
        user={this.state.user}
        onChange={this.handleChange} 
        onSubmit={this.handleSubmit} 
        removeItem={this.removeItem}
        login={this.login}
        logout={this.logout}
        />
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const adminsRef = firebase.database().ref('admins');
    const admin = {
      name: this.state.adminName,
      email: this.state.adminEmail
    }
    adminsRef.push(admin);
    this.setState({
        adminName: '',
        adminEmail: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const adminsRef = firebase.database().ref('admins');
    adminsRef.on('value', (snapshot) => {
      let admins = snapshot.val();
      let newState = [];
      for (let admin in admins) {
        newState.push({
               id: admins,
            name: admins[meeting].name,
           email: admins[meeting].email
        });
      }
      this.setState({
        meetings: newState
      });
    });
  }

  removeItem(itemId) {
    const meetingRef = firebase.database().ref(`/meetings/${itemId}`);
    meetingRef.remove();
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }


}
export default App;