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

const SettingsBlock__Category = styled.p<SettingsBlock__CategoryProps>`
  color: ${props => props.color};
  font-size: 1.3rem;
  font-weight: ${props => props.theme.fontSemiBold};
  margin: 0 ${props => props.theme.spacingS} ${props => props.theme.spacingXS} 0;
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
