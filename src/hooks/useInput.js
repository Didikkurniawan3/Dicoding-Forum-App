import { useState } from "react"

const useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue)

  function handleValueChange(e) {
    if (typeof e === 'string') {
      setValue(e)
    } else {
      setValue(e.target.value)
    }
  }

  return [value, handleValueChange, setValue]
}

export default useInput