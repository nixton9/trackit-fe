import React, { useState, useEffect } from 'react'
import { UserHeader } from './UserHeader'
import { NotificationTypes, notificationState } from './Notification'
import { alertState } from './Alert'
import { ToggleButton } from './ToggleButton'
import { Styled } from '../../styles/Page.styles'
import { User } from '../../utils/ModuleTypes'
import { useLocalStorage } from '../../utils/useLocalStorage'
import {
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_NOT_TOKEN
} from '../../utils/mutations'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { askNotificationPermission } from '../../push-notification'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'
import { useMutation } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { LoadingSpinner } from './LoadingSpinner'

type SettingsProps = {
  user: User
  refreshUserInfo: () => void
  isDarkTheme: boolean
  setIsDarkTheme: (checked: boolean) => void
  isIos?: boolean
}

const SettingsPage: React.FC<SettingsProps> = ({
  user,
  refreshUserInfo,
  isDarkTheme,
  setIsDarkTheme,
  isIos
}) => {
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  const [notToken, setNotToken] = useLocalStorage('notToken', '')
  const [showHomeWT, setShowHomeWT] = useLocalStorage('showHomeWT', false)
  const [showNotesWT, setShowNotesWT] = useLocalStorage('showNotesWT', false)
  const [showTasksWT, setShowTasksWT] = useLocalStorage('showTasksWT', false)
  const [showExpWT, setShowExpWT] = useLocalStorage('showExpWT', false)
  const [showHabWT, setShowHabWT] = useLocalStorage('showHabWT', false)
  const [showDetailNoteWT, setShowDetailNoteWT] = useLocalStorage(
    'showDetailNoteWT',
    false
  )
  const [showAddNotesWT, setShowAddNotesWT] = useLocalStorage(
    'showAddNotesWT',
    false
  )

  const [updateUserInfo, { loading: loadingUserInfo }] = useMutation(
    UPDATE_USER_INFO
  )

  const [updateUserPassword, { loading: loadingPassword }] = useMutation(
    UPDATE_USER_PASSWORD,
    {
      variables: {
        password: password,
        newPassword: newPassword
      }
    }
  )

  const [updateNotificationToken, { loading: loadingUserNot }] = useMutation(
    UPDATE_USER_NOT_TOKEN
  )

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const updateUser = (img?: string, deleteImage?: boolean) => {
    updateUserInfo({
      variables: deleteImage
        ? { image: null, imgToDelete: img }
        : {
            name: name || undefined,
            image: img || image || undefined
          }
    })
      .then(res => {
        const { id, name, email, image } = res.data.updateUserInfo
        const updatedUser = { id, name, email, image }
        window.localStorage.setItem('user', JSON.stringify(updatedUser))
        refreshUserInfo()
        setNotification({
          text: `Info updated successfully`,
          type: NotificationTypes.Success
        })
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
      .finally(() => {
        setIsLoadingProfile(false)
        setSelectedFile('')
      })
  }

  const updateProfile = () => {
    setIsLoadingProfile(true)
    //@ts-ignore
    const { files } = document.querySelector('input[type="file"]')
    if (files.length) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('upload_preset', 'trckr-preset')
      const options = {
        method: 'POST',
        body: formData
      }

      return fetch(
        'https://api.Cloudinary.com/v1_1/trckr/image/upload',
        options
      )
        .then(res => res.json())
        .then(res => updateUser(res.public_id))
        .catch(err =>
          setNotification({
            text: 'There was a problem, please try again.',
            type: NotificationTypes.Error
          })
        )
    } else {
      updateUser()
    }
  }

  const updateUserPW = () => {
    if (newPassword.length < 6) {
      setNotification({
        text: 'New password needs to have at least 6 characters',
        type: NotificationTypes.Error
      })
      return
    }
    updateUserPassword()
      .then(res => {
        setNotification({
          text: `Password updated successfully`,
          type: NotificationTypes.Success
        })
        setPassword('')
        setNewPassword('')
      })
      .catch(err => {
        setNotification({
          text: err.message,
          type: NotificationTypes.Error
        })
        setPassword('')
        setNewPassword('')
      })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0].name : ''
    if (file.length > 10) {
      const split = file.split('.')
      setSelectedFile(split[0].substring(0, 10) + '...' + split[1])
    } else {
      setSelectedFile(file)
    }
  }

  const handleDeleteImage = () => {
    setAlert({
      text: 'Are you sure you want to remove your picture?',
      onConfirm: () => {
        updateUser(image, true)
      }
    })
  }

  const showWalkthrough = (show: boolean) => {
    setShowHomeWT(show)
    setShowNotesWT(show)
    setShowTasksWT(show)
    setShowExpWT(show)
    setShowHabWT(show)
    setShowDetailNoteWT(show)
    setShowAddNotesWT(show)
    setNotification({
      text: show
        ? `You will now see the walkthrough on each page`
        : `Walkthrough was disabled`,
      type: NotificationTypes.Success
    })
  }

  const updateUserNotification = (token?: string, disable?: boolean) => {
    const keyword = disable ? 'off' : 'on'

    updateNotificationToken({ variables: { token: token, disable: disable } })
      .then(() => {
        setNotToken(disable || !token ? null : token)
        setNotification({
          text: `Notifications have been turned ${keyword}!`,
          type: NotificationTypes.Success
        })
      })
      .catch(err =>
        setNotification({
          text: `There was a problem turning ${keyword} the notifications, please try again`,
          type: NotificationTypes.Error
        })
      )
  }

  const handleNotificationPermission = (e: any, disable?: boolean) => {
    if (disable) {
      updateUserNotification('', true)
    } else {
      askNotificationPermission().then(res => {
        if (res instanceof Error) {
          const isBrowserError = res.message.includes("browser doesn't support")
          setNotification({
            text: isBrowserError
              ? "It seems like this browser doesn't support notifications."
              : 'There was a problem enabling notifications, please try again later.',
            type: NotificationTypes.Error
          })
        } else if (typeof res === 'string') {
          updateUserNotification(res)
        }
      })
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setImage(user.image)
    }
  }, [user])

  const isWalkthroughOn =
    showNotesWT &&
    showTasksWT &&
    showExpWT &&
    showHabWT &&
    showHomeWT &&
    showDetailNoteWT &&
    showAddNotesWT

  return (
    <>
      <ScrollLock />
      <Styled.PageContainer className="overflow page-container">
        <div className="page-header-wrapper">
          <UserHeader user={user} />
        </div>

        <TouchScrollable>
          <Styled.PageContent className="settings-page">
            <Styled.Settings__Title>User Profile</Styled.Settings__Title>

            <Styled.SettingsBlock>
              {isLoadingProfile || loadingUserInfo ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      data-test-id="profile-name-input"
                    />
                  </div>

                  <div className="image">
                    <div className="file-picker">
                      <input
                        type="file"
                        id="image-file"
                        onChange={handleChangeImage}
                      />
                      <button className="inline-btn word">
                        <label htmlFor="image-file">
                          Change picture <PlusIcon />
                        </label>
                      </button>
                      <small>{selectedFile}</small>
                    </div>
                    {user.image && (
                      <button
                        className="inline-btn word"
                        onClick={handleDeleteImage}
                      >
                        <span>
                          Delete picture <TrashIcon />
                        </span>
                      </button>
                    )}
                  </div>

                  <Styled.SettingsButton
                    onClick={updateProfile}
                    disabled={
                      name === user.name &&
                      image === user.image &&
                      !Boolean(selectedFile)
                    }
                    data-test-id="change-profile-button"
                  >
                    Apply changes
                  </Styled.SettingsButton>
                </>
              )}
            </Styled.SettingsBlock>

            <Styled.Settings__Title>Change Password</Styled.Settings__Title>

            <Styled.SettingsBlock>
              {loadingPassword ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div>
                    <label>Current password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="********"
                      data-test-id="profile-password-input"
                    />
                  </div>

                  <div className="new-password">
                    <label>New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="********"
                      data-test-id="profile-newpassword-input"
                    />
                  </div>

                  <Styled.SettingsButton
                    onClick={updateUserPW}
                    disabled={!password || !newPassword}
                    data-test-id="change-password-button"
                  >
                    Confirm
                  </Styled.SettingsButton>
                </>
              )}
            </Styled.SettingsBlock>

            <Styled.Settings__Title>Other Settings</Styled.Settings__Title>

            <Styled.SettingsBlock className="cols-3">
              {loadingUserNot ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div className="notifications">
                    <label>Push Notifications</label>
                    <ToggleButton
                      isChecked={Boolean(notToken)}
                      setIsChecked={e =>
                        handleNotificationPermission(e, Boolean(notToken))
                      }
                    />
                  </div>

                  <div className="walkthrough">
                    <label>Show walkthrough</label>
                    <ToggleButton
                      isChecked={isWalkthroughOn}
                      setIsChecked={showWalkthrough}
                    />
                  </div>

                  <div className="theme">
                    <label>Dark theme</label>
                    <ToggleButton
                      isChecked={isDarkTheme}
                      setIsChecked={setIsDarkTheme}
                    />
                  </div>
                </>
              )}
            </Styled.SettingsBlock>

            <Styled.Settings__Title>Support</Styled.Settings__Title>

            <Styled.SettingsBlock className="no-grid text-block">
              <p>
                Having a problem with the app? Or would you like to request a
                new feature? Just shoot me a message{' '}
                <a href="mailto:eduardojoaoaraujo@gmail.com?subject=TRCKR Support">
                  here
                </a>
              </p>
            </Styled.SettingsBlock>

            <Styled.Settings__Title className="half-margin">
              Author
            </Styled.Settings__Title>

            <Styled.SettingsBlock className="no-grid text-block">
              <p>
                This app was made with{' '}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{' '}
                by{' '}
                <a href="https://www.eduardo-araujo.com/" target="blank">
                  Eduardo Araújo
                </a>
                . Enjoying the app? Consider buying me a cup of coffe{' '}
                <a href="https://paypal.me/eduardoaraujo9" target="blank">
                  here
                </a>
                !
              </p>
            </Styled.SettingsBlock>
          </Styled.PageContent>
        </TouchScrollable>
      </Styled.PageContainer>
    </>
  )
}

export default SettingsPage
