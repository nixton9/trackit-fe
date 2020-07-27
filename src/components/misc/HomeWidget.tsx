import React, { ReactElement } from 'react'
import { ModuleTypes } from '../../utils/ModuleTypes'
import { Styled } from '../../styles/HomeWidget.styles'
import { Link } from 'react-router-dom'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'

interface HomeWidgetProps {
  type: ModuleTypes
  value: string
  label: string
  url: string
  icon: ReactElement
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  type,
  value,
  label,
  url,
  icon
}) => {
  return (
    <Link to={`/${type.toLowerCase()}`}>
      <Styled.Widget type={type}>
        <Styled.WidgetHeader>
          <Styled.WidgetHeader__Title>{type}</Styled.WidgetHeader__Title>
          <Styled.WidgetHeader__Icon>{icon}</Styled.WidgetHeader__Icon>
        </Styled.WidgetHeader>

        <Styled.WidgetInfo>
          <Styled.WidgetInfo_Value
            length={type === ModuleTypes.Expenses ? value.length : 0}
          >
            {value}
            {type === ModuleTypes.Expenses && '$'}
          </Styled.WidgetInfo_Value>
          <Styled.WidgetInfo_Label>{label}</Styled.WidgetInfo_Label>
        </Styled.WidgetInfo>

        <Styled.WidgetPlus>
          <PlusIcon />
        </Styled.WidgetPlus>
      </Styled.Widget>
    </Link>
  )
}

export default HomeWidget
