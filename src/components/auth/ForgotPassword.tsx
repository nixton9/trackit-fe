import React, { useState } from 'react'
import { SignInSignUpHeader } from '../misc/SignInSignUpHeader'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { Styled } from '../../styles/SignInSignUp.styles'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation } from '@apollo/client'

const SUBMIT_PASSWORD_RESET = gql`
  mutation SubmitPasswordReset($email: String!) {
    submitPasswordReset(email: $email) {
      resetToken
    }
  }
`

type SubmitPwData = {
  submitPasswordReset: {
    resetToken: string
  }
}

const ForgotPassword: React.FC = () => {
  const [emailVal, setEmailVal] = useState('')
  const [message, setMessage] = useState('')

  const [submitPwReset, { error, loading }] = useMutation<SubmitPwData>(
    SUBMIT_PASSWORD_RESET,
    {
      variables: { email: emailVal }
    }
  )

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    submitPwReset()
      .then(results => {
        console.log(results)
        if (results && results.data && results.data.submitPasswordReset) {
          setMessage(
            'Check your email inbox, we have sent you a password reset link.'
          )
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
          Reset your password here, <br />
          <span>just type your email</span>
        </Styled.SignInSignUpText>

        <Styled.SignInSignUpForm
          onSubmit={handleSubmit}
          className={loading ? 'loading' : ''}
        >
          <Styled.SignInSignUpForm__Input>
            <input
              type="email"
              placeholder="Email address"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
            />
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Button>
            Send
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

export default ForgotPassword
