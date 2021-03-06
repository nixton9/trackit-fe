import styled from 'styled-components/macro'
import { ModuleTypes } from '../utils/ModuleTypes'
import { device } from './theme'
import wave1 from '../assets/wave1.svg'
import wave2 from '../assets/wave2.svg'
import wave3 from '../assets/wave3.svg'
import wave4 from '../assets/wave4.svg'

type WidgetProps = {
  type: ModuleTypes
}

type WidgetInfo__ValueProps = {
  length: number
}

const WidgetContainer = styled.div`
  position: relative;
  width: 24rem;
  height: 25rem;

  @media ${device.tabletXL} {
    width: 21rem;
    height: 22rem;
  }

  @media ${device.tablet} {
    width: 19.2rem;
    height: 20rem;
  }
`

const Widget = styled.div<WidgetProps>`
  position: relative;
  color: ${props => props.theme.alwaysWhite};
  border-radius: ${props => props.theme.bigBorderRadius};
  width: 100%;
  height: 100%;
  padding: 1.8rem;
  background: ${props =>
    props.type === ModuleTypes.Notes
      ? `url(${wave1}), ${props.theme.pinkGradient}`
      : props.type === ModuleTypes.Tasks
      ? `url(${wave2}), ${props.theme.purpleGradient}`
      : props.type === ModuleTypes.Habits
      ? `url(${wave3}), ${props.theme.greenGradient}`
      : `url(${wave4}), ${props.theme.blueGradient}`};
  background-size: 300px;
  background-position: 50% 50%;
  transition: all 0.25s ease;

  @media ${device.mobileS} {
    border-radius: ${props => props.theme.mainBorderRadius};
  }

  &:hover {
    background-position: 70% 70%;
  }

  &:active {
    background-position: 70% 70%;

    &:before {
      opacity: 60%;
    }
  }

  .svg-fill {
    fill: ${props => props.theme.alwaysWhite};
  }
  .svg-stroke {
    stroke: ${props => props.theme.alwaysWhite};
  }

  &:before {
    content: '';
    width: 82%;
    height: 93%;
    position: absolute;
    top: 12%;
    left: 0;
    right: 0;
    margin: 0 auto;
    filter: blur(31px);
    opacity: 0.7;
    border-radius: ${props => props.theme.mainBorderRadius};
    background: ${props =>
      props.type === ModuleTypes.Notes
        ? props.theme.pinkGradient
        : props.type === ModuleTypes.Tasks
        ? props.theme.purpleGradient
        : props.type === ModuleTypes.Habits
        ? props.theme.greenGradient
        : props.theme.blueGradient};
    z-index: -1;
    transition: all 0.2s ease-in-out;
  }
`

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const WidgetHeader__Title = styled.h3`
  font-weight: ${props => props.theme.fontBold};
  font-size: 2rem;
  line-height: 2.2rem;
`

const WidgetHeader__Icon = styled.span`
  svg {
    width: 4.6rem;

    @media ${device.tabletXL} {
      width: 4rem;
  }
`

const WidgetInfo = styled.div`
  margin-top: ${props => props.theme.spacingXS};
  padding-left: ${props => props.theme.spacingS};
  overflow: hidden;

  @media ${device.tabletXL} {
    padding-left: ${props => props.theme.spacingXS};
  }

  @media ${device.tablet} {
    padding-left: ${props => props.theme.spacingXXS};
  }
`

const WidgetInfo_Value = styled.h2<WidgetInfo__ValueProps>`
  font-weight: ${props => props.theme.fontExtraLight};
  font-size: ${props =>
    props.length < 2
      ? '9rem'
      : props.length < 3
      ? '8.2rem'
      : props.length < 4
      ? '6.7rem'
      : '5.7rem'};
  line-height: ${props =>
    props.length < 2
      ? '8.3rem'
      : props.length < 3
      ? '8rem'
      : props.length < 4
      ? '6.9rem'
      : '6rem'};

  @media ${device.tabletXL} {
    font-size: ${props =>
      props.length < 2
        ? '7.6rem'
        : props.length < 3
        ? '6.9rem'
        : props.length < 4
        ? '5.7rem'
        : '4.8rem'};
    line-height: ${props =>
      props.length < 2
        ? '7.2rem'
        : props.length < 3
        ? '7rem'
        : props.length < 4
        ? '6rem'
        : '5.2rem'};
  }
`

const WidgetInfo_Label = styled.p`
  font-weight: ${props => props.theme.fontRegular};
  font-size: 1.5rem;
  padding-left: 0.7rem;

  @media ${device.tabletXL} {
    font-size: 1.2rem;
    padding-left: 0.2rem;
  }
`

const WidgetPlus = styled.span`
  position: absolute;
  padding: 1.5rem;
  right: 0rem;
  bottom: -0.2rem;
  cursor: pointer;

  svg {
    width: 2.9rem;
    .svg-fill {
      fill: ${props => props.theme.alwaysWhite};
    }
    .svg-stroke {
      stroke: ${props => props.theme.alwaysWhite};
    }
  }

  @media ${device.tabletXL} {
    svg {
      width: 2.4rem;
    }
  }
`

export const Styled = {
  WidgetContainer,
  Widget,
  WidgetHeader,
  WidgetHeader__Title,
  WidgetHeader__Icon,
  WidgetInfo,
  WidgetInfo_Value,
  WidgetInfo_Label,
  WidgetPlus
}
