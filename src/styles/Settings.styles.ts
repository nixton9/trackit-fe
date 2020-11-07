import styled from 'styled-components'

type SettingsBlock__CategoryProps = {
  color: string
}

const SettingsBlock = styled.div`
  margin-bottom: ${props => props.theme.spacingS};
  position: relative;
`
const SettingsBlock__Label = styled.label`
  font-weight: ${props => props.theme.fontExtraBold};
  font-size: 1.3rem;
`

const SettingsBlock__Input = styled.div`
  width: 100%;
  margin-top: 0.4rem;
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.5rem;

  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontLight};
    font-size: 1.5rem;
  }

  .MuiSelect-icon {
    width: 1.4rem;
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

  .inner {
    background-color: ${props => props.color};
    color: ${props => props.theme.white};
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
  svg {
    width: 1.7rem;
    cursor: pointer;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
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
