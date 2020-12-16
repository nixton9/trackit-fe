import styled from 'styled-components/macro'
import { device } from './theme'

const GraphContainer = styled.div`
  width: 100%;
  height: 20rem;
  margin: 0 auto;

  &.bar {
    height: 35rem;
  }

  &.pie {
    width: 50%;
    margin: unset;
  }

  .recharts-cartesian-axis-line {
    stroke: ${props => props.theme.white};
    display: none;
  }

  .recharts-cartesian-axis-tick-line {
    display: none;
  }

  .recharts-cartesian-axis-ticks {
    transform: translateY(5px);
  }

  .recharts-text {
    font-size: 1rem;
    font-weight: ${props => props.theme.fontBold};
    fill: ${props => props.theme.white};
  }

  .recharts-sector {
    stroke: none;
  }

  .recharts-tooltip-cursor {
    fill: ${props => props.theme.hoverBlack};
  }

  @media ${device.tablet} {
    &.bar {
      height: 25rem;
    }
  }

  @media ${device.mobileL} {
    &.pie {
      width: 40%;
      height: 15rem;
    }
  }

  @media ${device.mobile} {
    &.pie {
      width: 90%;
      margin: ${props => props.theme.spacingXXS} auto;
      height: 15rem;
    }
  }

  @media ${device.mobileS} {
    &.pie {
      height: 20rem;
    }
  }
`

const Tooltip = styled.div`
  min-width: 14rem;
  background: ${props => props.theme.darkBlue};
  color: ${props => props.theme.white};
  padding: ${props => props.theme.spacingXS};
  border-radius: ${props => props.theme.smallBorderRadius};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16);

  h5 {
    font-size: 1rem;
    font-weight: ${props => props.theme.fontBold};
  }

  h4 {
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontBold};
    margin-top: ${props => props.theme.spacingXS};
    color: ${props => props.theme.accent};
  }

  p {
    font-size: 0.95rem;
    font-weight: ${props => props.theme.fontRegular};
  }
`

export const Styled = {
  GraphContainer,
  Tooltip
}
