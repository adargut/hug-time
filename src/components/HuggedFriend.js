import React from 'react';
import styles from '../css/HuggedFriend.module.css'

class HuggedFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendId: Math.floor(Math.random(10000)),
      friendName: this.props.friendName, 
      isHugged: this.props.isHugged
    };

    this.setState(this);
  }

  render() {
    return (
        <div>
            {this.state.friendName ? <li className={styles.huggedLi}>{ this.state.friendName }</li> : <div></div>}
        </div>
    )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default HuggedFriend;
