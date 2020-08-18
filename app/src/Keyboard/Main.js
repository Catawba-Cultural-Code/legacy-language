import { Drawer, Grid, styled } from '@material-ui/core'
import React, { useEffect } from 'react'
import LAYOUT from './layout.json'
import { Key } from './Key'
import { Close } from './Close'
import { useRecoilState } from 'recoil'

const CustomKeyboard = ({ ATOM }) => {
  const [text, setText] = useRecoilState(ATOM)
  const [isShifted, setIsShifted] = React.useState(false)
  const KeyboardGrid = styled(Grid)({
    paddingBottom: '25px',
  })

  const handleClick = (char) => {
    console.log(char)
    if (char === 'BACKSPACE') {
      const newText = text.substring(0, text.length - 1)
      setText(newText)
    } else if (char === 'SHIFT') {
      // TODO: figure out how SHIFT is going to work. More like caps lock? or remove
      setIsShifted(!isShifted)
    } else {
      const newText = text + char
      setText(newText)
    }
  }

  return (
    <>
      <Drawer anchor='bottom' open={true}>
        <KeyboardGrid container direction='column'>
          <Close />
          <Grid item container direction='column'>
            {LAYOUT.map((row) => {
              const keys = row.map((entry) => {
                return (
                  <Key
                    key={`${entry.key}-${Math.random()}`}
                    data={entry}
                    handleKeyPress={handleClick}
                    isShifted={isShifted}
                  />
                )
              })
              return (
                <Grid item container justify='center'>
                  {keys}
                </Grid>
              )
            })}
          </Grid>
        </KeyboardGrid>
      </Drawer>
    </>
  )
}

export default CustomKeyboard
