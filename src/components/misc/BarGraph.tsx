import React from 'react'
import { ChartTooltip } from './ChartTooltip'
import { Styled } from '../../styles/Charts.styles'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

type BarGraphProps = {
  data: {
    name: string
    value: number | string
    monthLabel?: string
    displayValue?: string
  }[]
  bars: { key: string; color: string }[]
}

export const BarGraph: React.FC<BarGraphProps> = ({ data, bars }) => {
  const chartData = data.map(item => ({
    ...item,
    value: item.value === 0 ? 1 : item.value
  }))

  return (
    <Styled.GraphContainer className="bar">
      <ResponsiveContainer>
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <Tooltip content={ChartTooltip} />
          {bars &&
            bars.length &&
            bars.map(bar => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                fill={bar.color}
                radius={4}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </Styled.GraphContainer>
  )
}
