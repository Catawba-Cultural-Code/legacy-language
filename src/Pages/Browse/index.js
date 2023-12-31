import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Hero from '../../Components/Hero'
import Page from '../../Components/Page'

import useAPI from '../../utils/hooks/useAPI'

import TagCard from './TagCard'
import media from 'css-in-js-media'

const columns = (x, max = 10) => {
  let cols = x < max ? x : max
  return `grid-template-columns: repeat(${cols}, 1fr);`
}
export const CardGrid = styled.div`
  display: grid;

  grid-auto-rows: minmax(150px, auto);
  grid-gap: 20px;
  place-items: stretch;

  ${columns(1)}
  ${media('>tablet')} {
    ${(props) => columns(props.columns, 4)}

    ${media('>desktop')} {
      ${(props) => columns(props.columns, 5)}
      ${media('>largeDesktop')} {
        ${(props) => columns(props.columns)}
      }
    }
  }
`

const HomeGrid = styled.div`
  display: grid;
  grid-columns: 1fr;
  grid-rows: minmax(50vh, auto) auto;
  grid-auto-flow: rows;
  grid-gap: 50px;
`
const Home = () => {
  const { tags, words, isLoading } = useAPI()
  const [currentIndex, setCurrentIndex] = useState(0)
  const incrementIndex = (x) => {
    if (words.length <= 1) {
      return
    }
    if (currentIndex + x < 0) {
      setCurrentIndex(words.length + x)
    }
    if (currentIndex + x > words.length - 1) {
      setCurrentIndex(0)
    }
    setCurrentIndex((i) => i + x)
  }
  useEffect(() => {
    let length = words.length
    if (length > 0) {
      const randIndex = Math.floor(Math.random() * length - 1)

      setCurrentIndex(randIndex)
    }
  }, [words])

  return (
    <Page>
      {isLoading || words == null || tags == null ? null : (
        <HomeGrid>
          {words != null ? (
            <Hero word={words[currentIndex]} handleIncrement={incrementIndex} />
          ) : null}
          <div>
            <Typography variant='h3'>BROWSE BY TOPIC</Typography>
            <CardGrid columns='5'>
              {tags.map(({ tag, image }, index) => {
                return (
                  <TagCard
                    key={index}
                    tag={tag}
                    image={image}
                    i={index}
                  ></TagCard>
                )
              })}
            </CardGrid>
          </div>
        </HomeGrid>
      )}
    </Page>
  )
}

export default Home
