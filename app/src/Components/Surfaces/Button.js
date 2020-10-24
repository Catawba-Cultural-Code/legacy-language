import React from 'react'
import styled from 'styled-components'
import { Paper } from './Paper'
import media from 'css-in-js-media'
export const StyledButton = styled(Paper)`
  transition: all 0.2s;
  opacity: 1;
  position: relative;

  display: grid;
  place-items: center;
  &:hover {
    cursor: pointer;
  }
  > * {
    display: grid;
    place-items: center;
  }
  ${({ round = false, size = 6 }) =>
    !round
      ? `width: ${size}rem;`
      : `
    border-radius: 50%;

    width: ${size}rem;
    height: ${size}rem;

  `}
  ${({ active = true }) =>
    active
      ? ``
      : `
  opacity: 0.6;
`}
  ${({ raised = true }) =>
    !raised
      ? ``
      : `
box-shadow: 2px 2px 1px #222;
&:hover {
  box-shadow: 4px 4px 2px #222;
}
`}
${({ raised = true }) =>
    !raised
      ? ``
      : `
box-shadow: 2px 2px 1px #222;
&:hover {
  box-shadow: 4px 4px 2px #222;
}
`}
`
export const Button = (props) => {
  const { color = 'primary' } = props

  return (
    <StyledButton {...props} color={color}>
      {props.children}
    </StyledButton>
  )
}
