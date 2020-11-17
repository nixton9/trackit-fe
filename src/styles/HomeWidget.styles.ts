import styled from 'styled-components'
import { ModuleTypes } from '../utils/ModuleTypes'
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
  width: 19.2rem;
  height: 20rem;
`

const Widget = styled.div<WidgetProps>`
  position: relative;
  color: ${props => props.theme.white};
  border-radius: ${props => props.theme.bigBorderRadius};
  width: 100%;
  height: 100%;
  padding: 1.8rem;
  background: ${props =>
    props.type === ModuleTypes.Notes
      ? `url(${wave1}), ${props.theme.blueGradient}`
      : props.type === ModuleTypes.Tasks
      ? `url(${wave2}), ${props.theme.purpleGradient}`
      : props.type === ModuleTypes.Habits
      ? `url(${wave3}), ${props.theme.pinkGradient}`
      : `url(${wave4}), ${props.theme.greenGradient}`};
  background-size: 300px;
  background-position: 50% 50%;
  transition: all 0.25s ease;

  &:hover {
    background-position: 70% 70%;
  }

  .svg-fill {
    fill: ${props => props.theme.white};
  }
  .svg-stroke {
    stroke: ${props => props.theme.white};
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
    opacity: 70%;
    border-radius: ${props => props.theme.mainBorderRadius};
    background: ${props =>
      props.type === ModuleTypes.Notes
        ? props.theme.blueGradient
        : props.type === ModuleTypes.Tasks
        ? props.theme.purpleGradient
        : props.type === ModuleTypes.Habits
        ? props.theme.pinkGradient
        : props.theme.greenGradient};
    z-index: -1;
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
    width: 3.5rem;
  }
`

const WidgetInfo = styled.div`
  margin-top: ${props => props.theme.spacingXS};
  padding-left: ${props => props.theme.spacingXXS};
  overflow: hidden;
`

const WidgetInfo_Value = styled.h2<WidgetInfo__ValueProps>`
  font-weight: ${props => props.theme.fontExtraLight};
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
`

const WidgetInfo_Label = styled.p`
  font-weight: ${props => props.theme.fontRegular};
  font-size: 1.2rem;
  padding-left: 0.2rem;
`

const WidgetPlus = styled.span`
  position: absolute;
  right: 1.1rem;
  bottom: 1rem;
  cursor: pointer;

  svg {
    width: 2.4rem;
    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
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
