import React from 'react'
import useAPI from 'utils/hooks/useAPI'
import {
  Button,
  HiddenIcon,
  ImageIcon,
  MicIcon,
  TagsIcon,
  Text,
  VisibleIcon,
} from 'Components'
import { BiPlus } from 'react-icons/bi'
import { GrEdit } from 'react-icons/gr'
import { defaultTheme } from 'Components/GlobalTheme'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const DetailChip = ({ children, active }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 20,
        border: `thin solid ${defaultTheme.primary}`,
        padding: 5,
        borderRadius: 10,
        marginRight: 5,
        backgroundColor: `${defaultTheme.primary}${active ? '70' : '00'}`,
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </div>
  )
}
const Word = ({ word }) => {
  const history = useHistory()
  const [active, setActive] = useState(false)

  return (
    <div
      onMouseDown={() => setActive(false)}
      onMouseUp={() => history.push(`/admin/${word._id}`)}
      key={word._id}
      style={{
        padding: 20,
        margin: 10,
        boxShadow: `1px 1px 3px #333333${active ? 99 : 70}`,
        borderRadius: 10,
        position: 'relative',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: 7,
          left: 7,
          color: '#777',
        }}
      >
        {word.public ? <VisibleIcon /> : <HiddenIcon />}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: active ? 20 : 16,

          transition: 'all 0.2s ease',
        }}
      >
        <GrEdit />
      </div>
      <h2>{word.language_entry} </h2>
      <h3 style={{ fontStyle: 'italic', color: '#444' }}>
        {word.translations.reduce((acc, curr, i, arr) => {
          if (i === 0) {
            return curr
          } else {
            return `${acc}; ${curr}`
          }
        }, '')}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DetailChip active={active}>
          <MicIcon />
          {word.recordings.length}
        </DetailChip>
        <DetailChip active={active}>
          <TagsIcon />
          {word.tags.length}
        </DetailChip>
        <DetailChip active={active}>
          <ImageIcon />
          {word.images.length}
        </DetailChip>
      </div>
    </div>
  )
}
const NewWord = () => {
  const [active, setActive] = useState(false)
  const history = useHistory()
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseDown={() => setActive(false)}
      onMouseUp={() => history.push('/admin/new')}
      style={{
        width: 125,
        height: 175,
        backgroundColor: defaultTheme.primary,
        padding: 20,
        margin: 10,
        boxShadow: `1px 1px 3px #333333${active ? 99 : 70}`,
        borderRadius: 10,
        position: 'relative',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <BiPlus
        style={{
          fontSize: active ? 45 : 35,
          color: 'white',
          transition: 'all 0.2s ease',
        }}
      />
    </div>
  )
}
const Words = () => {
  const { words, isLoading, updateWord, createWord } = useAPI()
  return (
    <div>
      <h2>Words</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <NewWord />
        {!isLoading && words.map((word) => <Word word={word} />)}
      </div>
    </div>
  )
}

export default Words
