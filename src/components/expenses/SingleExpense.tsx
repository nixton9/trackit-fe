import React from 'react'
import { Styled } from '../../styles/Single.styles'
import { ModuleTypes, Expense, Currencies } from '../../utils/ModuleTypes'
import { showCurrencySym } from '../../utils/globalHelpers'
import { activeContentState, isEditState } from '../misc/Add'
import { expenseIdState } from '../../utils/atoms'
import { useSetRecoilState } from 'recoil'

interface SingleExpenseProps extends Expense {
  currency: Currencies
}

const SingleExpense: React.FC<SingleExpenseProps> = ({
  id,
  title,
  value,
  type,
  currency
}) => {
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
        <Styled.SingleExpense__Value>
          {value}
          {currency && showCurrencySym(currency)}
        </Styled.SingleExpense__Value>
      </Styled.SingleFlex>
    </Styled.SingleExpense__Container>
  )
}

export default SingleExpense
