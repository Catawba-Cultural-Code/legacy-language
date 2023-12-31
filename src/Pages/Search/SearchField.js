import { TextField } from '@material-ui/core'
import React from 'react'

const SearchField = React.forwardRef(
  ({ loading, onChange, error, defaultValue = '' }, ref) => {
    var helperText = 'Please type something'
    if (!error) {
      helperText = ''
    }
    return (
      <TextField
        error={error}
        helperText={helperText}
        inputRef={ref}
        disabled={loading}
        onChange={onChange}
        fullWidth={true}
        defaultValue={defaultValue}
      />
    )
  }
)

export default SearchField
