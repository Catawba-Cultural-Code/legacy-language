import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import { CopyKeyboard } from '../../Components/Keyboard'

const Type = () => {
  const StyledGridContainer = styled(Grid)({
    padding: '40px',
    margin: '0px',
  })

  return (
    <>
      <StyledGridContainer container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h4'>
            Type In Catawba{' '}
            <span role='img' aria-label='keyboard emoji'>
              ⌨
            </span>
          </Typography>
        </Grid>
        <Grid>
          <CopyKeyboard />
          {/* <AddKeyboard /> */}
        </Grid>
      </StyledGridContainer>
    </>
  )
}

export default Type
