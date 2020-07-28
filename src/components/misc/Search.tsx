import React, { useState, useEffect } from 'react'
import { useToggleElement } from '../../utils/useToggleElement'
import { Styled } from '../../styles/Search.styles'
import { ReactComponent as GlassIcon } from '../../assets/icons/glass.svg'

const Search: React.FC = () => {
  const [inputVal, setInputVal] = useState('')
  const [open, setOpen, overlayEl] = useToggleElement()

  useEffect(() => {
    if (!open) setInputVal('')
  }, [open])

  const handleIconClick = () => {
    if (open) {
      handleSubmit()
    } else {
      setOpen(true)
    }
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    console.log(inputVal)
    setOpen(false)
    setInputVal('')
  }

  return (
    <>
      <Styled.SearchIcon open={open}>
        <GlassIcon onClick={handleIconClick} />
        <form onSubmit={handleSubmit}>
          <Styled.SearchInput
            open={open}
            type="text"
            placeholder="Search for a note, task, habit or expense"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          />
        </form>
      </Styled.SearchIcon>
      <Styled.SearchOverlay open={open} ref={overlayEl} />
    </>
  )
}

export default Search
