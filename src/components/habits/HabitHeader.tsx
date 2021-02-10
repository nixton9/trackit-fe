import React, { ReactText } from 'react'
import { Styled } from '../../styles/Calendar.styles'
import { ModuleTypes } from '../../utils/ModuleTypes'
import { activeContentState, isEditState } from '../misc/Add'
import { habitIdState } from '../../utils/atoms'
import { useSetRecoilState } from 'recoil'

type HabitHeaderProps = {
  id: string | number | ReactText
  title: string
}

export const HabitHeader: React.FC<HabitHeaderProps> = ({ id, title }) => {
  const setActiveContent = useSetRecoilState(activeContentState)
  const setHabitId = useSetRecoilState(habitIdState)
  const setIsEdit = useSetRecoilState(isEditState)

  const handleHabitEdit = () => {
    setActiveContent(ModuleTypes.Habits)
    setIsEdit(true)
    setHabitId(id.toString())
  }

  return (
    <Styled.CalendarHabit__Title
      onClick={handleHabitEdit}
      className="habit-title"
    >
      {title}
    </Styled.CalendarHabit__Title>
  )
}
