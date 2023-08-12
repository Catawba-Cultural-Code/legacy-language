import { Button } from '@material-ui/core'
import useEdit from 'Components/EditWord/useEdit'
import media from 'css-in-js-media'
import React, { useState } from 'react'
import styled from 'styled-components'
import ImageModal from './ImageModal'
import SelectedImage from './SelectedImage'

const secondlight = '#FFFED6'
const ImgInput = styled.div`
  grid-area: i;
  display: flex;
  flex-direction: column;
  background-color: ${secondlight};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
  min-height: 150px;
  padding: 20px;
`
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
const ImageCard = ({ onClick, src }) => {
  const [active, setActive] = useState(false)
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{
        height: 150,
        width: 150,
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <button
        style={{
          display: active ? 'block' : 'none',
          opacity: active ? 1 : 0,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        DELETE
      </button>
    </div>
  )
}
const Images = ({ data, addImage, removeImage, show = true }) => {
  // const { images, replace, removeMulti } = useEdit()
  const [openModal, setOpenModal] = React.useState(false)
  const property = 'images'
  // const remove = (index) => {
  //   removeMulti(property, index)
  // }
  // const setImages = (value) => {
  //   replace(property, value)
  // }
  return (
    <>
      <ImgInput show={show}>
        <div>
          <Button variant='contained' onClick={() => setOpenModal(true)}>
            Add images
          </Button>
        </div>
        <div style={{ marginTop: 25 }}>
          <CardGrid columns={3}>
            {data &&
              data.map((img, i) => {
                return (
                  <ImageCard key={i} src={img} onClick={() => removeImage(i)} />
                )
              })}
          </CardGrid>
        </div>
      </ImgInput>
      <ImageModal
        open={openModal}
        save={(arr) => addImage(arr)}
        close={() => setOpenModal(false)}
        currentImages={data}
      />
    </>
  )
}

export default Images
