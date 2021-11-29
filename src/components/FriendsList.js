import axios from 'axios';
import React from 'react';
import Friend from './Friend';

class FriendsList extends React.Component {
    constructor(props) {
      super(props)
      this.state = { friends: this.props.friends, username: this.props.username, currentFriend: '' }
    }

    onClick(e) {
        e.preventDefault(); // No refresh
        this.state.friends += (',' + this.state.currentFriend)
        axios.put('http://localhost:5000/api/add-friend-to-user/' + this.state.username + '/' + this.state.currentFriend)
          .then(res => {console.log("Response from adding new friend=" + JSON.stringify(res))})
        this.state.currentFriend = ''
        this.setState(this)
    }
  
    render() {
      return (
        <div>
          <label>
            List of Friends for { this.state.username }
          </label>
          { this.state.friends.split(',').map((f) => <Friend friendName={f}></Friend>) }
          <input value={this.state.currentFriend} onChange={ e => { this.state.currentFriend = e.target.value; this.setState(this); }}>
          </input>
          <button className="add-friend-btn" onClick={ this.onClick.bind(this) }>
            Add new friend
          </button>
        </div>
      )
    }
  }

  export default FriendsList;
