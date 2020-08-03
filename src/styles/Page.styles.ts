import styled from 'styled-components'

const PageContainer = styled.div`
  width: 85%;
  margin: ${props => props.theme.spacingL} auto 0 auto;
`

const PageTitle = styled.h1`
  color: ${props => props.theme.white};
  font-size: 3rem;
  font-weight: ${props => props.theme.fontSemiBold};
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacingS};
`

const PageHeader__View = styled.div`
  display: flex;
  align-items: center;
`

const PageHeader__View__Dropdown = styled.div`
  color: ${props => props.theme.white};
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontMedium};

  svg {
    width: 1.4rem;
    margin-left: 0.5rem;
    transform: translateY(0.4rem);
  }
`

const PageHeader__View__Counter = styled.h3`
  color: ${props => props.theme.mainBlue};
  font-size: 2.4rem;
  font-weight: ${props => props.theme.fontLight};
  margin-left: ${props => props.theme.spacingXS};
`

const PageHeader__Settings = styled.div`
  .settings-icon {
    cursor: pointer;
    width: 2.9rem;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
  }
`

const PageContent = styled.section`
  margin-top: ${props => props.theme.spacingS};
  overflow-y: auto;
  height: 75vh;
`

export const Styled = {
  PageContainer,
  PageTitle,
  PageHeader,
  PageHeader__View,
  PageHeader__View__Dropdown,
  PageHeader__View__Counter,
  PageHeader__Settings,
  PageContent
}
