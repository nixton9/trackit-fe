import React, { useState, useEffect } from 'react'
import { PieGraph } from '../misc/PieGraph'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { ModuleTypes, Habit } from '../../utils/ModuleTypes'
import { habitsViewOptions } from '../../utils/selectsOptions'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { ReactComponent as HabitsIcon } from '../../assets/icons/habits.svg'
import Tooltip from 'react-tooltip-lite'
import { Link } from 'react-router-dom'
import { ApolloError } from '@apollo/client'
import {
  getSuccessfulDays,
  getNotSuccessfulDays,
  getTotalDays,
  getSuccessRate,
  getCurrentStreak,
  getLongestStreak,
  getHabitsPieChartData
} from '../../utils/statsHelpers'

type HabitsStatsProps = {
  data: { habits: Habit[] }
  error: ApolloError | undefined
  loading: boolean
  preSelectedHabit?: string | undefined
}

export const HabitsStats: React.FC<HabitsStatsProps> = ({
  data,
  error,
  loading,
  preSelectedHabit
}) => {
  const [selectedHabit, setSelectedHabit] = useState<string>('')

  const handleHabitChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedHabit(e.target.value)

  const currHabit = data
    ? data.habits.find(
        (habit: Habit) => Number(habit.id) === Number(selectedHabit)
      )
    : null

  const totalDays = getTotalDays(currHabit)
  const successfulDays = getSuccessfulDays(currHabit)
  const notSuccessfulDays = getNotSuccessfulDays(currHabit)
  const blankDays = totalDays - (successfulDays + notSuccessfulDays)
  const successRate = getSuccessRate(successfulDays, totalDays)
  const longestStreak = currHabit ? getLongestStreak(currHabit.days) : 0
  const currentStreak = currHabit ? getCurrentStreak(currHabit.days) : 0

  const startDate =
    currHabit && currHabit.date
      ? displayDateString(parseDateInverse(currHabit.date), true)
      : '-'

  const pieChartData = getHabitsPieChartData(
    currHabit,
    successfulDays,
    notSuccessfulDays,
    blankDays,
    totalDays
  )

  useEffect(() => {
    if (data && data.habits.length) {
      setSelectedHabit(
        preSelectedHabit ? preSelectedHabit : data.habits[0].id.toString()
      )
    }
  }, [data, preSelectedHabit])

  return (
    <Styled.PageContainer className="overflow page-container">
      <div className="page-header-wrapper">
        <Styled.PageTitle>Habits Stats</Styled.PageTitle>

        <Styled.PageHeader className="page-header">
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown className="habits">
              <SelectMenu
                id="habit-view"
                value={selectedHabit}
                onChange={handleHabitChange}
                options={habitsViewOptions(data, true)}
                itemClass={'view-select-item'}
              />
            </Styled.PageHeader__View__Dropdown>
          </Styled.PageHeader__View>

          <Styled.PageHeader__Settings>
            <Tooltip
              eventOff={'onClick'}
              content={'Habits'}
              arrow={false}
              direction={'up'}
              className="tooltip"
            >
              <Link to="/habits" className="mbl-click nomargin">
                <HabitsIcon />
              </Link>
            </Tooltip>
          </Styled.PageHeader__Settings>
        </Styled.PageHeader>
      </div>

      <Styled.PageContent className="desktop-grid habits">
        {error ? (
          <PageError>
            We're sorry but it seems there was a problem reaching the server.
          </PageError>
        ) : loading ? (
          <PageLoading />
        ) : data && data.habits.length === 0 ? (
          <Styled.SingleChart className="no-data">
            <p>There aren't any habits to analyse.</p>
          </Styled.SingleChart>
        ) : !currHabit?.days.length ? (
          <Styled.SingleChart className="no-data">
            <p>You haven't started tracking this habit yet.</p>
          </Styled.SingleChart>
        ) : (
          <>
            <Styled.SingleChart area="pie-chart" className="pie-chart">
              <Styled.SingleChart__Title>
                Days balance
              </Styled.SingleChart__Title>
              <Styled.SingleChart__Flex className="pie-chart-flex">
                <PieGraph data={pieChartData} type={ModuleTypes.Habits} />
                <Styled.SingleChart__CategoriesList>
                  {pieChartData.map(cat => (
                    <Styled.SingleChart__Category
                      bgColor={cat.color}
                      key={cat.name}
                    >
                      <div>
                        <p className="name">{cat.name}</p>
                        <p className="percentage">{cat.per}%</p>
                      </div>
                      <p className="value">{cat.value} days</p>
                    </Styled.SingleChart__Category>
                  ))}
                </Styled.SingleChart__CategoriesList>
              </Styled.SingleChart__Flex>
            </Styled.SingleChart>

            <Styled.SingleChart area="list">
              <Styled.SingleChart__Title>Other stats</Styled.SingleChart__Title>

              <Styled.SingleChart__TopExpenses>
                <Styled.SingleChart__Stat>
                  <p className="title">Success rate</p>{' '}
                  <p className="value">{successRate}</p>
                </Styled.SingleChart__Stat>
                <Styled.SingleChart__Stat>
                  <p className="title">Longest streak</p>{' '}
                  <p className="value">{longestStreak} days</p>
                </Styled.SingleChart__Stat>
                <Styled.SingleChart__Stat>
                  <p className="title">Current streak</p>{' '}
                  <p className="value">{currentStreak} days</p>
                </Styled.SingleChart__Stat>
                <Styled.SingleChart__Stat>
                  <p className="title">Days since start</p>{' '}
                  <p className="value">{totalDays} days</p>
                </Styled.SingleChart__Stat>
                <Styled.SingleChart__Stat>
                  <p className="title">Start date</p>{' '}
                  <p className="value">{startDate}</p>
                </Styled.SingleChart__Stat>
              </Styled.SingleChart__TopExpenses>
            </Styled.SingleChart>
          </>
        )}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}
