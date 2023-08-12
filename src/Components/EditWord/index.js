// TODO: style
// TODO: handle delete
// TODO: handle save

import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Surfaces'

import Images from './Images'
import LanguageEntry from './LanguageEntry'
import MultiText from './MultiText'
import RecordingsInput from './RecordingsInput'
import VisibleInput from './VisibleInput'
import { EditProvider } from './useEdit'
import useAPI from 'utils/hooks/useAPI'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import blankState from './blankState'
import { defaultTheme } from 'Components/GlobalTheme'
const DeleteModal = ({ show, handleClose, handleDelete }) => {
  return !show ? null : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: `#33333350`,
        width: '100vw',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        zIndex: 99,
      }}
    >
      <div
        style={{
          backgroundColor: defaultTheme.light,
          width: '50vw',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <h2>ARE YOU SURE?</h2>
        <h3>
          This will premanently delete this entry and all of the data associated
          with it
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <button
            style={{
              backgroundColor: defaultTheme.red,
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={handleDelete}
          >
            DELETE
          </button>{' '}
          <button
            style={{ backgroundColor: defaultTheme.green, cursor: 'pointer' }}
            onClick={handleClose}
          >
            nevermind
          </button>
        </div>
      </div>
    </div>
  )
}
const EditWord = ({ isNew, data = blankState }) => {
  const { words, isLoading, updateWord, createWord, deleteWord } = useAPI()

  const history = useHistory()
  const [state, setState] = useState(data)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const updateState = (property, value) => {
    setState((obj) => {
      return {
        ...obj,
        [property]: value,
      }
    })
  }
  const updateArrayProperty = (property, value) => {
    setState((obj) => {
      return {
        ...obj,
        [property]: [...obj[property], value],
      }
    })
  }
  const removeEntryFromArrayProperty = (property, index) => {
    setState((obj) => {
      return {
        ...obj,
        [property]: obj[property].toSpliced(index, 1),
      }
    })
  }
  const onSave = () => {
    console.log('SAVE', state._id)
    if (state._id === undefined) {
      console.log('IS NEW')
      createWord(state)
    } else {
      updateWord(state._id, state)
    }
    history.push('/admin')
  }
  const onDelete = () => {
    console.log('DELETE')
    if (state._id === undefined) {
      history.push('/admin')
    } else {
      deleteWord(state._id).then(() => {
        history.push('/admin')
      })
    }
  }
  const isComplete =
    state.language_entry.length > 0 && state.translations.length > 0
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gridTemplateRows: '1fr',
          width: '100%',
        }}
      >
        <LanguageEntry
          entry={state.language_entry}
          updateEntry={(str) => updateState('language_entry', str)}
        />
        <VisibleInput
          visible={state.public}
          toggleVisible={() =>
            setState((obj) => {
              return {
                ...obj,
                public: !obj.public,
              }
            })
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <MultiText
          property='pronunciation'
          data={state.pronunciation}
          addEntry={(text) => updateArrayProperty('pronunciation', text)}
          removeEntry={(i) => removeEntryFromArrayProperty('pronunciation', i)}
        >
          Pronunciation
        </MultiText>
        <MultiText
          data={state.translations}
          addEntry={(text) => updateArrayProperty('translations', text)}
          removeEntry={(i) => removeEntryFromArrayProperty('translations', i)}
        >
          Translations
        </MultiText>
        <MultiText
          data={state.tags}
          addEntry={(tag) => updateArrayProperty('tags', tag)}
          removeEntry={(i) => removeEntryFromArrayProperty('tags', i)}
        >
          Tags
        </MultiText>
        <MultiText
          data={state.notes}
          addEntry={(note) => updateArrayProperty('notes', note)}
          removeEntry={(i) => removeEntryFromArrayProperty('notes', i)}
        >
          Notes
        </MultiText>
      </div>
      <RecordingsInput
        data={state.recordings}
        addRecording={(rec) => updateArrayProperty('recordings', rec)}
        removeRecording={(i) => removeEntryFromArrayProperty('recordings', i)}
      />
      <Images
        data={state.images}
        addImage={(arr) => {
          console.log(arr)
          setState((obj) => {
            return {
              ...obj,
              images: arr,
            }
          })
        }}
        removeImage={(i) => removeEntryFromArrayProperty('images', i)}
      />

      <div
        style={{ display: 'flex', justifyContent: 'space-around', padding: 50 }}
      >
        <button
          style={{
            backgroundColor: isComplete ? defaultTheme.green : '#bbb',
            padding: '10px 25px',
          }}
          onClick={onSave}
          disabled={!isComplete}
        >
          SAVE
        </button>
        <button
          style={{ backgroundColor: defaultTheme.red, padding: '10px 25px' }}
          onClick={() => setShowDeleteModal(true)}
        >
          DELETE
        </button>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleDelete={onDelete}
        handleClose={() => setShowDeleteModal(false)}
      />
    </div>
  )
}

// Need this outer wrapper to get useEdit to work in EditWord
const EditWordComponent = (props) => (
  <EditProvider {...props}>
    <EditWord {...props}></EditWord>
  </EditProvider>
)

export default EditWordComponent
