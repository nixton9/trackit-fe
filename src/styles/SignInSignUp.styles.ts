import styled from 'styled-components'

const SignInSignUpHeader = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: ${props => props.theme.spacingS} auto ${props => props.theme.spacingL}
    auto;
`

const SignInSignUpHeader__Logo = styled.h1`
  color: ${props => props.theme.white};
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: ${props => props.theme.fontBold};
`

const SignInSignUpHeader__Items = styled.div`
  a {
    color: ${props => props.theme.greyishBlue};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontMedium};
    margin-left: ${props => props.theme.spacingXS};

    &.active {
      color: ${props => props.theme.white};
      font-weight: ${props => props.theme.fontSemiBold};
    }
  }
`

const SignInSignUpContainer = styled.div`
  width: 75%;
  margin: 0 auto;
  position: relative;
`

const SignInSignUpText = styled.h2`
  color: ${props => props.theme.white};
  font-size: 3.7rem;
  line-height: 5.2rem;
  font-weight: ${props => props.theme.fontSemiBold};

  span {
    color: ${props => props.theme.greyishBlue};
    font-size: inherit;
  }
`

const SignInSignUpForm = styled.form`
  margin-top: ${props => props.theme.spacingL};
  text-align: center;
  transition: all 0.7s ease;

  &.loading {
    filter: blur(3px);
    opacity: 0.5;
  }
`

const SignInSignUpForm__Input = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacingM};

  .input-wrapper {
    position: relative;
  }

  input {
    width: 100%;
    height: 6rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    background-color: ${props => props.theme.greyishBlue};
    border: none;
    color: ${props => props.theme.white};
    font-size: 1.4rem;
    font-weight: ${props => props.theme.fontLight};
    padding: 0 2.5rem;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: ${props =>
        `0 0 0 30px ${props.theme.greyishBlue} inset !important`};
      -webkit-text-fill-color: ${props => props.theme.white};
    }
    &::placeholder {
      color: ${props => props.theme.white};
    }

    &:-ms-input-placeholder {
      color: ${props => props.theme.white};
    }

    &::-ms-input-placeholder {
      color: ${props => props.theme.white};
    }
  }

  input[type='password'] {
    padding: 0 4.5rem 0 2.5rem;
  }

  svg {
    width: 2.7rem;
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease;

    .svg-fill {
      fill: ${props => props.theme.darkerBlue};
    }

    &.selected {
      background: #737ca0;
    }
  }

  p {
    color: ${props => props.theme.greyishBlue};
    text-align: right;
    font-size: 1.15rem;
    font-weight: 500;
    margin: ${props => props.theme.spacingS} 0.5rem 0 0;
    cursor: pointer;
  }
`

const SignInSignUpForm__Button = styled.button`
  width: 20rem;
  height: 6rem;
  background-color: ${props => props.theme.mainBlue};
  color: ${props => props.theme.white};
  font-size: 1.9rem;
  font-weight: ${props => props.theme.fontSemiBold};
  border: none;
  text-align: center;
  border-radius: ${props => props.theme.smallBorderRadius};
  margin-top: ${props => props.theme.spacingS};
  cursor: pointer;
`

const SignInSignUpLoading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const SignInSignUpMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacingS};

  svg {
    width: 4rem;
  }

  p {
    color: ${props => props.theme.white};
    font-size: 1.4rem;
    font-weight: ${props => props.theme.fontMedium};
    margin-left: 0.5rem;
  }
`

export const Styled = {
  SignInSignUpHeader,
  SignInSignUpHeader__Logo,
  SignInSignUpHeader__Items,
  SignInSignUpContainer,
  SignInSignUpText,
  SignInSignUpForm,
  SignInSignUpForm__Input,
  SignInSignUpForm__Button,
  SignInSignUpLoading,
  SignInSignUpMessage
}
