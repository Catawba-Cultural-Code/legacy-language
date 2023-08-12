import { Switch } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import useEdit from '../useEdit'
import {
  Button,
  HiddenIcon,
  ImageIcon,
  MicIcon,
  TagsIcon,
  Text,
  VisibleIcon,
} from 'Components'
const highlight = '#eefafc'
const StyledGrid = styled.div`
  display: grid;
  place-items: center;
  background-color: ${highlight};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
  padding: 20px;
`
const VisibleInput = ({ visible, toggleVisible }) => {
  return (
    <StyledGrid
      show={true}
      style={{ backgroundColor: visible ? highlight : '#eee' }}
    >
      {visible ? <VisibleIcon /> : <HiddenIcon />}
      <Switch name='show' checked={visible} onChange={toggleVisible} />
      <h5>{visible ? 'PUBLIC' : 'hidden'}</h5>
    </StyledGrid>
  )
}

export default VisibleInput
