import React from 'react'
import HomeWidget from './misc/HomeWidget'
import { LoadingSpinner } from './misc/LoadingSpinner'
import { PageError } from './misc/PageError'
import { Walkthrough, Pages } from './misc/Walkthrough/Walkthrough'
import { NotificationTypes, notificationState } from './misc/Notification'
import { Styled } from '../styles/Home.styles'
import { ModuleTypes, Expense, Task } from '../utils/ModuleTypes'
import { UPDATE_USER_NOT_TOKEN } from '../utils/mutations'
import { NOTES, TASKS, EXPENSES, HABITS } from '../utils/queries'
import { parseDate, isDateToday, parseDateInverse } from '../utils/dateHelpers'
import { formatUserName } from '../utils/globalHelpers'
import { useLocalStorage } from '../utils/useLocalStorage'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../assets/icons/expenses.svg'
import { askNotificationPermission } from '../push-notification'
import { useQuery, useMutation } from '@apollo/client'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useSetRecoilState } from 'recoil'

const Home: React.FC<{ userName: string }> = ({ userName }) => {
  const [showHomeWT, setShowHomeWT] = useLocalStorage('showHomeWT', true)
  const [notToken, setNotToken] = useLocalStorage('notToken', '')

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

  const setNotification = useSetRecoilState(notificationState)

  const handleNotificationPermission = () => {
    askNotificationPermission().then(token =>
      updateNotificationToken({ variables: { token: token } })
        .then(() => {
          setNotToken(token)
          setNotification({
            text: `Notifications have been turned on!`,
            type: NotificationTypes.Success
          })
        })
        .catch(err =>
          setNotification({
            text:
              'There was a problem turning on the notifications, please try again',
            type: NotificationTypes.Error
          })
        )
    )
  }

  const isLoading =
    loadingNotes || loadingTasks || loadingExpenses || loadingHabits

  const hasError = errorNotes || errorTasks || errorExpenses || errorHabits

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
        <button onClick={handleNotificationPermission}>notificação</button>
      </Styled.HomeContainer>
    </>
  )
}

export default Home
