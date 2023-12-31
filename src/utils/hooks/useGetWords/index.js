import { arrayShuffle } from '@adriantombu/array-shuffle'
import pluralize from 'pluralize'
import React from 'react'
import useAPI from '../useAPI'

const useGetWords = () => {
  const [words, setWords] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { Words: WordsAPI } = useAPI()

  const refetchWords = () => {
    setIsLoading(true)
    WordsAPI.read().then((data) => {
      setWords(data)
      setIsLoading(false)
    })
  }
  const replaceItem = (i, obj) => {
    const arr = words
    arr[i] = obj
    setWords([...arr])
  }
  // useEffect get data and set state
  React.useEffect(() => {
    setIsLoading(true)
    WordsAPI.read().then((data) => {
      setWords(() => {
        let sanitized = data.map((entry) => {
          return {
            ...entry,
            tags: entry.tags.map((tag) => tag.trim()),
          }
        })
        return arrayShuffle(sanitized)
      })
      setIsLoading(false)
    })
  }, [])

  // React.useEffect .reduce words into tags
  React.useEffect(() => {
    if (words.length > 0) {
      const newTagsArr = words.reduce((acc, curr) => {
        curr.tags.forEach((el) => {
          // sanitize tags of ' ' at beginning or end
          if (!acc.includes(el)) {
            acc.push(el)
          }
        })
        return acc
      }, [])
      // Turn array into array of objects containing an array of word _ids
      const objArray = newTagsArr.reduce((acc, curr) => {
        const taggedWords = words.filter((word) => word.tags.includes(curr))
        return [
          ...acc,
          {
            tag: curr,
            words: taggedWords,
          },
        ]
      }, [])

      const reverseAlphabet = objArray.sort((a, b) => {
        if (a.tag < b.tag) {
          return 1
        }
        if (a.tag > b.tag) {
          return -1
        }
        return 0
      })

      const consolidated = reverseAlphabet.reduce((acc, curr) => {
        const i = acc.findIndex((el) => el.tag === pluralize.plural(curr.tag))

        // if it does, add curr's words to acc[i].words & return acc
        if (i > -1) {
          acc[i].words = [...acc[i].words, ...curr.words]
          return acc
        } else {
          // else return [...acc, curr]
          return [...acc, curr]
        }
      }, [])

      const imagedTags = consolidated.map((entry) => {
        // check if entry.words includes an images.length > 0
        let image = ''
        entry.words.forEach((word) => {
          if (word.images.length > 0) {
            // find one that includes an image
            image = word.images[0]
          }
        })
        // if it does,
        return {
          image,
          ...entry,
        }
      })

      const shuffled = arrayShuffle(imagedTags)
      setTags(shuffled)
    }
  }, [words])

  return { words, tags, refetchWords, isLoading, replaceItem }
}

// export default useGetWords
