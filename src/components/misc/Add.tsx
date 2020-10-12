import React, { useEffect } from 'react'
import Drawer from './Drawer'
import AddNote from '../notes/AddNote'
import AddTask from '../tasks/AddTask'
import AddHabit from '../habits/AddHabit'
import AddExpense from '../expenses/AddExpense'
import { useToggleElement } from '../../utils/useToggleElement'
import { ModuleTypes } from '../../utils/ModuleTypes'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../../assets/icons/tasks.svg'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import { ReactComponent as HabitsIcon } from '../../assets/icons/habits.svg'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { Styled } from '../../styles/Add.styles'
import { atom, useRecoilState } from 'recoil'

const notesTitle = 'Create a note'
const tasksTitle = 'Create a task'
const expensesTitle = 'Add an expense'
const habitsTitle = 'Add an habit'

export type DrawerAddModuleProps = {
  closeModal: () => void
}

export const activeContentState: any = atom({
  key: 'activeContent',
  default: null
})

export const AddSubmitButton: React.FC<{ handleSubmit: () => void }> = ({
  handleSubmit
}) => (
  <Styled.AddWidget__Button onClick={handleSubmit}>
    <ChevronIcon />
  </Styled.AddWidget__Button>
)

const Add: React.FC = () => {
  const [activeContent, setActiveContent] = useRecoilState<any>(
    activeContentState
  )
  const onClose = () => setTimeout(() => setActiveContent(null), 500)

  const [open, setOpen, overlayEl] = useToggleElement(onClose)

  useEffect(() => {
    if (activeContent) setOpen(true)
  }, [activeContent, setOpen])

  let drawerTitle
  let drawerContent

  switch (activeContent) {
    case ModuleTypes.Notes:
      drawerTitle = notesTitle
      drawerContent = <AddNote closeModal={() => setOpen(false)} />
      break

    case ModuleTypes.Tasks:
      drawerTitle = tasksTitle
      drawerContent = <AddTask closeModal={() => setOpen(false)} />
      break

    case ModuleTypes.Expenses:
      drawerTitle = expensesTitle
      drawerContent = <AddExpense closeModal={() => setOpen(false)} />
      break

    case ModuleTypes.Habits:
      drawerTitle = habitsTitle
      drawerContent = <AddHabit closeModal={() => setOpen(false)} />
      break

    default:
      drawerTitle = 'What do you want to track?'
      drawerContent = (
        <>
          <Styled.AddButton onClick={() => setActiveContent(ModuleTypes.Notes)}>
            <span>{notesTitle}</span>
            <NotesIcon />
          </Styled.AddButton>

          <Styled.AddButton onClick={() => setActiveContent(ModuleTypes.Tasks)}>
            <span>{tasksTitle}</span>
            <TasksIcon />
          </Styled.AddButton>

          <Styled.AddButton
            onClick={() => setActiveContent(ModuleTypes.Expenses)}
          >
            <span>{expensesTitle}</span>
            <ExpensesIcon />
          </Styled.AddButton>

          <Styled.AddButton
            onClick={() => setActiveContent(ModuleTypes.Habits)}
          >
            <span>{habitsTitle}</span>
            <HabitsIcon />
          </Styled.AddButton>
        </>
      )
  }

  return (
    <>
      <Styled.AddIcon onClick={() => setOpen(true)}>
        <PlusIcon />
      </Styled.AddIcon>

      <Drawer title={drawerTitle} open={open} overlayRef={overlayEl}>
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Add
