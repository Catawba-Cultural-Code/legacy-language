import React from 'react'
import { defaultTheme } from 'Components/GlobalTheme'
const Request = () => {
  return (
    <div
      style={{
        backgroundColor: defaultTheme.light,
        display: 'grid',
        placeItems: 'center',
        padding: 25,
      }}
    >
      <h2>Can't find what you're looking for?</h2>
      <a
        href='https://forms.office.com/r/PZHYrQt3vq'
        style={{
          backgroundColor: defaultTheme.green,
          border: 'none',
          padding: '10px 20px',
          fontSize: 20,
          borderRadius: 5,
          cursor: 'pointer',
          textDecoration: 'none',
          color: defaultTheme.black,
        }}
      >
        REQUEST A TRANSLATION
      </a>
      <p style={{ fontStyle: 'italic' }}>
        This will take you to a Catawba Nation Microsoft Office form
      </p>
    </div>
  )
}

export default Request
