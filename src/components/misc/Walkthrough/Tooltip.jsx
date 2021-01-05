import React from 'react'
import styled from 'styled-components/macro'

const TooltipContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 55rem;
  min-width: 36rem;
  background-color: ${props => props.theme.backgroundBlack};
  color: ${props => props.theme.white};
  padding: 4rem ${props => props.theme.spacingS} 2.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  box-shadow: 0 -23px 16px 0 rgba(0, 0, 0, 0.07);
`
const TooltipTitle = styled.h3`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontSemiBold};
  text-align: center;
  margin-bottom: ${props => props.theme.spacingS};
`
const TooltipContent = styled.p`
  font-size: 1.5rem;
  line-height: 3.2rem;
  font-weight: ${props => props.theme.fontLight};
`
const TooltipFooter = styled.div`
  margin-top: ${props => props.theme.spacingS};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TooltipButton = styled.button`
  color: ${props => props.theme.alwaysWhite};
  background-color: ${props => props.theme.accent};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontSemiBold};
  padding: 0.6rem 1.2rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  border: none;
  cursor: pointer;

  &:nth-child(2) {
    margin-left: 1rem;
  }

  &.ghost {
    background-color: transparent;
  }

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkenAccent};
  }
`

const TooltipSkip = styled.span`
  position: relative;
  color: ${props => props.theme.lightBlue};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontSemiBold};
  cursor: pointer;
  z-index: 11;
`

const TooltipCross = styled.span`
  position: absolute;
  top: 0;
  right: 1.2rem;
  color: ${props => props.theme.lightBlue};
  font-size: 3.5rem;
  font-weight: ${props => props.theme.fontMedium};
  transform: rotate(45deg);
  cursor: pointer;
`

export const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps
}) => {
  console.log(step)
  return (
    <TooltipContainer {...tooltipProps}>
      <TooltipCross className="mbl-click" {...skipProps}>
        +
      </TooltipCross>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      <TooltipFooter>
        <TooltipSkip className="mbl-click" {...skipProps}>
          skip
        </TooltipSkip>
        <div className="buttons">
          {index > 0 && (
            <TooltipButton className="ghost" {...backProps}>
              Back
            </TooltipButton>
          )}
          {continuous && <TooltipButton {...primaryProps}>Next</TooltipButton>}
        </div>
      </TooltipFooter>
    </TooltipContainer>
  )
}
