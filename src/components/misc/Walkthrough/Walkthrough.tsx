import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { pagesSteps } from './steps'
import Joyride, { CallBackProps } from 'react-joyride'

export enum Pages {
  HOME = 'HOME',
  NOTES = 'NOTES',
  TASKS = 'TASKS',
  EXPENSES = 'EXPENSES',
  HABITS = 'HABITS',
  ADDNOTES = 'ADDNOTES',
  DETAILNOTE = 'DETAILNOTE'
}

type WalkthroughProps = {
  page: Pages
  setShow: Dispatch<SetStateAction<boolean>>
  selectLastButOneSingle?: boolean
}

export const Walkthrough: React.FC<WalkthroughProps> = ({
  page,
  setShow,
  selectLastButOneSingle
}) => {
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState(pagesSteps[page])

  const handleWTCallback = (data: CallBackProps) => {
    const { action } = data

    if (action === 'close') {
      setRun(false)
    }

    // If the user finishes this WT, we will make sure we never show it again by using this to handle Local Storage
    if (action === 'reset' || action === 'close' || action === 'skip') {
      setShow && setShow(false)
    }
  }

  useEffect(() => {
    if (selectLastButOneSingle) {
      const newSteps = [...steps]

      if (page === Pages.NOTES) {
        newSteps[1].target = '.single-note:nth-last-child(2)'
        setSteps(newSteps)
      } else if (page === Pages.TASKS) {
        newSteps[1].target = '.single-task:nth-last-child(2)'
        setSteps(newSteps)
      } else if (page === Pages.EXPENSES) {
        newSteps[1].target = '.single-expense:nth-last-child(2)'
        setSteps(newSteps)
      } else if (page === Pages.HABITS) {
        newSteps[2].target = '.single-habit:nth-last-child(2)'
        setSteps(newSteps)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectLastButOneSingle])

  return (
    <Joyride
      steps={steps}
      continuous
      showSkipButton={true}
      run={run}
      callback={handleWTCallback}
    />
  )
}
