import React from 'react';

class Friend extends React.Component {
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
            {this.state.friendName ? <li>{ this.state.friendName }</li> : <div></div>}
        </div>
    )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default Friend;
