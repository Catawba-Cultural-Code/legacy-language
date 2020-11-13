import { Fab, Grid, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import React, { useContext, useEffect } from 'react'

import useAPI from 'utils/hooks/useAPI'
import { KeyboardComponent } from 'Components/Keyboard/KeyboardComponent'
import { Button, Modal } from 'Components'

import Context from '../context'
import { REPLACE } from '../reducer'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
const trilight = '#FFEBF1'
export const WordInput = styled.div`
  grid-area: word;
  display: grid;
  place-items: center;
  background-color: ${trilight};
`
const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: columns;
  grid-gap: 30px;
  grid-template-rows: auto auto auto auto;
  place-items: stretch;
`
const LanguageEntry = () => {
  const [{ language_entry }, dispatch] = useContext(Context)
  const { words } = useAPI()
  const history = useHistory()
  const [openModal, setOpenModal] = React.useState(false)
  const [tempString, setTempString] = React.useState(language_entry)
  const [match, setMatch] = React.useState('')
  const property = 'language_entry'
  useEffect(() => {
    setTempString(language_entry)
  }, [language_entry])
  const handleFocus = () => {}
  const setTerm = (value) => {
    dispatch({
      type: REPLACE,
      property,
      value,
    })
  }
  const handleSave = () => {
    setTerm(tempString)
    setOpenModal(false)
  }
  const handleCheck = () => {
    const match = words.reduce((acc, { language_entry, _id }) => {
      if (language_entry === tempString) {
        return _id
      } else {
        return acc
      }
    }, '')

    if (match.length > 0) {
      setMatch(match)
    } else {
      handleSave()
    }
  }
  const closeModal = () => setOpenModal(false)
  const handleEdit = () => {
    history.push(`/admin/${match}`)
    setOpenModal(false)
  }
  return (
    <>
      <WordInput>
        <Grid item container alignItems='center' justify='center' spacing={1}>
          <Grid item>
            <TextField
              label='Language Entry'
              variant='filled'
              disabled
              required
              value={language_entry}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid item>
            <Fab onClick={() => setOpenModal(true)}>
              <EditIcon />
            </Fab>
          </Grid>
        </Grid>
      </WordInput>

      <Modal open={openModal} handleClose={closeModal}>
        <ModalGrid>
          <input type='text' value={tempString} readOnly={true} />
          <KeyboardComponent setText={setTempString} />
          {match.length > 0 ? (
            <Button onClick={handleEdit}>EDIT </Button>
          ) : (
            <Button onClick={handleCheck}>SAVE</Button>
          )}
          <Button onClick={closeModal}>NEVERMIND</Button>
        </ModalGrid>
      </Modal>
    </>
  )
}
export default LanguageEntry