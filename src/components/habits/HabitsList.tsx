import React, { useState, Dispatch, SetStateAction } from 'react'
import CalendarContainer from './CalendarContainer'
import HabitsSettings from './HabitsSettings'
import Tooltip from 'react-tooltip-lite'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Walkthrough, Pages } from '../misc/Walkthrough/Walkthrough'
import { parseDateInverse } from '../../utils/dateHelpers'
import { getNextDayState, sortData } from '../../utils/globalHelpers'
import { getCurrentStreak } from '../../utils/statsHelpers'
import { Styled } from '../../styles/Page.styles'
import { ModuleTypes, Habit, DayState } from '../../utils/ModuleTypes'
import { SortBySettings } from '../../utils/SettingsTypes'
import { HABITS } from '../../utils/queries'
import { ADD_DAY_TO_HABIT, UPDATE_DAY } from '../../utils/mutations'
import { habitsViewOptions } from '../../utils/selectsOptions'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ReactComponent as StatsIcon } from '../../assets/icons/stats.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/add.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import ScrollLock from 'react-scrolllock'
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
  const [sortBy, setSortBy] = useState<SortBySettings>(
    SortBySettings.ALPHABETICAL
  )

  const [showHabWT, setShowHabWT] = useLocalStorage('showHabWT', true)

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

  const sortedHabits =
    data && data.habits ? (sortData(data.habits, sortBy) as Habit[]) : []

  const showWalkthrough = showHabWT && !error && !loading

  return (
    <>
      <ScrollLock />

      <Styled.HabitsContainer className="overflow overflow-calendar page-container">
        {showWalkthrough && (
          <Walkthrough
            page={Pages.HABITS}
            setShow={setShowHabWT}
            selectLastButOneSingle={sortedHabits.length > 1}
          />
        )}

        <Styled.PageContainer className="habits">
          <Styled.PageTitle>Habits</Styled.PageTitle>

          <Styled.PageHeader>
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
                <Styled.PageHeader__View__Counter className="smaller habits-counter">
                  {data
                    ? showAll
                      ? data.habits.length
                      : currHabit && getCurrentStreak(currHabit.days) + ' days'
                    : 0}
                </Styled.PageHeader__View__Counter>
              </Tooltip>
            </Styled.PageHeader__View>

            <Styled.PageHeader__Settings>
              {data && data.habits.length && (
                <Tooltip
                  eventOff={'onClick'}
                  content={'Stats'}
                  arrow={false}
                  direction={'up'}
                  className="tooltip"
                >
                  <Link
                    to={
                      showAll
                        ? `/habits/stats`
                        : `/habits/stats/${Number(view)}`
                    }
                    className="mbl-click"
                    data-test-id="habits-stats-link"
                  >
                    <StatsIcon className="stats-icon" />
                  </Link>
                </Tooltip>
              )}

              <Tooltip
                eventOff={'onClick'}
                content={'Settings'}
                arrow={false}
                direction={'up'}
                className="tooltip"
              >
                <div className="mbl-click tooltip">
                  <HabitsSettings sortBy={sortBy} setSortBy={setSortBy} />
                </div>
              </Tooltip>
            </Styled.PageHeader__Settings>
          </Styled.PageHeader>
        </Styled.PageContainer>

        {error ? (
          <Styled.PageContent>
            <PageError>
              We're sorry but it seems there was a problem reaching the server.
            </PageError>
          </Styled.PageContent>
        ) : loading ? (
          <Styled.PageContent>
            <PageLoading />
          </Styled.PageContent>
        ) : data.habits.length ? (
          <CalendarContainer
            showAll={showAll}
            sortedHabits={sortedHabits}
            currHabit={currHabit}
            handleDayClick={handleDayClick}
          />
        ) : (
          <Styled.PageContent__NoData>
            <NoDataIcon />
          </Styled.PageContent__NoData>
        )}
        <Styled.PageAddItem
          className="mbl-click"
          onClick={() => setActiveContent(ModuleTypes.Habits)}
          data-test-id="add-habit"
        >
          <PlusIcon className="add-habit-icon" />
        </Styled.PageAddItem>
      </Styled.HabitsContainer>
    </>
  )
}
