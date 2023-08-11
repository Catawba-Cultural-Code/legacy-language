import EditWordComponent from 'Components/EditWord'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useAPI from 'utils/hooks/useAPI'

const Editor = () => {
  const { words, isLoading, updateWord, createWord } = useAPI()
  const [word, setWord] = useState(null)
  const params = useParams()
  useEffect(() => {
    setWord(words.find((entry) => entry._id === params._id))
  }, [])
  return word === null ? (
    <div>
      <h1>EDITOR</h1>
    </div>
  ) : (
    <div>
      <h1>EDITOR</h1>
      <EditWordComponent data={word} />
    </div>
  )
}

export default Editor
