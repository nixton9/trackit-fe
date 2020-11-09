import React, { ReactElement } from 'react'
import { currencyState } from '../expenses/ExpensesSettings'
import { ModuleTypes } from '../../utils/ModuleTypes'
import { showCurrencySym } from '../../utils/globalHelpers'
import { Styled } from '../../styles/HomeWidget.styles'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { activeContentState } from './Add'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'

interface HomeWidgetProps {
  type: ModuleTypes
  value: string
  label: string
  icon: ReactElement
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  type,
  value,
  label,
  icon
}) => {
  const setActiveContent = useSetRecoilState(activeContentState)
  const currency = useRecoilValue(currencyState)

  return (
    <Styled.WidgetContainer>
      <Link to={`/${type.toLowerCase()}`}>
        <Styled.Widget type={type} className="widget">
          <Styled.WidgetHeader>
            <Styled.WidgetHeader__Title>{type}</Styled.WidgetHeader__Title>
            <Styled.WidgetHeader__Icon>{icon}</Styled.WidgetHeader__Icon>
          </Styled.WidgetHeader>

          <Styled.WidgetInfo>
            <Styled.WidgetInfo_Value
              length={type === ModuleTypes.Expenses ? value.length : 0}
            >
              {value}
              {type === ModuleTypes.Expenses &&
                currency &&
                showCurrencySym(currency)}
            </Styled.WidgetInfo_Value>
            <Styled.WidgetInfo_Label>{label}</Styled.WidgetInfo_Label>
          </Styled.WidgetInfo>
        </Styled.Widget>
      </Link>

      <Styled.WidgetPlus onClick={() => setActiveContent(type)}>
        <PlusIcon />
      </Styled.WidgetPlus>
    </Styled.WidgetContainer>
  )
}

export default HomeWidget
