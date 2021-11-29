import React from 'react';
import styles from '../css/WelcomeForm.module.css'


class WelcomeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      hidden: false
    };
  }

  onChange(e) {
    //   const keyPressed = String.fromCharCode(e.target.value || e.which);
    //   this.state.inputValue += keyPressed
      this.state.inputValue = e.target.value;
    //   this.state.inputValue += e.target.value[e.target.value.length]
      this.setState(this);
  }

  loginHandler(e) {
      e.preventDefault()
      this.props.loginHandler(this.state.inputValue);
  }

  render() {
    return (
        <div>
            <form>
                <h3>
                    Welcome to HugTime
                </h3>
                <label for="username">
                    Enter your Name
                </label>
                <input onChange={this.onChange.bind(this)} type="input" placeholder="John Doe" id="name"></input>
                <button onClick={this.loginHandler.bind(this)}>Get Hugging</button>
            </form>
            {/* <label className={styles.namelabel}>Enter your name</label>
            <input type="input" className={styles.bigblue} placeholder="Name" name="name" id='name' required /> */}
        </div>
      )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default WelcomeForm;
