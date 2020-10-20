import { Fab, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { RoundButton } from '../../../Components/Buttons/RoundButton'
import Player from '../../../Components/Player'
import { Paper } from '../../../Components/Surfaces'
import { RotatedText } from '../../../Components/Text'
import { Card, CardGrid } from '../../../styled/Card'
import Content from './Content'
import media from 'css-in-js-media'
const HeroGrid = styled.div`
  display: grid;
  place-items: center;
`
const IconDiv = styled.div`
  display: grid;
  place-items: center;
`
// TODO: refactor HERO to have left and right buttons
// TODO: refactor HERO to be taller

const HeroPaper = styled(Paper)`
  display: grid;
  min-height: 300px;
  grid-template-columns: 100px 1fr 1fr 100px;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'back content content next' 'back play more next';
  ${media('>tablet')} {
    grid-template-columns: 100px auto 1fr auto 100px;
    grid-template-areas: 'back play content more next';
  }
`
const PlayerWrapper = styled.div`
  grid-area: play;
  display: grid;
  place-items: center;
`
const PlayerButton = styled(RoundButton)`
  transition: all 0.2s;
  display: grid;
  place-items: center;
  &:hover {
    bottom: -30px;
    box-shadow: 3px 3px 2px #000;
  }
  bottom: -20px;
  box-shadow: 2px 2px 2px #000;
  ${media('>tablet')} {
    width: 150px;
    height: 150px;
    bottom: 0px;
    &:hover {
      bottom: -10px;
    }
  }
`
const MoreWrapper = styled.div`
  grid-area: more;
  display: grid;
  place-items: center;
`
const More = styled(RoundButton)`
  position: relative;
  transition: all 0.2s;
  &:hover {
    bottom: -30px;
    box-shadow: 3px 3px 2px #000;
  }
  bottom: -20px;
  box-shadow: 2px 2px 2px #000;
  background-color: ${({ theme }) => theme.secondary};
  ${media('>tablet')} {
    width: 150px;
    height: 150px;
    bottom: 0px;
  }
`

const HeroBack = styled.div`
  grid-area: back;
  display: grid;
  place-items: center;
  > * {
    position: relative;
    left: -35px;
    bottom: 0px;
    &:hover {
      left: -40px;
      box-shadow: 3px 3px 2px #000;
    }
    box-shadow: 2px 2px 1px #000;
  }
`
const HeroNext = styled.div`
  grid-area: next;

  display: grid;
  place-items: center;
  > * {
    position: relative;
    left: 35px;
    &:hover {
      left: 40px;
      box-shadow: 3px 3px 2px #000;
    }
    box-shadow: 2px 2px 1px #000;
  }
`

const Hero = ({ word, handleIncrement = (i) => console.log(i) }) => {
  const history = useHistory()
  const handleClick = () => {
    history.push(`/word/${word._id}`)
  }
  if (word == null) {
    return null
  } else {
    return (
      <HeroPaper success={-1} href={word.images[0]}>
        {word.recordings.length > 0 ? (
          <PlayerWrapper>
            <Player base64={word.recordings[0]}>
              <PlayerButton variant='secondary' size='15vw' color='secondary'>
                <RecordVoiceOverIcon />
              </PlayerButton>
            </Player>
          </PlayerWrapper>
        ) : null}
        <Content word={word} />
        <MoreWrapper>
          <More size='15vw' onClick={console.log} color='primary' lean={0}>
            <MoreHorizIcon />
          </More>
        </MoreWrapper>
        <HeroBack>
          <RoundButton lean={0} onClick={() => handleIncrement(-1)}>
            <ChevronLeftIcon />
          </RoundButton>
        </HeroBack>
        <HeroNext>
          <RoundButton onClick={() => handleIncrement(1)}>
            <ChevronRightIcon />
          </RoundButton>
        </HeroNext>
      </HeroPaper>
    )
  }
}

export default Hero
