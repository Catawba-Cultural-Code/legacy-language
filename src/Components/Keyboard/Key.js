import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Paper, Text } from '../Surfaces'
import { BackspaceIcon, ShiftIcon } from '../Surfaces/Icon'
import { useState } from 'react'
import media from 'css-in-js-media'
const StyledPaper = styled(Paper)`
  flex: ${({ flex = 1 }) => flex};
  padding: 5px 10px;
  background-color: ${({ theme, clicked = false }) =>
    clicked ? theme.light : theme.primary};
  display: grid;
  place-items: center;
  border-radius: 5px;
  transition: all 0.01ds;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  box-shadow: ${({ clicked = false }) =>
    clicked ? `1px 1px 1px #555` : `3px 3px #555`};
  border: solid 2px ${({ clicked = false, theme }) =>
    clicked ? `${theme.light}` : `${theme.primary}`};
  &:hover {
    box-shadow 4px 4px 2px #555;
    cursor: pointer;
  }
  ${media('<tablet')}{
    padding: 2px;
  }
`
const KeyText = styled(Text)`
  font-size: 1rem;
  ${media('>phone')} {
    font-size: 1.1rem;
    ${media('>tablet')} {
      font-size: 1.3rem;
      ${media('>desktop')} {
        font-size: 1.5rem;
      }
    }
  }
`

export const Key = ({
  currentKey,
  data,
  isShifted = false,
  setIsShifted,
  setString,
  isAlted,
  setIsAlted,
}) => {
  const [isClicked, setIsClicked] = useState(false)
  const getChar = () => {
    if (isAlted && isShifted) {
      return data.accentShift || data.accent || data.shift
    }
    if (isShifted) {
      return data.shift
    }
    if (isAlted) {
      return data.accent || data.char
    }
    return data.char
  }
  useEffect(() => {
    if (data.key === 'shift') {
      setIsClicked(isShifted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShifted])
  useEffect(() => {
    if (data.key === 'control') {
      console.log('contorl?', isAlted)
      setIsClicked(isAlted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlted])
  useEffect(() => {
    console.log('useEffect', currentKey)
    if (currentKey == null) {
      setIsClicked(false)
      return
    }
    if (currentKey === data.key) {
      setIsClicked(true)
      switch (data.key) {
        case 'backspace':
          setString((str) => str.slice(0, -1))
          break
        case ' ':
          setString((str) => str + ' ')
          break
        default:
          console.log(getChar())
          setString((str) => str + getChar())
      }
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey])
  const handleMouseDown = () => {
    switch (data.key) {
      case 'shift':
        console.log(isShifted)
        setIsShifted((bool) => !bool)
        break
      case 'control':
        setIsAlted((bool) => !bool)
        break
      case 'backspace':
        setIsClicked(true)
        setString((str) => str.slice(0, -1))
        break
      default:
        setIsClicked(true)
        setString((str) => str + getChar())
    }
  }
  const handleMouseUp = () => {
    switch (data.key) {
      case 'shift':
        break
      case 'control':
        break
      default:
        setIsClicked(false)
    }
  }
  if (data.key === 'shift') {
    return (
      <StyledPaper
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        clicked={isClicked}
      >
        <ShiftIcon />
      </StyledPaper>
    )
  } else if (data.key === 'backspace') {
    return (
      <StyledPaper
        clicked={isClicked}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <BackspaceIcon />
      </StyledPaper>
    )
  } else if (data.key === ' ') {
    return (
      <StyledPaper
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        clicked={isClicked}
        flex={12}
      >
        _________________________________
      </StyledPaper>
    )
  } else if (data.key === 'control') {
    return (
      <StyledPaper
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        clicked={isClicked}
      >
        ctrl
      </StyledPaper>
    )
  } else {
    return (
      <StyledPaper
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        clicked={isClicked}
      >
        <KeyText>{getChar()}</KeyText>
      </StyledPaper>
    )
  }
}
