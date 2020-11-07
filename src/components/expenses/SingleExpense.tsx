import React from 'react'
import { Styled } from '../../styles/Single.styles'
import { ModuleTypes, Expense } from '../../utils/ModuleTypes'
import { activeContentState, isEditState } from '../misc/Add'
import { expenseIdState } from './AddExpense'
import { useSetRecoilState } from 'recoil'

const SingleExpense: React.FC<Expense> = ({ id, title, value, type, date }) => {
  const setActiveContent = useSetRecoilState(activeContentState)
  const setTaskId = useSetRecoilState(expenseIdState)
  const setIsEdit = useSetRecoilState(isEditState)

  const handleExpenseEdit = () => {
    setActiveContent(ModuleTypes.Expenses)
    setIsEdit(true)
    setTaskId(id.toString())
  }

  return (
    <Styled.SingleExpense__Container onClick={handleExpenseEdit}>
      <Styled.SingleFlex>
        <Styled.SingleTitle>{title ? title : '-'}</Styled.SingleTitle>
        {type && (
          <Styled.SingleCategory color={type.color}>
            {type.name}
          </Styled.SingleCategory>
        )}
        <Styled.SingleExpense__Value>{value}$</Styled.SingleExpense__Value>
      </Styled.SingleFlex>
    </Styled.SingleExpense__Container>
  )
}

export default SingleExpense
