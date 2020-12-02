import React, { useState, useRef } from 'react'
import { SignInSignUpHeader } from '../misc/SignInSignUpHeader'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { Styled } from '../../styles/SignInSignUp.styles'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { User } from '../../utils/ModuleTypes'
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id_user
        name_user
        email_user
        image_user
      }
      token
    }
  }
`

export type SignInSignUpProps = {
  setToken: (token: string) => void
  setUserInfo: (user: User) => void
}

type SignInData = {
  login: {
    token: string
    user: {
      id_user: string
      name_user: string
      email_user: string
      image_user: string
    }
  }
}

const SignIn: React.FC<SignInSignUpProps> = ({ setToken, setUserInfo }) => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')

  const passwordEl = useRef<HTMLInputElement>(null)
  const iconEl = useRef<SVGSVGElement>(null)

  const [login, { error, loading }] = useMutation<SignInData>(LOGIN, {
    variables: { email: emailVal, password: passwordVal }
  })

  const togglePasswordVisibility = () => {
    const input = passwordEl.current
    const icon = iconEl.current
    if (input && input.type === 'password') {
      input.type = 'text'
      icon?.classList.add('selected')
    } else if (input) {
      input.type = 'password'
      icon?.classList.remove('selected')
    }
  }

  const handleLogin = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    login()
      .then(results => {
        if (results && results.data && results.data.login) {
          setToken(results.data.login.token)
          setUserInfo({
            id: results.data.login.user.id_user,
            name: results.data.login.user.name_user,
            email: results.data.login.user.email_user,
            image: results.data.login.user.image_user
          })
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
          Welcome back, <br />
          <span>sign in to continue</span>
        </Styled.SignInSignUpText>

        <Styled.SignInSignUpForm
          onSubmit={handleLogin}
          className={loading ? 'loading' : ''}
        >
          <Styled.SignInSignUpForm__Input>
            <input
              type="email"
              placeholder="Email address"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
              data-test-id="signin-email"
            />
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Input>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={passwordVal}
                onChange={e => setPasswordVal(e.target.value)}
                ref={passwordEl}
                data-test-id="signin-pw"
              />
              <EyeIcon onClick={togglePasswordVisibility} ref={iconEl} />
            </div>
            <p>
              <Link to="/forgot">Forgot password?</Link>
            </p>
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Button>
            Login
          </Styled.SignInSignUpForm__Button>
        </Styled.SignInSignUpForm>

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

export default SignIn
