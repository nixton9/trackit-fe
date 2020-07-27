import React, { useState, useEffect, useRef } from 'react'
import { Styled } from '../../styles/Search.styles'
import { ReactComponent as GlassIcon } from '../../assets/icons/glass.svg'

const Search: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const overlayEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlayCurr = overlayEl.current

    overlayEl &&
      overlayCurr &&
      overlayCurr.addEventListener('click', () => {
        setIsInputOpen(false)
        setInputVal('')
      })

    return () => {
      overlayEl &&
        overlayCurr &&
        overlayCurr.removeEventListener('click', () => {
          setIsInputOpen(false)
          setInputVal('')
        })
    }
  }, [])

  const handleIconClick = () => {
    if (isInputOpen) {
      handleSubmit()
    } else {
      setIsInputOpen(true)
    }
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    console.log(inputVal)
    setIsInputOpen(false)
    setInputVal('')
  }

  return (
    <>
      <Styled.SearchIcon open={isInputOpen}>
        <GlassIcon onClick={handleIconClick} />
        <form onSubmit={handleSubmit}>
          <Styled.SearchInput
            open={isInputOpen}
            type="text"
            placeholder="Search for a note, task, habit or expense"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          />
        </form>
      </Styled.SearchIcon>
      <Styled.SearchOverlay open={isInputOpen} ref={overlayEl} />
    </>
  )
}

export default Search
