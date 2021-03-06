import React from 'react'
import { Styled } from '../../styles/Charts.styles'

type ChartTooltipProps = {
  active: boolean
  payload: any
  label: string
}

export const ExpensesChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label
}) => {
  if (active) {
    const dataKey = payload[0].dataKey
    const categoryColor = payload[0].payload.payload
      ? payload[0].payload.payload.color
      : null

    return (
      <Styled.Tooltip catColor={categoryColor}>
        <h5>
          {payload[0].payload.monthLabel || payload[0].payload.name || label}
          {categoryColor && <span></span>}
        </h5>
        <h4>
          {payload[0].payload.displayValue || payload[0].payload[dataKey]}
        </h4>
        <p>Total spent</p>
      </Styled.Tooltip>
    )
  }
  return null
}

export const HabitsChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label
}) => {
  if (active) {
    const dataKey = payload[0].dataKey
    const categoryColor = payload[0].payload.payload
      ? payload[0].payload.payload.color
      : null

    return (
      <Styled.Tooltip catColor={categoryColor}>
        <h5>
          {payload[0].payload.monthLabel || payload[0].payload.name || label}
          {categoryColor && <span></span>}
        </h5>
        <h4>
          {payload[0].payload.displayValue || payload[0].payload[dataKey]}
        </h4>
        <p>days</p>
      </Styled.Tooltip>
    )
  }
  return null
}
