import React from 'react'
import styled from 'styled-components/macro'

const ToggleContainer = styled.div`
  width: 100%;
`
const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 9.2rem;
  height: 3rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.grey};
  border-radius: 34px;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    content: '';
    position: absolute;
    height: 1.8rem;
    width: 1.8rem;
    left: 6px;
    bottom: 5px;
    background-color: ${props => props.theme.white};
    border-radius: 50%;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  &.checked {
    background-color: ${props => props.theme.accent};

    &:before {
      transform: translateX(3rem);
    }
  }
`

type ToggleButtonProps = {
  isChecked: boolean
  setIsChecked: (checked: boolean) => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isChecked,
  setIsChecked
}) => {
  return (
    <ToggleContainer className="toggle-button">
      <Toggle>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <Slider className={isChecked ? 'slider checked' : 'slider'} />
      </Toggle>
    </ToggleContainer>
  )
}
