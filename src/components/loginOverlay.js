import React from 'react';

class LoginOverlay extends React.Component {
  sendLoginRequest = () => {
    window.location = "https://accounts.spotify.com/authorize?client_id=54a0e6f7846742d8a378f7788b470679&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-library-read&response_type=token&state=logged_in"
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
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          display: display
        }}
      >
        <label>{label}</label>
        <br/>
        <button onClick={this.sendLoginRequest}>
          Login
        </button>
      </div>
    )
  }
}

export default LoginOverlay
