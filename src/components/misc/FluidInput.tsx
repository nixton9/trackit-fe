import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const FluidInputContainer = styled.div`
  position: relative;

  span {
    font-size: inherit;
    padding: 0 0.2rem;
    opacity: 0;
  }

  input {
    position: absolute;
    width: 100%;
    left: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

type FluidInputProps = {
  value: number | string | undefined
  placeholder?: string
  setValue: Dispatch<SetStateAction<number | string | undefined>>
}

export const FluidInput: React.FC<FluidInputProps> = ({
  value,
  setValue,
  placeholder
}) => {
  return (
    <FluidInputContainer>
      <span aria-hidden="true">{value ? value : placeholder}</span>
      <input
        type="number"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        placeholder={placeholder}
        step="0.01"
      />
    </FluidInputContainer>
  )
}
