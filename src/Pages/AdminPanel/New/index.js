import EditWordComponent from 'Components/EditWord'
import React from 'react'
import { BsBackspace } from 'react-icons/bs'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'
import useAPI from 'utils/hooks/useAPI'
import { defaultTheme } from 'Components/GlobalTheme'
import blankState from 'Components/EditWord/blankState'

const Alert = ({ onCancel, onConfirm, show = false }) => {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    setOpacity(show ? 1 : 0)
  }, [show])
  return !show ? null : (
    <div
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: '#66666670',
        zIndex: 99,
        display: 'grid',
        placeItems: 'center',
        opacity,
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          width: '50vw',
          height: '50vh',
          backgroundColor: defaultTheme.light,
          borderRadius: 10,
          boxShadow: '1px 1px 5px #55555570',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ marginTop: 50 }}>Are you sure?</h2>
        <h4>
          Clicking 'CONFIRM' will take you back and delete any changes you've
          made.
        </h4>
        <h4>
          If you want to save and go back, then click CANCEL and use the SAVE
          button at the bottom of the page
        </h4>
        <div
          style={{
            padding: 50,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button onClick={onConfirm}>CONFIRM</button>
          <button onClick={onCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  )
}
const GoBack = () => {
  const [active, setActive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseDown={() => setActive(false)}
      onMouseUp={() => setShowModal(true)}
      style={{
        backgroundColor: active ? defaultTheme.primary : '#fff',
        padding: 20,
        borderRadius: 40,
        marginRight: 20,
        cursor: 'pointer',
        boxShadow: `1px 1px 2px #333333${active ? '70' : '00'}`,
        transition: 'all 0.2s ease',
      }}
    >
      <BsBackspace style={{ fontSize: 24 }} />
      <Alert
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => history.push('/admin')}
      />
    </div>
  )
}
const New = () => {
  const { words, isLoading, updateWord, createWord } = useAPI()

  const params = useParams()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <GoBack />
        <h1>EDITOR</h1>
      </div>
      <EditWordComponent data={blankState} />
    </div>
  )
}

export default New
