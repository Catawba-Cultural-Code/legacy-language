import { Switch } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import useEdit from '../useEdit'

const highlight = '#eefafc'
const StyledGrid = styled.div`
  grid-area: v;
  display: grid;
  place-items: center;
  background-color: ${highlight};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
`
const VisibleInput = ({ visible, toggleVisible }) => {
  return (
    <StyledGrid show={true}>
      <h5>{visible ? 'PUBLIC' : 'hidden'}</h5>
      <Switch name='show' checked={visible} onChange={toggleVisible} />
    </StyledGrid>
  )
}

export default VisibleInput
