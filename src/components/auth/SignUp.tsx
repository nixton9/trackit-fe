import React, { useState, useRef } from 'react'
import { SignInSignUpHeader } from '../misc/SignInSignUpHeader'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { Styled } from '../../styles/SignInSignUp.styles'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { SignInSignUpProps } from './SignIn'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const REGISTER = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
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
type SignUpData = {
  signup: {
    token: string
    user: {
      id_user: string
      name_user: string
      email_user: string
      image_user: string
    }
  }
}

const SignUp: React.FC<SignInSignUpProps> = ({ setToken, setUserInfo }) => {
  const [nameVal, setNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [formError, setFormError] = useState('')

  const passwordEl = useRef<HTMLInputElement>(null)
  const iconEl = useRef<SVGSVGElement>(null)

  const [register, { error, loading }] = useMutation<SignUpData>(REGISTER, {
    variables: { name: nameVal, email: emailVal, password: passwordVal }
  })

  const history = useHistory()

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

  const handleRegister = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()

    if (passwordVal.length < 6) {
      setFormError('Password needs to have at least 6 characters')
    } else {
      setFormError('')
      register()
        .then(results => {
          if (results && results.data && results.data.signup) {
            setToken(results.data.signup.token)
            setUserInfo({
              id: results.data.signup.user.id_user,
              name: results.data.signup.user.name_user,
              email: results.data.signup.user.email_user,
              image: results.data.signup.user.image_user
            })
            history.push('/')
          }
        })
        .catch(err => console.log(err))
    }
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
          Hey there, <br />
          <span>sign up to continue</span>
        </Styled.SignInSignUpText>

        <Styled.SignInSignUpForm
          onSubmit={handleRegister}
          className={loading ? 'loading' : ''}
        >
          <Styled.SignInSignUpForm__Input>
            <input
              type="text"
              placeholder="Name"
              value={nameVal}
              onChange={e => setNameVal(e.target.value)}
              required
              data-test-id="signup-name"
            />
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Input>
            <input
              type="email"
              placeholder="Email address"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
              required
              data-test-id="signup-email"
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
                required
                data-test-id="signup-pw"
              />
              <EyeIcon onClick={togglePasswordVisibility} ref={iconEl} />
            </div>
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Button>
            Sign Up
          </Styled.SignInSignUpForm__Button>
        </Styled.SignInSignUpForm>

        {error ? (
          <Styled.SignInSignUpMessage>
            <ErrorIcon />
            <p>{error.message}</p>
          </Styled.SignInSignUpMessage>
        ) : (
          formError && (
            <Styled.SignInSignUpMessage>
              <ErrorIcon />
              <p>{formError}</p>
            </Styled.SignInSignUpMessage>
          )
        )}
      </Styled.SignInSignUpContainer>
    </>
  )
}

export default SignUp
