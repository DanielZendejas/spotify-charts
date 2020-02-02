import React from 'react';

class LoginOverlay extends React.Component {
  sendLoginRequest = () => {
    var host = process.env.REACT_APP_HOST
    window.location = "https://accounts.spotify.com/authorize?client_id=54a0e6f7846742d8a378f7788b470679&redirect_uri=" + host + "&scope=user-library-read&response_type=token&state=logged_in"
  }

  render() {
    var label = "Welcome! Login so we can create your chart."
    var display = this.props.display
    if (this.props.error) {
      display = "block"
      label = "There seems to be an authentication error. Please, try to login again."
    }
    return (
      <div
        id="loginOverlay"
        class="m-auto text-center"
        style={{width: "50%"}}
      >
        <label>{label}</label>
        <br/>
        <button
          id="loginButton"
          class="btn-lg btn-primary"
          onClick={this.sendLoginRequest}
        >
          Let's go!
        </button>
      </div>
    )
  }
}

export default LoginOverlay
