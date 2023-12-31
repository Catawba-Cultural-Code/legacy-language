import media from 'css-in-js-media'
import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import {
  BackIcon,
  Button,
  FwdIcon,
  MoreIcon,
  Paper,
  Player,
  SoundIcon,
} from '../'
import Content from './Content'

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

const genCoord = (x, y) => {
  return `
  position: relative;
    left: ${x}px;
    top: ${y}px;
  `
}

const HeroPaper = styled(Paper)`
  display: grid;
  place-items: center;
  min-height: 300px;
  @media ${device.mobileS} {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 'back . next' 'content content content' 'play . more';

    @media ${device.tablet} {
      grid-template-columns: auto 1fr 1fr auto;
      grid-template-rows: 1fr auto;
      grid-template-areas: 'back content content next' 'back play more next';
      @media ${device.laptop} {
        grid-template-rows: 1fr;
        grid-template-columns: 100px 1fr 1fr 1fr 100px;
        grid-template-areas: 'back play content more next';
        place-items: center;
      }
    }
  }
`
const Play = styled(Player)`
  grid-area: play;
  place-self: center;
  display: grid;
  place-items: center;
  box-shadow: 2px 2px 2px #000;
  ${genCoord(-15, 15)}
  ${media('>tablet')} {
    width: 150px;
    height: 150px;
    bottom: 0px;
    &:hover {
      bottom: -10px;
    }
  }
`
const More = styled(Button)`
  grid-area: more;
  position: relative;
  transition: all 0.2s;

  box-shadow: 2px 2px 2px #000;
  background-color: ${({ theme }) => theme.secondary};
  ${genCoord(15, 15)}
  ${media('>tablet')} {
    width: 150px;
    height: 150px;
    bottom: 0px;
    &:hover {
      bottom: -10px;
    }
  }
`

const HeroBack = styled(Button)`
  grid-area: back;
  display: grid;
  place-items: center;
  ${genCoord(-15, -15)}
  ${media('>tablet')} {
    ${genCoord(-35, 0)}

    &:hover {
      ${genCoord(-40, 0)}
    }
  }
`
const HeroNext = styled(Button)`
  grid-area: next;

  display: grid;
  place-items: center;
  position: relative;

  box-shadow: 2px 2px 1px #000;
  ${genCoord(15, -15)}
  ${media('>tablet')} {
    ${genCoord(35, 0)}

    &:hover {
      ${genCoord(40, 0)}
    }
  }
`

const Hero = ({
  word,
  handleIncrement = (i) => console.log('no increment fn. i: ', i),
}) => {
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
          <Play base64={word.recordings[0]} color='secondary'>
            <SoundIcon />
          </Play>
        ) : null}
        <Content word={word} />
        <More onClick={handleClick} color='primary' round={true}>
          <MoreIcon />
        </More>

        <HeroBack onClick={() => handleIncrement(-1)} round={true}>
          <BackIcon />
        </HeroBack>
        <HeroNext round={true} onClick={() => handleIncrement(1)}>
          <FwdIcon />
        </HeroNext>
      </HeroPaper>
    )
  }
}

export default Hero
