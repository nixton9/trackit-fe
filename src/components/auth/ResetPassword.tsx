import React, { useState } from 'react'
import { SignInSignUpHeader } from '../misc/SignInSignUpHeader'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { Styled } from '../../styles/SignInSignUp.styles'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router'

const RESET_PASSWORD = gql`
  mutation resetPassword(
    $email: String!
    $resetToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetToken: $resetToken
      newPassword: $newPassword
    ) {
      id_user
    }
  }
`

type ResetPwData = {
  resetPassword: {
    id_user: string
  }
}

const ResetPassword: React.FC = () => {
  const [passwordVal, setPasswordVal] = useState('')
  const [message, setMessage] = useState('')

  const { email, token } = useParams()

  const [resetPw, { error, loading }] = useMutation<ResetPwData>(
    RESET_PASSWORD,
    {
      variables: {
        email: email,
        resetToken: token,
        newPassword: passwordVal
      }
    }
  )

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    resetPw()
      .then(results => {
        if (results && results.data && results.data.resetPassword) {
          setMessage('Your password was updated successfully.')
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <SignInSignUpHeader />

      <Styled.SignInSignUpContainer>
        {loading && (
          <Styled.SignInSignUpLoading>
            <LoadingSpinner />
          </Styled.SignInSignUpLoading>
        )}

        <Styled.SignInSignUpText>
          Set your new password,
          <br />
          <span>make it sticky this time</span>
        </Styled.SignInSignUpText>

        <Styled.SignInSignUpForm
          onSubmit={handleSubmit}
          className={loading ? 'loading' : ''}
        >
          <Styled.SignInSignUpForm__Input>
            <input
              type="password"
              placeholder="Password"
              value={passwordVal}
              onChange={e => setPasswordVal(e.target.value)}
            />
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Button>
            Update
          </Styled.SignInSignUpForm__Button>
        </Styled.SignInSignUpForm>

        {message && (
          <Styled.SignInSignUpMessage>
            <CheckIcon />
            <p>{message}</p>
          </Styled.SignInSignUpMessage>
        )}

        {error && (
          <Styled.SignInSignUpMessage>
            <ErrorIcon />
            <p>{error.message}</p>
          </Styled.SignInSignUpMessage>
        )}
      </Styled.SignInSignUpContainer>
    </>
  )
}

export default ResetPassword
