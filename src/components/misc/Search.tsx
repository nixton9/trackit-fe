import React, { useState, useEffect, useRef } from 'react'
import { useToggleElement } from '../../utils/useToggleElement'
import { Styled } from '../../styles/Search.styles'
import { ReactComponent as GlassIcon } from '../../assets/icons/glass.svg'
import { useHistory } from 'react-router-dom'

const Search: React.FC = () => {
  const [inputVal, setInputVal] = useState('')
  const [open, setOpen, overlayEl] = useToggleElement()

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const history = useHistory()

  useEffect(() => {
    if (!open) setInputVal('')
  }, [open])

  const handleIconClick = () => {
    if (open) {
      handleSubmit()
    } else {
      setOpen(true)
      setTimeout(
        () => inputRef && inputRef.current && inputRef.current.focus(),
        400
      )
    }
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    if (inputVal.length) {
      history.push(`/search/${inputVal}`)
      setOpen(false)
      setInputVal('')
    }
  }

  return (
    <>
      <Styled.SearchIcon open={open} className="mbl-click">
        <GlassIcon onClick={handleIconClick} data-test-id="search-icon" />
        <form onSubmit={handleSubmit}>
          <Styled.SearchInput
            ref={inputRef}
            open={open}
            type="text"
            placeholder="Search for a note, task, habit or expense"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            data-test-id="search-input"
          />
        </form>
      </Styled.SearchIcon>
      <Styled.SearchOverlay open={open} ref={overlayEl} />
    </>
  )
}

export default Search
