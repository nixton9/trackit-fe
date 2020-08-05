import React, { useState } from 'react'
import Drawer from '../misc/Drawer'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ExpenseCategory } from '../../utils/ModuleTypes'

const currencyOptions = [
  { val: 'euro', label: 'Euro €' },
  { val: 'dollar', label: 'Dollar $' }
]

const fontSizeOptions = [
  { val: 'small', label: 'Small' },
  { val: 'medium', label: 'Medium' },
  { val: 'large', label: 'Large' }
]

type ExpensesSettingsProps = {
  categories: ExpenseCategory[]
}

const ExpensesSettings: React.FC<ExpensesSettingsProps> = ({ categories }) => {
  const [open, setOpen, overlayEl] = useToggleElement()
  const [currency, setCurrency] = useState('euro')
  const [fontSize, setFontSize] = useState('medium')

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrency(e.target.value)

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFontSize(e.target.value)

  return (
    <>
      <SettingsIcon className="settings-icon" onClick={() => setOpen(true)} />

      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
        <Styled.SettingsBlock>
          <Styled.SettingsBlock__Label htmlFor="currency">
            Currency
          </Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Input>
            <SelectMenu
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              options={currencyOptions}
            />
          </Styled.SettingsBlock__Input>
        </Styled.SettingsBlock>

        <Styled.SettingsBlock>
          <Styled.SettingsBlock__Label htmlFor="font-size">
            Font size
          </Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Input>
            <SelectMenu
              id="font-size"
              value={fontSize}
              onChange={handleFontSizeChange}
              options={fontSizeOptions}
            />
          </Styled.SettingsBlock__Input>
        </Styled.SettingsBlock>

        <Styled.SettingsBlock>
          <Styled.SettingsBlock__Label>Categories</Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Categories>
            {categories &&
              categories.map(cat => (
                <Styled.SettingsBlock__Category color={cat.color} key={cat.id}>
                  {cat.name}
                </Styled.SettingsBlock__Category>
              ))}
            <Styled.SettingsBlock__Icon>
              <PlusIcon />
            </Styled.SettingsBlock__Icon>
          </Styled.SettingsBlock__Categories>
        </Styled.SettingsBlock>
      </Drawer>
    </>
  )
}

export default ExpensesSettings
