import React from 'react'
import HomeWidget from './misc/HomeWidget'
import { ModuleTypes } from '../utils/ModuleTypes'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../assets/icons/expenses.svg'

const Home: React.FC = () => {
  return (
    <div
      style={{
        width: '90%',
        margin: '150px auto 0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '3rem'
      }}
    >
      <HomeWidget
        type={ModuleTypes.Notes}
        value="32"
        label="created"
        url="/link"
        icon={<NotesIcon />}
      />
      <HomeWidget
        type={ModuleTypes.Tasks}
        value="7"
        label="for today"
        url="/link"
        icon={<TasksIcon />}
      />
      <HomeWidget
        type={ModuleTypes.Habits}
        value="2"
        label="active"
        url="/link"
        icon={<HabitsIcon />}
      />
      <HomeWidget
        type={ModuleTypes.Expenses}
        value="454"
        label="this month"
        url="/link"
        icon={<ExpensesIcon />}
      />
    </div>
  )
}

export default Home
