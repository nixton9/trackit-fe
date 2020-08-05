import React from 'react'
import { Styled } from '../../styles/Single.styles'
import { Expense } from '../../utils/ModuleTypes'

const SingleExpense: React.FC<Expense> = ({ id, title, value, category }) => {
  return (
    <Styled.SingleExpense__Container>
      <Styled.SingleFlex>
        <Styled.SingleTitle>{title}</Styled.SingleTitle>
        <Styled.SingleCategory color={category.color}>
          {category.name}
        </Styled.SingleCategory>
        <Styled.SingleExpense__Value>{value}$</Styled.SingleExpense__Value>
      </Styled.SingleFlex>
    </Styled.SingleExpense__Container>
  )
}

export default SingleExpense
