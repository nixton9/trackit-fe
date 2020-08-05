import React from 'react'
import { Styled } from '../../styles/SingleExpense.styles'
import { Expense } from '../../utils/ModuleTypes'

const SingleExpense: React.FC<Expense> = ({ id, title, value, category }) => {
  return (
    <Styled.SingleExpenseContainer>
      <Styled.SingleExpenseFlex>
        <Styled.SingleExpenseTitle>{title}</Styled.SingleExpenseTitle>
        <Styled.SingleExpenseCategory color={category.color}>
          {category.name}
        </Styled.SingleExpenseCategory>
        <Styled.SingleExpenseValue>{value}$</Styled.SingleExpenseValue>
      </Styled.SingleExpenseFlex>
    </Styled.SingleExpenseContainer>
  )
}

export default SingleExpense
