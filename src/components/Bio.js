import React from 'react'

import profilePic from './profile-pic.webp'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Matt Canty`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
           Written by <strong>Matt Canty</strong>. If you have any comments
           or want to start a conversation,{' '}
          <a href="mailto:matthewcanty@gmail.com">
            email me
          </a>:{' '}
          matthewcanty@gmail.com
        </p>
      </div>
    )
  }
}

export default Bio
