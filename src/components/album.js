import React from 'react';

class Album extends React.Component {
  render () {
    return (
      <img crossOrigin='Anonymous' width={120} height={120} src={this.props.cover} />
    )
  }
}

export default Album
