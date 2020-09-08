import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
  }
`

const Spinner = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
`

const DoubleBounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;

  &.doublebounce2 {
    animation-delay: -1s;
  }
`

export const LoadingSpinner: React.FC = () => (
  <Spinner>
    <DoubleBounce />
    <DoubleBounce className="doublebounce2" />
  </Spinner>
)
