import React, { useState, useEffect } from 'react'
import Drawer from '../misc/Drawer'
import { TypeEditor } from './TypeEditor'
import { SelectMenu } from '../misc/SelectMenu'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { Styled } from '../../styles/Settings.styles'
import { TYPES, EXPENSES } from '../../utils/queries'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg'
import {
  ExpenseType,
  Currencies,
  currencyOptions
} from '../../utils/ModuleTypes'
import { useSetRecoilState } from 'recoil'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const DELETE_TYPE = gql`
  mutation DeleteType($id: ID!) {
    deleteType(id: $id) {
      id_type
    }
  }
`

type ExpensesSettingsProps = {
  types: ExpenseType[]
  currency: Currencies
  setCurrency: (curr: Currencies) => void
}

const ExpensesSettings: React.FC<ExpensesSettingsProps> = ({
  types,
  currency,
  setCurrency
}) => {
  const [showTypeEditor, setShowTypeEditor] = useState(false)
  const [activeType, setActiveType] = useState<ExpenseType | null>(null)

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const history = useHistory()

  const [open, setOpen, overlayEl] = useToggleElement(() =>
    setShowTypeEditor(false)
  )

  const { refetch: refetchTypes } = useQuery(TYPES, {
    fetchPolicy: 'network-only'
  })
  const { refetch: refetchExpenses } = useQuery(EXPENSES)

  const [deleteType] = useMutation(DELETE_TYPE)

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value)
  }

  const handleTypeClick = (type: ExpenseType) => {
    setActiveType(type)
    setShowTypeEditor(true)
  }

  const handlePlusClick = () => {
    if (showTypeEditor) {
      setShowTypeEditor(false)
    } else {
      setActiveType(null)
      setShowTypeEditor(true)
    }
  }

  const handleDeleteType = (typeId: string | number, typeName: string) => {
    deleteType({
      variables: {
        id: typeId
      }
    })
      .then(res => {
        setNotification({
          text: `Category '${typeName}' was deleted`,
          type: NotificationTypes.Success
        })
        refetchTypes()
        refetchExpenses()
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const handleDeleteTypeConfirm = (
    typeId: string | number,
    typeName: string
  ) => {
    setShowTypeEditor(false)
    setAlert({
      text: 'This category will be removed',
      onConfirm: () => handleDeleteType(typeId, typeName)
    })
  }

  useEffect(() => {
    history.push(`#`)

    window.onpopstate = (e: any) => {
      setOpen(false)
    }
  }, [history, setOpen])

  return (
    <>
      <SettingsIcon
        className="settings-icon"
        onClick={() => setOpen(true)}
        data-test-id="expenses-settings-icon"
      />

      <Drawer
        title="Settings"
        open={open}
        setOpen={setOpen}
        overlayRef={overlayEl}
      >
        <>
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
            <Styled.SettingsBlock__Label>
              Categories
            </Styled.SettingsBlock__Label>
            <Styled.SettingsBlock__Categories>
              {types &&
                types.map(type => (
                  <Styled.SettingsBlock__Category
                    color={type.color}
                    key={type.id}
                  >
                    <div
                      className="inner"
                      onClick={() => handleTypeClick(type)}
                    >
                      {type.name}
                    </div>
                    <span
                      className="delete"
                      onClick={() =>
                        handleDeleteTypeConfirm(type.id, type.name)
                      }
                    >
                      +
                    </span>
                  </Styled.SettingsBlock__Category>
                ))}
              <Styled.SettingsBlock__Icon
                className="mbl-click"
                onClick={handlePlusClick}
                data-test-id="expenses-add-icon"
              >
                {showTypeEditor ? <MinusIcon /> : <PlusIcon />}
              </Styled.SettingsBlock__Icon>
            </Styled.SettingsBlock__Categories>
          </Styled.SettingsBlock>

          {showTypeEditor && (
            <TypeEditor
              type={activeType}
              closeEditor={() => setShowTypeEditor(false)}
            />
          )}
        </>
      </Drawer>
    </>
  )
}

export default ExpensesSettings
