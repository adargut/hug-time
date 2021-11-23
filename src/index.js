import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

class HugTimeApp extends React.Component {
  constructor(props) {
    super(props)
    axios.get('http://localhost:5000/api/is-hug-time')
      .then(res =>
        alert(res.data.username))
    this.state = { items: [], text: '', isHugTime: 'NO', toHug: ''}
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
        this.setState(this)

        if (this.state.isHugTime == "YES") {
          clearInterval(this.interval)
          setTimeout(() => {
            this.interval = setInterval(() => this.updateHugTime(), 2000)
          }, 10_000)
        }
      })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateHugTime(), 2000)
  }

  render() {
    return (
      <div>
        <h3>HugTime</h3>
        <form onSubmit={this.handleChange}>
        <label>
          Is it hug time? {this.state.isHugTime ? 'YES WITH' : 'NO'} {this.state.toHug}
        </label>
        </form>
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