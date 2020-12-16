import React, { useState, useEffect } from 'react'
import { ChartTooltip } from './ChartTooltip'
import { Styled } from '../../styles/Charts.styles'
import { useWindowDimensions } from '../../utils/useWindowDimensions'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

type PieGraphProps = {
  data: { name: string; value: number; color: string }[]
}

export const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  const [innerRadius, setInnerRadius] = useState(60)
  const [outerRadius, setOuterRadius] = useState(80)

  const { width } = useWindowDimensions()

  const colors = data.map(item => item.color)

  useEffect(() => {
    if (width < 550 && width > 430) {
      setInnerRadius(40)
      setOuterRadius(50)
    } else if (width < 430) {
      setInnerRadius(50)
      setOuterRadius(60)
    } else {
      setInnerRadius(60)
      setOuterRadius(80)
    }
  }, [width])
  return (
    <Styled.GraphContainer className="pie">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={ChartTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </Styled.GraphContainer>
  )
}
