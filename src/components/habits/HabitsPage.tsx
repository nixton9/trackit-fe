import React, { useState } from 'react'
import CalendarSingle from './CalendarSingle'
import CalendarAll from './CalendarAll'
import HabitsSettings from './HabitsSettings'
import { getCurrentStrike } from '../../utils/dateHelpers'
import { habits } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Habit } from '../../utils/ModuleTypes'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'

const HabitsPage: React.FC = () => {
  const [showAll] = useState(false)
  const [currHabit] = useState<Habit>(habits[0])

  return (
    <>
      <Styled.PageContainer>
        <Styled.PageTitle>Habits</Styled.PageTitle>

        <Styled.PageHeader>
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown>
              {showAll ? 'All' : currHabit.title}
              <ChevronIcon />
            </Styled.PageHeader__View__Dropdown>
            <Styled.PageHeader__View__Counter className="smaller">
              {showAll ? habits.length : getCurrentStrike(currHabit) + ' days'}
            </Styled.PageHeader__View__Counter>
          </Styled.PageHeader__View>
          <Styled.PageHeader__Settings>
            <HabitsSettings />
          </Styled.PageHeader__Settings>
        </Styled.PageHeader>
      </Styled.PageContainer>

      <Styled.PageContent>
        {showAll ? (
          <CalendarAll habits={habits} />
        ) : (
          <CalendarSingle habit={currHabit} />
        )}
      </Styled.PageContent>
    </>
  )
}

export default HabitsPage
