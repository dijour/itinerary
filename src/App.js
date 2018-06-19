import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { Meeting } from './components/meeting';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      date: '',
      startTime: '',
      endTime: '',
      meetingName: '',
      meetingPurpose: '',
      meetingMembers: '',
      meetings: [],
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
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const meetingsRef = firebase.database().ref('meetings');
    const meeting = {
      title: this.state.meetingName,
      client: this.state.clientName,
      purpose: this.state.meetingPurpose,
      start: this.state.startTime,
      end: this.state.endTime,
      date: this.state.date,
      people: this.state.meetingMembers
    }
    meetingsRef.push(meeting);
    this.setState({
      clientName: '',
      date: '',
      startTime: '',
      endTime: '',
      meetingName: '',
      meetingPurpose: '',
      meetingMembers: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const meetingsRef = firebase.database().ref('meetings');
    meetingsRef.on('value', (snapshot) => {
      let meetings = snapshot.val();
      let newState = [];
      for (let meeting in meetings) {
        newState.push({
               id: meeting,
            title: meetings[meeting].title,
           client: meetings[meeting].client,
          purpose: meetings[meeting].purpose,
            start: meetings[meeting].start,
              end: meetings[meeting].end,
             date: meetings[meeting].date,
           people: meetings[meeting].people
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