import React from 'react'
import { User } from '../../utils/ModuleTypes'
import styled from 'styled-components/macro'

type UserHeaderProps = {
  user: User
  small?: boolean
}

type UserWrapperProps = {
  small?: boolean
}

const UserWrapper = styled.div<UserWrapperProps>`
  display: flex;
  align-items: center;
  padding: ${props => (props.small ? '0 2rem' : '0')};
`

const UserImg = styled.img<UserWrapperProps>`
  border-radius: 50%;
  width: ${props => (props.small ? '4.5rem' : '6rem')};
  height: ${props => (props.small ? '4.5rem' : '6rem')};
  object-fit: cover;
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
    <UserWrapper small={small}>
      {user.image ? (
        <UserImg small={small} alt={user.name} src={user.image} />
      ) : (
        <UserDefaultImg small={small}>{user.name[0]}</UserDefaultImg>
      )}
      <UserInfo small={small}>
        <UserInfoName small={small}>{user.name}</UserInfoName>
        <UserInfoEmail small={small}>{user.email}</UserInfoEmail>
      </UserInfo>
    </UserWrapper>
  )
}
