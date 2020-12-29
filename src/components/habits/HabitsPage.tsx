import React from 'react'
import { activeContentState } from '../misc/Add'
import { HABITS } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { HabitsList } from './HabitsList'
import { HabitsStats } from './HabitsStats'

type HabitsPageProps = {
  stats?: boolean
}

const HabitsPage: React.FC<HabitsPageProps> = ({ stats }) => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const { loading, error, data } = useQuery(HABITS)

  return stats ? (
    <HabitsStats data={data} error={error} loading={loading} />
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
