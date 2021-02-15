import React, { useEffect } from 'react'
import HomeWidget from './misc/HomeWidget'
import { LoadingSpinner } from './misc/LoadingSpinner'
import { PageError } from './misc/PageError'
import { Walkthrough, Pages } from './misc/Walkthrough/Walkthrough'
import { alertState } from './misc/Alert'
import { Styled } from '../styles/Home.styles'
import { ModuleTypes, Expense, Task } from '../utils/ModuleTypes'
import { NOTES, TASKS, EXPENSES, HABITS } from '../utils/queries'
import { UPDATE_USER_NOT_TOKEN } from '../utils/mutations'
import { parseDate, isDateToday, parseDateInverse } from '../utils/dateHelpers'
import { formatUserName } from '../utils/globalHelpers'
import { useLocalStorage } from '../utils/useLocalStorage'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../assets/icons/expenses.svg'
import { askNotificationPermission } from '../push-notification'
import ScrollLock from 'react-scrolllock'
import { useQuery, useMutation } from '@apollo/client'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useSetRecoilState } from 'recoil'

type HomeProps = {
  userName: string
  newVersionAvailable: boolean
  updateServiceWorker: () => void
}

const Home: React.FC<HomeProps> = ({
  userName,
  newVersionAvailable,
  updateServiceWorker
}) => {
  const [showHomeWT, setShowHomeWT] = useLocalStorage('showHomeWT', true)
  const [notToken, setNotToken] = useLocalStorage('notToken', '')

  const setAlert = useSetRecoilState(alertState)

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

  const [updateNotificationToken] = useMutation(UPDATE_USER_NOT_TOKEN)

  const isLoading =
    loadingNotes || loadingTasks || loadingExpenses || loadingHabits

  const hasError = errorNotes || errorTasks || errorExpenses || errorHabits

  useEffect(() => {
    if (!notToken) {
      askNotificationPermission().then(res => {
        if (typeof res === 'string') {
          updateNotificationToken({
            variables: { token: res, disable: false }
          }).then(() => {
            setNotToken(res)
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (newVersionAvailable && !showHomeWT && !isLoading && !hasError) {
      setAlert({
        text:
          'A new version of the app is available. Do you wish to update it?',
        onConfirm: updateServiceWorker
      })
    }
  }, [
    newVersionAvailable,
    showHomeWT,
    isLoading,
    hasError,
    setAlert,
    updateServiceWorker
  ])

  const currMonthExpensesVal = expenses
    ? expenses.expenses
        .filter((expense: Expense) =>
          isWithinInterval(parseDate(parseDateInverse(expense.date)), {
            start: startOfMonth(new Date()),
            end: endOfMonth(new Date())
          })
        )
        .reduce((acc: number, obj: Expense) => acc + obj.value, 0)
        .toFixed(0)
    : 0

  const tasksForToday = tasks
    ? tasks.tasks.filter((task: Task) =>
        task.date ? isDateToday(parseDateInverse(task.date)) : false
      ).length
    : 0

  const showWalkthrough = showHomeWT && !hasError && !isLoading

  return (
    <>
      <ScrollLock />

      {showWalkthrough && (
        <Walkthrough page={Pages.HOME} setShow={setShowHomeWT} />
      )}

      <Styled.HomeLogo>Trckr</Styled.HomeLogo>

      <Styled.HomeContainer>
        <Styled.HomeText>
          Hello <strong>{userName && formatUserName(userName)}</strong>,<br />
          what will you track today?
        </Styled.HomeText>

        {isLoading ? (
          <Styled.HomeLoading>
            <LoadingSpinner />
          </Styled.HomeLoading>
        ) : hasError ? (
          <PageError>
            We're sorry but it seems there was a problem reaching the server.
          </PageError>
        ) : (
          <Styled.HomeGrid>
            <HomeWidget
              type={ModuleTypes.Notes}
              value={notes.notes.length}
              label="created"
              icon={<NotesIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Tasks}
              value={tasksForToday}
              label="for today"
              icon={<TasksIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Habits}
              value={habits.habits.length}
              label="active"
              icon={<HabitsIcon />}
            />
            <HomeWidget
              type={ModuleTypes.Expenses}
              value={currMonthExpensesVal}
              label="this month"
              icon={<ExpensesIcon />}
            />
          </Styled.HomeGrid>
        )}
      </Styled.HomeContainer>
    </>
  )
}

export default Home
