import axios from 'axios';
import React from 'react';
import Friend from './Friend';
import HuggedFriend from './HuggedFriend';
import styles from '../css/FriendsList.module.css'


class FriendsList extends React.Component {
    constructor(props) {
      super(props)
      this.state = { friends: this.props.friends, username: this.props.username, currentFriend: '', isHugTime: false, toHug: '' }
    }

    updateHugTime() {
      axios.get('http://localhost:5000/api/is-hug-time/' + this.state.username) // todo change to user
        .then(res => {
          this.state.isHugTime = res.data.is_hug_time
          this.state.toHug = res.data.friend_to_hug
            
          if (this.state.isHugTime == 'YES') {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.updateHugTime(), 8000)
          }
  
          else {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.updateHugTime(), 2000)
          }
  
          this.setState(this)
        })
    }

    componentDidMount() {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.updateHugTime(), 2000)
      axios.get('http://localhost:5000/api/get-all-friends/' + this.state.username)
          .then(res => {
            this.state.friends = res.data.friends
      })
    }

    onClick(e) {
        e.preventDefault(); // No refresh
        this.state.friends += (',' + this.state.currentFriend)
        axios.put('http://localhost:5000/api/add-friend-to-user/' + this.state.username + '/' + this.state.currentFriend)
          .then(res => {console.log("Response from adding new friend=" + JSON.stringify(res))})
        this.state.currentFriend = ''
        this.setState(this)
    }

    loginHandler(e) {
      e.preventDefault()
      this.state.username = null;
      this.props.loginHandler(null);
      
  }
  
    render() {
      return (
        <div>
        <form>
        {/* <label>
          Is it hug time? {this.state.isHugTime == 'YES' ? 'YES WITH' : 'NO'} {this.state.toHug}
        </label> */}
          <h3 className={styles.friendListForm}>
            List of Friends for { this.state.username }
          </h3>
          <ul>
          { this.state.friends.split(',').map((f) => f == this.state.toHug ? <HuggedFriend friendName={f} isHugged={this.state.toHug}></HuggedFriend> : <Friend friendName={f} isHugged={this.state.toHug}></Friend>) }
          </ul>
          <input value={this.state.currentFriend} onChange={ e => { this.state.currentFriend = e.target.value; this.setState(this); }}>
          </input>
          <button className="add-friend-btn" onClick={ this.onClick.bind(this) }>
            Add new friend
          </button>
          <button onClick={ this.loginHandler.bind(this) }>Go Back</button>
          </form>
        </div>
      )
    }
  }

  export default FriendsList;
