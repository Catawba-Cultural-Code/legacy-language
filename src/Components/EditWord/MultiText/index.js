import { Chip, Grid, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Button } from 'Components/Surfaces'
import React, { useState } from 'react'
import styled from 'styled-components'
import useEdit from '../useEdit'
const MultiInput = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(50px, auto);
  grid-auto-flow: column;
  grid-row-gap: 10px;
`
const AddButton = styled(Button)`
  ${({ disabled }) => {
    return disabled
      ? `
    background-color: #bbb;
    box-shadow: none;
    &:hover {
      box-shadow: none;
      cursor: default;
    }
  `
      : ``
  }}
`
// const useMulti = (property) => {
//   const { state, addMulti, removeMulti } = useEdit()

//   const [current, setCurrent] = useState('')
//   const add = (entry) => {
//     if (entry.length > 0) {
//       addMulti(property, [entry.trim()])
//       setCurrent('')
//     }
//   }
//   const remove = (index) => {
//     removeMulti(property, index)
//   }
//   const handleTextChange = (e) => {
//     setCurrent(e.currentTarget.value)
//   }
//   return {
//     current,
//     stringArray: state && state[property] ? state[property] : [],
//     add,
//     remove,
//     handleTextChange,
//   }
// }
const MultiText = ({ data, children, addEntry, removeEntry }) => {
  const [text, setText] = useState('')
  // const { current, stringArray, add, remove } = useMulti(property)
  const handleTextChange = (e) => {
    console.log(e.target.value)
    setText(e.target.value)
  }
  const handleAdd = () => {
    addEntry(text)
    setText('')
  }

  return (
    <MultiInput>
      <Grid
        item
        container
        spacing={1}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <TextField
            value={text}
            onChange={handleTextChange}
            label={children}
          />
        </Grid>
        <Grid item>
          <AddButton
            disabled={text.length < 1}
            color='secondary'
            round='true'
            onClick={() => handleAdd(text.trim())}
            size={2.5}
          >
            <AddIcon />
          </AddButton>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
        {data.map((entry, i) => {
          return (
            <Grid item key={i}>
              <Chip
                color='primary'
                onDelete={() => removeEntry(i)}
                label={entry}
              />
            </Grid>
          )
        })}
      </Grid>
    </MultiInput>
  )
}

export default MultiText
