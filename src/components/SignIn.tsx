import React, { useState, useRef } from 'react'
import { SignInSignUpHeader } from './misc/SignInSignUpHeader'
import { Styled } from '../styles/SignInSignUp.styles'
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg'

const SignIn: React.FC = () => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const passwordEl = useRef<HTMLInputElement>(null)
  const iconEl = useRef<SVGSVGElement>(null)

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

  return (
    <>
      <SignInSignUpHeader />

      <Styled.SignInSignUpContainer>
        <Styled.SignInSignUpText>
          Welcome back, <br />
          <span>sign in to continue</span>
        </Styled.SignInSignUpText>

        <Styled.SignInSignUpForm>
          <Styled.SignInSignUpForm__Input>
            <input
              type="text"
              placeholder="Email address"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
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
              />
              <EyeIcon onClick={togglePasswordVisibility} ref={iconEl} />
            </div>
            <p>Forgot password?</p>
          </Styled.SignInSignUpForm__Input>

          <Styled.SignInSignUpForm__Button>
            Login
          </Styled.SignInSignUpForm__Button>
        </Styled.SignInSignUpForm>
      </Styled.SignInSignUpContainer>
    </>
  )
}

export default SignIn
