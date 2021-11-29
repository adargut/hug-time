import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FriendsList from './components/FriendsList';
import WelcomeForm from './components/WelcomeForm';
import styles from './css/app.module.css';


class HugTimeApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: 'x', items: [], text: '', isHugTime: 'NO', toHug: '', friends: null, loggedIn: false }
    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  handleChange(e) {
    this.state.text = e.interval.value;
    this.setState(this)
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

  loginHandler(username) {
    this.state.username = username;
    this.state.loggedIn = true;
    this.setState(this);
  }

  render() {

    // Wait for API request before rendering
    if (this.state.friends == null) {
      return null
    }

    return (
      <div>
        <h3>HugTime</h3>
        <form onSubmit={this.handleChange}>
        <WelcomeForm loginHandler={this.loginHandler}/>
        {this.state.loggedIn ? <FriendsList username={this.state.username} friends={this.state.friends}></FriendsList> : null}
        <label>
          Is it hug time? {this.state.isHugTime == 'YES' ? 'YES WITH' : 'NO'} {this.state.toHug}
        </label>
        </form>
        <div className={styles.background}>
        <div class={styles.shape}></div>
        <div class={styles.shape}></div>
      </div>
      </div>
    )
  }
}

ReactDOM.render(
   <React.Fragment>
     <HugTimeApp></HugTimeApp>
   </React.Fragment>,
  document.getElementById('root')
);