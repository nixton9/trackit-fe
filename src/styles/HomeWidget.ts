import styled from 'styled-components'
import { HomeWidgetTypes } from '../components/misc/HomeWidget'
import wave1 from '../assets/wave1.svg'
import wave2 from '../assets/wave2.svg'
import wave3 from '../assets/wave3.svg'
import wave4 from '../assets/wave4.svg'

type WidgetProps = {
  type: HomeWidgetTypes
}

type WidgetInfo__ValueProps = {
  length: number
}

const Widget = styled.div<WidgetProps>`
  position: relative;
  color: ${props => props.theme.white};
  border-radius: ${props => props.theme.bigBorderRadius};
  width: 12rem;
  height: 12.5rem;
  padding: ${props => props.theme.spacingXXS};
  background: ${props =>
    props.type === HomeWidgetTypes.Notes
      ? `url(${wave1}), ${props.theme.blueGradient}`
      : props.type === HomeWidgetTypes.Tasks
      ? `url(${wave2}), ${props.theme.purpleGradient}`
      : props.type === HomeWidgetTypes.Habits
      ? `url(${wave3}), ${props.theme.pinkGradient}`
      : `url(${wave4}), ${props.theme.greenGradient}`};
  background-size: cover;

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
      props.type === HomeWidgetTypes.Notes
        ? props.theme.blueGradient
        : props.type === HomeWidgetTypes.Tasks
        ? props.theme.purpleGradient
        : props.type === HomeWidgetTypes.Habits
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
  font-size: 1.25rem;
  line-height: 1.4rem;
`

const WidgetHeader__Icon = styled.span`
  svg {
    width: 2.2rem;
  }
`

const WidgetInfo = styled.div`
  margin-top: ${props => props.theme.spacingXXS};
  padding-left: 0.5rem;
  overflow: hidden;
`

const WidgetInfo_Value = styled.h2<WidgetInfo__ValueProps>`
  font-weight: ${props => props.theme.fontExtraLight};
  font-size: ${props =>
    props.length < 3 ? '4.8rem' : props.length < 4 ? '3.6rem' : '3rem'};
  line-height: 4.5rem;
`

const WidgetInfo_Label = styled.p`
  font-weight: ${props => props.theme.fontRegular};
  font-size: 0.75rem;
  padding-left: 0.2rem;
`

const WidgetPlus = styled.span`
  position: absolute;
  right: 0.7rem;
  bottom: 0.5rem;

  svg {
    width: 1.5rem;
  }
`

export const Styled = {
  Widget,
  WidgetHeader,
  WidgetHeader__Title,
  WidgetHeader__Icon,
  WidgetInfo,
  WidgetInfo_Value,
  WidgetInfo_Label,
  WidgetPlus
}
