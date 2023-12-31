import media from 'css-in-js-media'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import useCopy from 'utils/hooks/useCopy'
import {
  Button,
  Chip,
  MoreIcon,
  Notification,
  Paper,
  Player,
  SoundIcon,
  Text,
} from '../../Components'
const CardPaper = styled(Paper)`
  min-height: 150px;
  transition: all 0.2s;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr auto auto;
  grid-template-areas: 'play word more' 'play english more' 'extra extra extra';
  place-items: center;
  padding: 10px;
  ${media('<tablet')} {
    grid-template-rows: auto auto;
    grid-template-areas: 'play word .' 'more english .';
  }

  ${({ expanded }) =>
    expanded
      ? `
    // grid-column: 1 / 2;
    // transition: grid 0.5s;
    grid-row: 1 / 3;
    // width: 100%;
  `
      : ``}
`
const Play = styled(Player)`
  display: grid;
  place-items: center;
  grid-area: play;
`
const MoreButton = styled(Button)`
  grid-area: more;
`
const EntryPaper = styled(Chip)`
  padding: 20px 50px;
  border-radius: 2px;
  grid-area: word;
  &:hover {
    box-shadow: 2px 2px 1px #555;
  }
  &:active {
    box-shadow {
      bod-shadow: 1px 1px 1px #333;
    }
  }
`
const InfoPaper = styled(Paper)`
  grid-area: english;
  padding: 15px 40px;
  border-radius: 2px;
`

const WordCard = ({ data, href, link, children }) => {
  const copy = useCopy()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const handleCopy = () => {
    copy(data.language_entry)
    setOpen(true)
  }
  const handleClick = () => {
    history.push(link)
  }

  return (
    <CardPaper href={href} expanded={false}>
      {data.recordings.length < 1 ? null : (
        <Play base64={data.recordings[0]} color='green'>
          <SoundIcon />
        </Play>
      )}

      <EntryPaper onClick={handleCopy}>
        <Text>
          <b>{data.language_entry}</b>
        </Text>
      </EntryPaper>
      <InfoPaper color='secondary'>
        <Text>{data.translations[0]}</Text>
      </InfoPaper>

      <MoreButton round={true} onClick={handleClick} color='light'>
        <MoreIcon />
      </MoreButton>
      <Notification open={open} handleClose={() => setOpen(false)}>
        {data.language_entry} copied to clipboard!
      </Notification>
    </CardPaper>
  )
}

export default WordCard
