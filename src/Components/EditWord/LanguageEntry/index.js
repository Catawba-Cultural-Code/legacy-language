import { Fab, Grid, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import useAPI from 'utils/hooks/useAPI'
import { Button, Modal } from '../../'
import { KeyboardComponent } from '../../Keyboard/KeyboardComponent'
import useEdit from '../useEdit'

const trilight = '#FFEBF1'
const WordInput = styled.div`
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
const LanguageEntry = ({ entry, updateEntry }) => {
  const { words } = useAPI()
  const history = useHistory()
  const [openModal, setOpenModal] = React.useState(false)
  const [tempString, setTempString] = React.useState(entry)
  const closeModal = () => setOpenModal(false)
  // const handleEdit = () => {
  //   history.push(`/admin/${match}`)
  //   setOpenModal(false)
  // }
  const handleSave = () => {
    updateEntry(tempString)
    closeModal()
  }
  return (
    <>
      <WordInput>
        <Grid
          item
          container
          alignItems='center'
          justifyContent='center'
          spacing={1}
        >
          <Grid item>
            <TextField
              label='Language Entry'
              variant='filled'
              disabled
              required
              value={entry}
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
          <Button onClick={handleSave}>SAVE</Button>
          {/* {match.length > 0 ? (
            <Button onClick={handleEdit}>EDIT </Button>
          ) : (
          )} */}
          <Button onClick={closeModal}>NEVERMIND</Button>
        </ModalGrid>
      </Modal>
    </>
  )
}
export default LanguageEntry
