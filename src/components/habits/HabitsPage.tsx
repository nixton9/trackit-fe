import React, { useState } from 'react'
import CalendarSingle from './CalendarSingle'
import CalendarAll from './CalendarAll'
import HabitsSettings from './HabitsSettings'
import { SelectMenu } from '../misc/SelectMenu'
import { getCurrentStrike } from '../../utils/dateHelpers'
import { habits } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Habit } from '../../utils/ModuleTypes'

const HabitsPage: React.FC = () => {
  const [view, setView] = useState('all')

  const viewOptions = [
    { val: 'all', label: 'All' },
    ...habits.map(habit => ({
      val: habit.id,
      label: habit.title
    }))
  ]

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const showAll = view === 'all'
  const currHabit = showAll
    ? null
    : habits.find(habit => habit.id === parseInt(view, 10))

  return (
    <>
      <Styled.PageContainer>
        <Styled.PageTitle>Habits</Styled.PageTitle>

        <Styled.PageHeader>
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown>
              <SelectMenu
                id="habits-view"
                value={view}
                onChange={handleViewChange}
                options={viewOptions}
                itemClass={'view-select-item'}
              />
            </Styled.PageHeader__View__Dropdown>
            <Styled.PageHeader__View__Counter className="smaller">
              {showAll
                ? habits.length
                : currHabit && getCurrentStrike(currHabit) + ' days'}
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
          currHabit && <CalendarSingle habit={currHabit} />
        )}
      </Styled.PageContent>
    </>
  )
}

export default HabitsPage
