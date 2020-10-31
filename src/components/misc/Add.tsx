import React, { useEffect } from 'react'
import Drawer from './Drawer'
import AddNote from '../notes/AddNote'
import AddTask from '../tasks/AddTask'
import AddHabit from '../habits/AddHabit'
import AddExpense from '../expenses/AddExpense'
import { useToggleElement } from '../../utils/useToggleElement'
import { ModuleTypes } from '../../utils/ModuleTypes'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../../assets/icons/tasks.svg'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import { ReactComponent as HabitsIcon } from '../../assets/icons/habits.svg'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { Styled } from '../../styles/Add.styles'
import { atom, useRecoilState } from 'recoil'

const notesTitle = 'Create a note'
const notesEditTitle = 'Edit note'
const tasksTitle = 'Create a task'
const tasksEditTitle = 'Edit task'
const expensesTitle = 'Add an expense'
const expensesEditTitle = 'Edit expense'
const habitsTitle = 'Add an habit'
const habitsEditTitle = 'Edit habit'

export type DrawerAddModuleProps = {
  closeModal: () => void
  isEdit: boolean
}

export const activeContentState: any = atom({
  key: 'activeContent',
  default: null
})

export const isEditState = atom({
  key: 'isEdit',
  default: false
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
  const [isEdit, setIsEdit] = useRecoilState(isEditState)

  const onClose = () =>
    setTimeout(() => {
      setActiveContent(null)
      setIsEdit(false)
    }, 500)

  const [open, setOpen, overlayEl] = useToggleElement(onClose)

  const closeModal = () => {
    setOpen(false)
    onClose()
  }

  useEffect(() => {
    if (activeContent) setOpen(true)
  }, [activeContent, setOpen])

  let drawerTitle
  let drawerContent

  switch (activeContent) {
    case ModuleTypes.Notes:
      drawerTitle = !isEdit ? notesTitle : notesEditTitle
      drawerContent = <AddNote closeModal={closeModal} isEdit={isEdit} />
      break

    case ModuleTypes.Tasks:
      drawerTitle = !isEdit ? tasksTitle : tasksEditTitle
      drawerContent = <AddTask closeModal={closeModal} isEdit={isEdit} />
      break

    case ModuleTypes.Expenses:
      drawerTitle = !isEdit ? expensesTitle : expensesEditTitle
      drawerContent = <AddExpense closeModal={closeModal} isEdit={isEdit} />
      break

    case ModuleTypes.Habits:
      drawerTitle = !isEdit ? habitsTitle : habitsEditTitle
      drawerContent = <AddHabit closeModal={closeModal} isEdit={isEdit} />
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
      <Drawer title={drawerTitle} open={open} overlayRef={overlayEl}>
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Add
