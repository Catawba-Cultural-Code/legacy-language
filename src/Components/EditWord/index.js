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

const highlight = '#eefafc'
const secondlight = '#FFFED6'
const trilight = '#FFEBF1'
const InputGrid = styled.div`
  transition: all 0.2s;
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid ${highlight};
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;

  grid-gap: 9px;
  grid-template-areas:
    'word word word word a a'
    'tr tr p p t t'
    'n n n n n n'
    'r r r i i i'
    'v v b b b b';

  > div {
    padding: 10px;
    :hover {
      box-shadow: inset 0px 0px 5px #ddd;
    }
  }
`
const TransInput = styled.div`
  grid-area: tr;
  background-color: ${trilight};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
`

const TagInput = styled.div`
  grid-area: t;
  background-color: ${secondlight};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
`

const ButtonGrid = styled.div`
  grid-area: b;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
`
const InputButton = styled(Button)`
  width: 80%;
  height: 10%;
  padding: 10px;
  ${(disabled) => {}}
`
const EditWord = ({ isNew, data = blankState }) => {
  const { words, isLoading, updateWord, createWord } = useAPI()

  const history = useHistory()
  const [state, setState] = useState(data)
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
  }
  const isComplete =
    state.language_entry.length > 0 && state.translations.length > 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LanguageEntry
        entry={state.language_entry}
        updateEntry={(str) => updateState('language_entry', str)}
      />
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
              images: [...obj['images'], ...arr],
            }
          })
        }}
        removeImage={(i) => removeEntryFromArrayProperty('images', i)}
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
          onClick={onDelete}
        >
          DELETE
        </button>
      </div>
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
