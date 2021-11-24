import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

class HugTimeApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [], text: '', isHugTime: 'NO', toHug: '', friends: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.state.text = e.interval.value;
    this.setState(this)
  }

  updateHugTime() {
    axios.get('http://localhost:5000/api/is-hug-time/adar') // todo change to user
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
    this.interval = setInterval(() => this.updateHugTime(), 2000)
    axios.get('http://localhost:5000/api/get-all-friends/adar')
        .then(res => {
          this.state.friends = res.data.friends
      })
  }

  render() {

    // Wait for API request before rendering
    if (!this.state.friends) {
      return null
    }

    return (
      <div>
        <h3>HugTime</h3>
        <form onSubmit={this.handleChange}>
        <FriendsList friends={this.state.friends} username='adar'></FriendsList>
        <label>
          Is it hug time? {this.state.isHugTime == 'YES' ? 'YES WITH' : 'NO'} {this.state.toHug}
        </label>
        </form>
      </div>
    )
  }
}

class FriendsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <label>
          List of Friends for {this.props.username}
        </label>
        { this.props.friends.split(',').map((f) => <li>{f}</li>) }
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <HugTimeApp></HugTimeApp>
  </React.StrictMode>,
  document.getElementById('root')
);