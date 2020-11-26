import React from 'react'
import { Styled } from '../../styles/SignInSignUp.styles'
import { NavLink } from 'react-router-dom'

export const SignInSignUpHeader: React.FC = () => {
  return (
    <Styled.SignInSignUpHeader>
      <Styled.SignInSignUpHeader__Logo>Trckr</Styled.SignInSignUpHeader__Logo>
      <Styled.SignInSignUpHeader__Items>
        <NavLink exact to="/" activeClassName="active">
          Sign In
        </NavLink>
        <NavLink to="/signup" activeClassName="active">
          Register
        </NavLink>
      </Styled.SignInSignUpHeader__Items>
    </Styled.SignInSignUpHeader>
  )
}
