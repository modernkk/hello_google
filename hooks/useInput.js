import { useState } from 'react'

function useInput(initValue) {
  const [value, setValue] = useState(initValue)

  return {
    input: {
      value,
      onChange: e => {
        setValue(e.target.value)
      }
    },
    setValue
  }
}

export default useInput;
