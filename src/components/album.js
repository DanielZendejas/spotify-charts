import React from 'react';

class Album extends React.Component {
  render () {
    return (
      <img
        crossOrigin='Anonymous'
        width={120}
        height={120}
        src={this.props.cover}
        alt="Failed to load album cover"
      />
    )
  }
}

export default Album
