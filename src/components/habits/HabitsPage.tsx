import React from 'react'
import { activeContentState } from '../misc/Add'
import { HABITS } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import { HabitsList } from './HabitsList'
import { HabitsStats } from './HabitsStats'
import { useSetRecoilState } from 'recoil'
import { RouteComponentProps } from 'react-router-dom'

type MatchParams = {
  habit?: string
}

interface HabitsPageProps extends RouteComponentProps<MatchParams> {
  stats?: boolean
}

const HabitsPage: React.FC<HabitsPageProps> = ({ stats, match }) => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const { loading, error, data } = useQuery(HABITS)

  const selectedHabit = match.params.habit || undefined

  return stats ? (
    <HabitsStats
      data={data}
      error={error}
      loading={loading}
      preSelectedHabit={selectedHabit}
    />
  ) : (
    <HabitsList
      data={data}
      error={error}
      loading={loading}
      setActiveContent={setActiveContent}
    />
  )
}

export default HabitsPage
