import React from 'react'
import HomeWidget from './misc/HomeWidget'
import { Styled } from '../styles/Home.styles'
import { ModuleTypes } from '../utils/ModuleTypes'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../assets/icons/expenses.svg'

const Home: React.FC = () => {
  return (
    <>
      <Styled.HomeLogo>Trackit</Styled.HomeLogo>

      <Styled.HomeContainer>
        <Styled.HomeText>
          Hello <strong>Eduardo</strong>,<br />
          what will you track today?
        </Styled.HomeText>

        <Styled.HomeGrid>
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
        </Styled.HomeGrid>
      </Styled.HomeContainer>
    </>
  )
}

export default Home
