import React, { useState, Dispatch, SetStateAction } from 'react'
import CalendarSingle from './CalendarSingle'
import CalendarAll from './CalendarAll'
import HabitsSettings from './HabitsSettings'
import Tooltip from 'react-tooltip-lite'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { parseDateInverse } from '../../utils/dateHelpers'
import { getNextDayState } from '../../utils/globalHelpers'
import { getCurrentStreak } from '../../utils/statsHelpers'
import { Styled } from '../../styles/Page.styles'
import { ModuleTypes, Habit, DayState } from '../../utils/ModuleTypes'
import { HABITS } from '../../utils/queries'
import { ADD_DAY_TO_HABIT, UPDATE_DAY } from '../../utils/mutations'
import { habitsViewOptions } from '../../utils/selectsOptions'
import { ReactComponent as StatsIcon } from '../../assets/icons/stats.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import { useQuery, useMutation, ApolloError } from '@apollo/client'
import { Link } from 'react-router-dom'

type HabitsListProps = {
  data: { habits: Habit[] }
  error: ApolloError | undefined
  loading: boolean
  setActiveContent: Dispatch<SetStateAction<string>>
}

export const HabitsList: React.FC<HabitsListProps> = ({
  data,
  error,
  loading,
  setActiveContent
}) => {
  const [view, setView] = useState('all')

  const { refetch: refetchHabits } = useQuery(HABITS)
  const [addDayToHabit] = useMutation(ADD_DAY_TO_HABIT)
  const [updateDay] = useMutation(UPDATE_DAY)

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

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
          state: getNextDayState(currState)
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

  const showAll = view === 'all'

  const currHabit =
    showAll || !data
      ? null
      : data.habits.find((habit: Habit) => Number(habit.id) === Number(view))

  return (
    <Styled.HabitsContainer className="overflow">
      <Styled.PageContainer>
        <Styled.PageTitle>Habits</Styled.PageTitle>

        <Styled.PageHeader className="page-header">
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown className="habits">
              <SelectMenu
                id="habits-view"
                value={view}
                onChange={handleViewChange}
                options={habitsViewOptions(data)}
                itemClass={'view-select-item'}
              />
            </Styled.PageHeader__View__Dropdown>

            <Tooltip
              tipContentClassName="visible-tooltip"
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
                    : currHabit && getCurrentStreak(currHabit.days) + ' days'
                  : 0}
              </Styled.PageHeader__View__Counter>
            </Tooltip>
          </Styled.PageHeader__View>

          <Styled.PageHeader__Settings>
            <Tooltip
              eventOff={'onClick'}
              content={'Statistics'}
              arrow={false}
              direction={'up'}
              className="tooltip"
            >
              <Link
                to="/habits/stats"
                className="mbl-click"
                data-test-id="habits-stats-link"
              >
                <StatsIcon className="stats-icon" />
              </Link>
            </Tooltip>

            <Tooltip
              eventOff={'onClick'}
              content={'Settings'}
              arrow={false}
              direction={'up'}
              className="tooltip"
            >
              <div className="mbl-click tooltip">
                <HabitsSettings />
              </div>
            </Tooltip>
          </Styled.PageHeader__Settings>
        </Styled.PageHeader>
      </Styled.PageContainer>

      <Styled.PageContent className="overflow">
        {error ? (
          <PageError>Couldn't get data, check your connection.</PageError>
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
      <Styled.PageAddItem
        onClick={() => setActiveContent(ModuleTypes.Habits)}
        data-test-id="add-habit"
      >
        <PlusIcon />
      </Styled.PageAddItem>
    </Styled.HabitsContainer>
  )
}
