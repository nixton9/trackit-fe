import React from 'react'
import { Styled } from '../../styles/Charts.styles'

type ChartTooltipProps = {
  active: boolean
  payload: any
  label: string
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label
}) => {
  if (active) {
    const dataKey = payload[0].dataKey

    return (
      <Styled.Tooltip>
        <h5>
          {payload[0].payload.monthLabel || payload[0].payload.name || label}
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
