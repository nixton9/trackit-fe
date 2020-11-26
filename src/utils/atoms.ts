import { atom } from 'recoil'

export const taskIdState = atom({
  key: 'taskId',
  default: ''
})

export const taskTitleState = atom({
  key: 'taskTitle',
  default: ''
})

export const taskCategoryState = atom({
  key: 'taskCategory',
  default: '0'
})

export const taskDateState = atom({
  key: 'taskDate',
  default: new Date()
})

export const taskDoneState = atom({
  key: 'taskDone',
  default: false
})

export const expenseIdState = atom({
  key: 'expenseId',
  default: ''
})

export const expenseValueState = atom<number | string | undefined>({
  key: 'expenseValue',
  default: undefined
})

export const expenseTitleState = atom({
  key: 'expenseTitle',
  default: ''
})

export const expenseTypeState = atom({
  key: 'expenseType',
  default: '0'
})

export const expenseDateState = atom({
  key: 'expenseDate',
  default: new Date()
})

export const habitIdState = atom({
  key: 'habitId',
  default: ''
})

export const habitTitleState = atom({
  key: 'habitTitle',
  default: ''
})
