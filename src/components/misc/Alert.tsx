import React from 'react'
import { Styled } from '../../styles/Notifications.styles'
import { useRecoilState, atom } from 'recoil'

export const alertState: any = atom({
  key: 'alert',
  default: {
    text: '',
    onConfirm: undefined
  }
})

export const Alert: React.FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)

  const { text, onConfirm } = alert

  if (text && onConfirm) {
    const close = () => {
      setAlert({ text: '', onConfirm: undefined })
    }

    const handleConfirm = () => {
      onConfirm()
      close()
    }

    return (
      <Styled.NotificationContainer>
        <Styled.Alert>
          <p>{text}</p>
          <Styled.Alert__Buttons>
            <button className="confirm" onClick={handleConfirm}>
              Do it
            </button>
            <button onClick={close}>Cancel</button>
          </Styled.Alert__Buttons>
        </Styled.Alert>
      </Styled.NotificationContainer>
    )
  } else {
    return null
  }
}
