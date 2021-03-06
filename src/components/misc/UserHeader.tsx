import React from 'react'
import { User } from '../../utils/ModuleTypes'
import { formatFullUserName } from '../../utils/globalHelpers'
import styled from 'styled-components/macro'

type UserHeaderProps = {
  user: User
  small?: boolean
}

type UserWrapperProps = {
  small?: boolean
}

const CLOUDINARY_URL =
  'https://res.cloudinary.com/trckr/image/upload/v1607329597/'

const UserWrapper = styled.div<UserWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${props => (props.small ? '0 2rem' : '0')};
`

const UserImg = styled.div<UserWrapperProps>`
  border-radius: 50%;
  width: ${props => (props.small ? '4.5rem' : '6rem')};
  height: ${props => (props.small ? '4.5rem' : '6rem')};
  min-width: ${props => (props.small ? '4.5rem' : '6rem')};
  background-size: cover;
  background-position: center center;
`

const UserDefaultImg = styled.div<UserWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.small ? '4.5rem' : '6rem')};
  height: ${props => (props.small ? '4.5rem' : '6rem')};
  font-size: ${props => (props.small ? '2rem' : '2.7rem')};
  font-weight: ${props => props.theme.fontSemiBold};
  color: ${props => props.theme.alwaysWhite};
  background-color: ${props => props.theme.accent};
  text-transform: uppercase;
  border-radius: 50%;
`

const UserInfo = styled.div<UserWrapperProps>`
  margin-left: ${props => (props.small ? '1.5rem' : '2.5rem')};
`

const UserInfoName = styled.h3<UserWrapperProps>`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontRegular};
  font-size: ${props => (props.small ? '1.8rem' : '2.9rem')};
`

const UserInfoEmail = styled.p<UserWrapperProps>`
  color: ${props => props.theme.grey};
  font-weight: ${props => props.theme.fontSemiBold};
  font-size: ${props => (props.small ? '1.1rem' : '1.6rem')};
`

export const UserHeader: React.FC<UserHeaderProps> = ({ user, small }) => {
  return (
    <UserWrapper
      small={small}
      className={small ? 'user-header-small' : 'user-header'}
    >
      {user.image ? (
        <UserImg
          small={small}
          style={{ backgroundImage: `url(${CLOUDINARY_URL}${user.image})` }}
        />
      ) : (
        <UserDefaultImg small={small}>{user.name[0]}</UserDefaultImg>
      )}
      <UserInfo small={small}>
        <UserInfoName small={small}>
          {formatFullUserName(user.name)}
        </UserInfoName>
        <UserInfoEmail small={small}>{user.email}</UserInfoEmail>
      </UserInfo>
    </UserWrapper>
  )
}
