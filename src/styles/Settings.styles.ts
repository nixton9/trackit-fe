import styled from 'styled-components'

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
  font-size: 1.6rem;

  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontLight};
    font-size: 1.6rem;
  }

  .MuiSelect-icon {
    width: 1.6rem;
  }
`

const SettingsBlock__Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacingXS};

  > .single-tag {
    margin-bottom: 1.5rem;

    span {
      font-size: 1em;
    }
  }
`

const SettingsBlock__Icon = styled.span`
  position: absolute;
  top: 0;
  right: 0;

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
  SettingsBlock__Icon
}
