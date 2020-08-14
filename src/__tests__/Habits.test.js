import React from 'react'
import { render } from '@testing-library/react'
import HabitsPage from '../components/habits/HabitsPage'
import CalendarAll from '../components/habits/CalendarAll'
import CalendarSingle from '../components/habits/CalendarSingle'
import HabitsSettings from '../components/habits/HabitsSettings'
import { habits } from '../assets/fakeData'
import { format } from 'date-fns'

describe('Habits Page', () => {
  it('matches snapshot', () => {
    const { container } = render(<HabitsPage />)

    expect(container).toMatchSnapshot()
  })

  it('has the title', () => {
    const { getByText } = render(<HabitsPage />)

    expect(getByText('Habits')).toBeInTheDocument()
  })
})

describe('CalendarAll', () => {
  it('matches snapshot', () => {
    const { container } = render(<CalendarAll habits={habits} />)

    expect(container).toMatchSnapshot()
  })

  it('shows current month and year', () => {
    const { getByText } = render(<CalendarAll habits={habits} />)
    const currDate = format(new Date(), 'MMMM yyyy')

    expect(getByText(currDate)).toBeInTheDocument()
  })

  it('has all the habits', () => {
    const { getByText } = render(<CalendarAll habits={habits} />)

    habits.forEach(habit => {
      expect(getByText(habit.title)).toBeInTheDocument()
    })
  })
})

describe('CalendarSingle', () => {
  it('matches snapshot', () => {
    const { container } = render(<CalendarSingle habit={habits[0]} />)

    expect(container).toMatchSnapshot()
  })

  it('shows current month and year', () => {
    const { getByText } = render(<CalendarSingle habit={habits[0]} />)
    const currDate = format(new Date(), 'MMMM yyyy')

    expect(getByText(currDate)).toBeInTheDocument()
  })

  it('shows all days', () => {
    const { getAllByText } = render(<CalendarSingle habit={habits[0]} />)

    for (let i = 1; i < 31; i++) {
      expect(getAllByText(i.toString())).toBeTruthy()
    }
  })
})

describe('HabitsSettings', () => {
  it('matches snapshot', () => {
    const { container } = render(<HabitsSettings />)

    expect(container).toMatchSnapshot()
  })

  it('has all the fields', () => {
    const { getByText } = render(<HabitsSettings />)

    expect(getByText('Sort by')).toBeInTheDocument()
  })
})
