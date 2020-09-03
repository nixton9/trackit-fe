import React, { useState } from 'react'
import { AddSubmitButton } from '../misc/Add'
import { Styled } from '../../styles/Add.styles'

const AddHabit: React.FC = () => {
  const [title, setTitle] = useState('')

  const handleSubmit = () => {
    console.log(title)
  }

  return (
    <>
      <Styled.AddInput
        type="text"
        placeholder="Ex: Eat healthy"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Styled.AddWidgetsContainer>
        <AddSubmitButton handleSubmit={handleSubmit} />
      </Styled.AddWidgetsContainer>
    </>
  )
}

export default AddHabit
