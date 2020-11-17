import React, { useState } from 'react'
import CalendarSingle from './CalendarSingle'
import CalendarAll from './CalendarAll'
import HabitsSettings from './HabitsSettings'
import Tooltip from 'react-tooltip-lite'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { activeContentState } from '../misc/Add'
import { getCurrentStrike, parseDateInverse } from '../../utils/dateHelpers'
import { Styled } from '../../styles/Page.styles'
import { Habit, DayState, ModuleTypes } from '../../utils/ModuleTypes'
import { habitsViewOptions } from '../../utils/selectsOptions'
import { HABITS } from '../../utils/queries'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const ADD_DAY_TO_HABIT = gql`
  mutation AddDayToHabit($habit: ID!, $date: String!, $state: DayState!) {
    addDayToHabit(habit: $habit, date: $date, state: $state) {
      id_day
    }
  }
`

const UPDATE_DAY = gql`
  mutation UpdateHabit($id: ID!, $state: DayState!) {
    updateDay(id: $id, state: $state) {
      id_day
    }
  }
`

const HabitsPage: React.FC = () => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const { loading, error, data } = useQuery(HABITS)
  const { refetch: refetchHabits } = useQuery(HABITS)
  const [addDayToHabit] = useMutation(ADD_DAY_TO_HABIT)
  const [updateDay] = useMutation(UPDATE_DAY)

  const handleDayClick = (
    habitId: string | number,
    day: Date,
    currState: DayState | null,
    dayId: null | string | number
  ) => {
    if (currState && dayId) {
      updateDay({
        variables: {
          id: dayId,
          state: getNextState(currState)
        }
      })
        .then(res => refetchHabits())
        .catch(err => console.log(err.message))
    } else {
      addDayToHabit({
        variables: {
          habit: habitId,
          date: parseDateInverse(day),
          state: DayState.DONE
        }
      })
        .then(res => refetchHabits())
        .catch(err => console.log(err.message))
    }
  }

  const getNextState = (state: DayState) => {
    switch (state) {
      case DayState.DONE:
        return DayState.NOTDONE
      case DayState.NOTDONE:
        return DayState.BLANK
      case DayState.BLANK:
        return DayState.DONE
    }
  }

  const [view, setView] = useState('all')

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const showAll = view === 'all'
  const currHabit =
    showAll || !data
      ? null
      : data.habits.find((habit: Habit) => Number(habit.id) === Number(view))

  return (
    <>
      <Styled.PageContainer>
        <Styled.PageTitle>Habits</Styled.PageTitle>

        <Styled.PageHeader>
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown>
              <SelectMenu
                id="habits-view"
                value={view}
                onChange={handleViewChange}
                options={habitsViewOptions(data)}
                itemClass={'view-select-item'}
              />
            </Styled.PageHeader__View__Dropdown>

            <Tooltip
              content={
                showAll
                  ? data
                    ? `${data.habits.length} habits`
                    : '0 days'
                  : currHabit && 'Current streak'
              }
              arrow={false}
              direction={'up'}
            >
              <Styled.PageHeader__View__Counter className="smaller">
                {data
                  ? showAll
                    ? data.habits.length
                    : currHabit && getCurrentStrike(currHabit.days) + ' days'
                  : 0}
              </Styled.PageHeader__View__Counter>
            </Tooltip>
          </Styled.PageHeader__View>

          <Styled.PageHeader__Settings>
            <Tooltip content={'Settings'} arrow={false} direction={'up'}>
              <HabitsSettings />
            </Tooltip>
          </Styled.PageHeader__Settings>
        </Styled.PageHeader>
      </Styled.PageContainer>

      <Styled.PageContent>
        {error ? (
          <PageError>{error.message}</PageError>
        ) : loading ? (
          <PageLoading />
        ) : data.habits.length ? (
          showAll ? (
            <CalendarAll habits={data.habits} handleDayClick={handleDayClick} />
          ) : (
            currHabit && (
              <CalendarSingle
                habit={currHabit}
                handleDayClick={handleDayClick}
              />
            )
          )
        ) : (
          <Styled.PageContent__NoData>
            <NoDataIcon />
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
      <Styled.PageAddItem onClick={() => setActiveContent(ModuleTypes.Habits)}>
        <PlusIcon />
      </Styled.PageAddItem>
    </>
  )
}

export default HabitsPage
