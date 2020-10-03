import React from 'react'
import HomeWidget from './misc/HomeWidget'
import { LoadingSpinner } from './misc/LoadingSpinner'
import { Styled } from '../styles/Home.styles'
import { ModuleTypes, Expense, Task } from '../utils/ModuleTypes'
import { NOTES, TASKS, EXPENSES, HABITS } from '../utils/queries'
import { parseDate, isDateToday } from '../utils/dateHelpers'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../assets/icons/expenses.svg'
import { useQuery } from '@apollo/client'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

const Home: React.FC<{ userName: string }> = ({ userName }) => {
  const { loading: loadingNotes, error: errorNotes, data: notes } = useQuery(
    NOTES
  )

  const { loading: loadingTasks, error: errorTasks, data: tasks } = useQuery(
    TASKS
  )

  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: expenses
  } = useQuery(EXPENSES)

  const { loading: loadingHabits, error: errorHabits, data: habits } = useQuery(
    HABITS
  )

  const isLoading =
    loadingNotes || loadingTasks || loadingExpenses || loadingHabits

  const hasError = errorNotes || errorTasks || errorExpenses || errorHabits

  const currMonthExpensesVal = expenses
    ? expenses.expenses
        .filter((expense: Expense) =>
          isWithinInterval(parseDate(expense.date.substring(0, 10)), {
            start: startOfMonth(new Date()),
            end: endOfMonth(new Date())
          })
        )
        .reduce((acc: number, obj: Expense) => acc + obj.value, 0)
        .toFixed(0)
    : 0

  const tasksForToday = tasks
    ? tasks.tasks.filter((task: Task) =>
        isDateToday(task.date.substring(0, 10))
      ).length
    : 0

  return (
    <>
      <Styled.HomeLogo>Trackit</Styled.HomeLogo>

      <Styled.HomeContainer>
        <Styled.HomeText>
          Hello <strong>{userName}</strong>,<br />
          what will you track today?
        </Styled.HomeText>

        {isLoading ? (
          <Styled.HomeLoading>
            <LoadingSpinner />
          </Styled.HomeLoading>
        ) : hasError ? (
          <Styled.HomeError>Error loading data</Styled.HomeError>
        ) : (
          <Styled.HomeGrid>
            <HomeWidget
              type={ModuleTypes.Notes}
              value={notes.notes.length}
              label="created"
              url="/link"
              icon={<NotesIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Tasks}
              value={tasksForToday}
              label="for today"
              url="/link"
              icon={<TasksIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Habits}
              value={habits.habits.length}
              label="active"
              url="/link"
              icon={<HabitsIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Expenses}
              value={currMonthExpensesVal}
              label="this month"
              url="/link"
              icon={<ExpensesIcon />}
            />
          </Styled.HomeGrid>
        )}
      </Styled.HomeContainer>
    </>
  )
}

export default Home
