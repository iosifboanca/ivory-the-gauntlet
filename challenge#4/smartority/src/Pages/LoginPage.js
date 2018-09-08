import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { userLogin } from '../Actions/actions'
import RegisterComponent from '../Components/RegisterComponent'
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await Auth.signIn(this.state.username, this.state.password)
        .then(user => console.log(user))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input autoFocus type="text" id="username" placeholder="E-mail Address" value={this.state.username} onChange={this.onChange} />
          <input autoFocus type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
          <input type="submit" value="Submit" />
        </form>
        <RegisterComponent/>
      </div>
    )
  }
}

let mapDispatchToProps = { userLogin }
let mapStateToProps = state => ({ isLoggedIn: state.isLoggedIn })

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

