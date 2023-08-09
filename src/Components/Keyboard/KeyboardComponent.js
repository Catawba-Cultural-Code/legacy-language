import media from 'css-in-js-media'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Key } from './Key'
import LAYOUT from './layout.json'
// TODO: add accent to layout.json
// TODO: handle accent in CTRL situation?

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  width: 100%;
  ${media('>tablet')} {
    grid-gap 7px;
    ${media('>desktop')}{
      width: 80%;
    }
  }
`

const Row = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  &:nth-child(1) {
  }
  &:nth-child(2) {
    ${media('>tablet')} {
      padding: 0px 5%;
    }
  }
  grid-gap: 5px;
  min-height: 25px;
  ${media('>tablet')} {
    min-height: 75px;
    grid-gap: 7px;
  }
`

export const KeyboardComponent = (props) => {
  const {
    setText = (string) => console.log('no setText fn.string: ', string),
  } = props
  const [isShifted, setIsShifted] = useState(false)
  const [isAlted, setIsAlted] = useState(false)
  const [currentKey, setCurrentKey] = useState(null)
  const handleKeyDown = (e) => {
    // TODO: Prevent BACKSPACE navigation
    e.preventDefault()
    console.log(`key down ${e.key}`)
    switch (e.key.toLowerCase()) {
      case 'shift':
        setIsShifted(true)
        break
      case 'alt':
        setIsAlted(true)
        break
      default:
        setCurrentKey(e.key.toLowerCase())
    }
  }
  const handleKeyUp = (e) => {
    e.preventDefault()
    console.log(`key up ${e.key}`)
    switch (e.key.toLowerCase()) {
      case 'shift':
        setIsShifted(false)
        break
      case 'alt':
        setIsAlted(false)
        break
      default:
        setCurrentKey(null)
    }
  }
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
    /*eslint-disable*/
  }, [])
  return (
    <KeyboardGrid {...props}>
      {LAYOUT.map((row, index) => {
        const keys = row.map((entry, i) => {
          return (
            <Key
              key={i}
              data={entry}
              setIsShifted={setIsShifted}
              isShifted={isShifted}
              setString={setText}
              isAlted={isAlted}
              setIsAlted={setIsAlted}
              currentKey={currentKey}
            />
          )
        })
        return <Row key={index}>{keys}</Row>
      })}
    </KeyboardGrid>
  )
}
