import React, { Component } from 'react';
import '../../src/App.css';

export class Meeting extends Component {
    render() {
        return (
          <div className='app'>
            <header>
                {/* <div className='wrapper'> */}
                <h1>Itinerary App</h1>
                    {this.props.user ?
                        <button onClick={this.props.logout}>Log Out</button>                
                        :
                        <button onClick={this.props.login}>Log In</button>              
                    }

                    {this.props.user ?
                        <div>
                        <div className='user-profile'>
                            <img src={this.props.user.photoURL} />
                        </div>
                        </div>
                        :
                        // <div className='wrapper'>
                        <p></p>
                        // </div>
                    }
                {/* </div> */}
            </header>

            {this.props.user ?
                <div>
                    <div className='container'>
                    <section className="add-item">
                    <form onSubmit={this.props.onSubmit}>
                        <input type="text" name="clientName" placeholder="Client Name" onChange={this.props.onChange} value={this.props.clientName} />
                        <input type="date" name="date" placeholder="Start Date" onChange={this.props.onChange} value={this.props.date} />
                        <input type="time" name="startTime" placeholder="Start Time" onChange={this.props.onChange} value={this.props.startTime} />
                        <input type="time" name="endTime" placeholder="End Time" onChange={this.props.onChange} value={this.props.endTime} />                
                        <input type="text" name="meetingName" placeholder="Meeting Name" onChange={this.props.onChange} value={this.props.meetingName} />
                        <input type="text" name="meetingPurpose" placeholder="Meeting Purpose" onChange={this.props.onChange} value={this.props.meetingPurpose} />
                        <input type="text" name="meetingMembers" placeholder="Meeting Members" onChange={this.props.onChange} value={this.props.meetingMembers} />
                        <button>Add Meeting</button>
                    </form>
                    </section>
                    </div>
                    <section className='display-item'>
                        <ul>
                        {this.props.meetings.map((meeting) => {
                            return (
                            <li key={meeting.id}>
                                <h3>{meeting.title}</h3>
                                <p>On: {meeting.date}</p>
                                <p>From: {meeting.start} - {meeting.end} </p>
                                <p>Purpose: {meeting.purpose}</p>
                                <p>People: {meeting.people} </p>
                                {meeting.user === this.props.user.displayName || meeting.user === this.props.user.email ?
                                    <button onClick={() => this.removeItem(meeting.id)}>Remove Meeting</button> : null}
                            </li>
                            )
                        })}
                        </ul>
                    </section>
                </div>
                :
                <div>
                    <p className='foo'>You must be logged in to see the potluck list and submit to it.</p>
                </div>
            }


          </div>
        );
      }
}
