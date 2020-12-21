import React, { useEffect } from 'react'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { Styled } from '../../styles/Notifications.styles'
import { useRecoilState, atom } from 'recoil'

export enum NotificationTypes {
  Error = 'Error',
  Success = 'Success',
  Blank = 'Blank',
  Null = 'Null'
}

export const notificationState: any = atom({
  key: 'notification',
  default: {
    text: '',
    type: NotificationTypes.Null,
    revertFunc: () => null
  }
})

export const Notification: React.FC = () => {
  const [notification, setNotification] = useRecoilState(notificationState)

  //@ts-ignore
  const { type, text, revert } = notification

  useEffect(() => {
    if (type !== NotificationTypes.Null) {
      let notificationTimer = setTimeout(
        () =>
          setNotification({
            text: '',
            type: NotificationTypes.Null,
            revertFun: () => null
          }),
        3500
      )

      return () => clearTimeout(notificationTimer)
    }
  }, [type, setNotification])

  if (type !== NotificationTypes.Null && text) {
    const Icon =
      type === NotificationTypes.Success ? <CheckIcon /> : <ErrorIcon />

    return (
      <Styled.NotificationContainer>
        <Styled.Notification>
          {type !== NotificationTypes.Blank && Icon}
          <p
            className={type !== NotificationTypes.Blank ? '' : 'extra-padding'}
          >
            {text}
          </p>
        </Styled.Notification>
        {revert && <Styled.UndoButton onClick={revert}>Undo</Styled.UndoButton>}
      </Styled.NotificationContainer>
    )
  } else {
    return null
  }
}
