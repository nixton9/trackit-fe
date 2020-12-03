import styled from 'styled-components/macro'

type SettingsBlock__CategoryProps = {
  color: string
}

const SettingsBlock = styled.div`
  margin-bottom: ${props => props.theme.spacingS};
  position: relative;
  
  }
`
const SettingsBlock__Label = styled.label`
  font-weight: ${props => props.theme.fontExtraBold};
  font-size: 1.3rem;
`

const SettingsBlock__Input = styled.div`
  width: 100%;
  margin-top: ${props => props.theme.spacingXXS};
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.5rem;

  .MuiSelect-select.MuiSelect-select {
    padding-right: 4rem;
  }

  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontLight};
    font-size: 1.5rem;
    padding: 1rem;
    min-width: 7rem;
    line-height: 2rem;
    border-radius: ${props => props.theme.XSBorderRadius};
    transition: all 0.1s ease;

    &:hover,
    &:active {
      background: ${props => props.theme.backgroundBlack};
    }
  }

  .MuiSelect-icon {
    width: 1.4rem;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`

const SettingsBlock__Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacingXS};

  > .single-tag {
    margin-bottom: ${props => props.theme.spacingXS};

    span {
      font-size: 1rem;
    }
  }
`

const SettingsBlock__Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacingXS};
`

const SettingsBlock__Category = styled.div<SettingsBlock__CategoryProps>`
  position: relative;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(1px);
  }

  .inner {
    background-color: ${props => props.color};
    color: ${props => props.theme.alwaysWhite};
    min-width: 5rem;
    text-align: center;
    padding: 0.3rem 0.9rem;
    border-radius: ${props => props.theme.bigBorderRadius};
    margin: 0 1.5rem 1.5rem 0;
    font-size: 1rem;
    font-weight: ${props => props.theme.fontMedium};
    cursor: pointer;
  }

  .delete {
    position: absolute;
    top: -5px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.backgroundBlack};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontSemiBold};
    transform: rotate(45deg);
    opacity: 0;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  &:hover .delete {
    opacity: 1;
  }
`

const SettingsBlock__Icon = styled.span`
  position: relative;
  max-height: 2rem;

  svg {
    width: 1.7rem !important;
    cursor: pointer;
    transform-origin: center;
    transition: all 0.25s ease;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
  }

  &:hover svg {
    transform: scale(1.2);
  }
`

export const Styled = {
  SettingsBlock,
  SettingsBlock__Label,
  SettingsBlock__Input,
  SettingsBlock__Tags,
  SettingsBlock__Categories,
  SettingsBlock__Category,
  SettingsBlock__Icon
}
