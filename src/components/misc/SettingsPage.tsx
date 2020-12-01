import React, { useEffect, useState, useRef } from 'react'
import { UserHeader } from './UserHeader'
import { NotificationTypes, notificationState } from './Notification'
import { alertState } from './Alert'
import { Styled } from '../../styles/Page.styles'
import { User } from '../../utils/ModuleTypes'
import { UPDATE_USER_INFO, UPDATE_USER_PASSWORD } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { LoadingSpinner } from './LoadingSpinner'

type SettingsProps = {
  user: User
  refreshUserInfo: () => void
}

const SettingsPage: React.FC<SettingsProps> = ({ user, refreshUserInfo }) => {
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

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

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const imageFileRef = useRef<HTMLInputElement>(null)

  const updateUser = (img?: string, deleteImage?: boolean) => {
    updateUserInfo({
      variables: deleteImage
        ? { image: null }
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
      .finally(() => setIsLoadingProfile(false))
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
        .then(res => updateUser(res.secure_url))
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
    console.log(newPassword.length)
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

  const handleDeleteImage = () => {
    setAlert({
      text: 'Are you sure you want to remove your picture?',
      onConfirm: () => updateUser('', true)
    })
  }

  useEffect(() => {
    if (imageFileRef && imageFileRef.current) {
      imageFileRef.current.addEventListener('change', () => {
        const file = imageFileRef?.current?.files
          ? imageFileRef.current.files[0]
            ? imageFileRef.current.files[0].name
            : ''
          : ''
        setSelectedFile(file)
      })
    }
  }, [imageFileRef])

  return (
    <Styled.PageContainer>
      <UserHeader user={user} />

      <Styled.PageContent style={{ paddingLeft: '2rem', overflowX: 'hidden' }}>
        <Styled.Settings_Title>User Profile</Styled.Settings_Title>

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
                />
              </div>

              <div className="image">
                <div className="file-picker">
                  <input ref={imageFileRef} type="file" id="image-file" />
                  <label htmlFor="image-file">Change picture</label>
                  <small>{selectedFile}</small>
                </div>
                {user.image && (
                  <span onClick={handleDeleteImage}>Delete picture</span>
                )}
              </div>

              <Styled.SettingsButton
                onClick={updateProfile}
                disabled={
                  name === user.name &&
                  image === user.image &&
                  !Boolean(selectedFile)
                }
              >
                Apply changes
              </Styled.SettingsButton>
            </>
          )}
        </Styled.SettingsBlock>

        <Styled.Settings_Title className="second">
          Change Password
        </Styled.Settings_Title>

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
                />
              </div>

              <div className="new-password">
                <label>New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              <Styled.SettingsButton
                onClick={updateUserPW}
                disabled={!password || !newPassword}
              >
                Confirm
              </Styled.SettingsButton>
            </>
          )}
        </Styled.SettingsBlock>
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default SettingsPage
