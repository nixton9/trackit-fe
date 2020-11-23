import styled from 'styled-components/macro'
import { fadeIn } from './Drawer.styles'
import { device } from './theme'

type DetailHeaderProps = {
  editorActive?: boolean
}

const PageContainer = styled.div`
  width: 85%;
  margin: ${props => props.theme.spacingL} auto 0 auto;
`

const PageTitle = styled.h1`
  color: ${props => props.theme.white};
  font-size: 3rem;
  font-weight: ${props => props.theme.fontSemiBold};

  &.smaller {
    font-size: 1.9rem;
  }
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
  display: flex;

  .MuiInput-root {
    background: ${props => props.theme.accent};
    border-radius: ${props => props.theme.smallBorderRadius};
    min-width: 11rem;
    padding: 0.6rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      filter: contrast(1.5);
    }
    &::active {
      filter: contrast(2);
    }
  }

  .input-wrapper {
    position: relative;
    background: ${props => props.theme.accent};
    border-radius: ${props => props.theme.smallBorderRadius};
    width: 11rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #7c22ff;
    }

    &:last-child {
      margin-left: 2rem;
    }

    input  {
      width: 100%;
      font-size: 1.5rem;
      padding: 0.6rem 3rem 0.6rem 1.5rem;
      cursor: pointer;
    }

    svg {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    @media ${device.mobile} {
      width: 10rem;
    }
  }

  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontMedium};
    font-size: 1.7rem;
    min-height: 0;
  }

  .MuiSelect-icon {
    right: 1rem;
  }

  svg {
    width: 1.4rem;
    margin-left: 0.5rem;
    transform: translateY(0.4rem);
  }
`

const PageHeader__View__Counter = styled.h3`
  color: ${props => props.theme.offWhite};
  font-size: 2.4rem;
  font-weight: ${props => props.theme.fontLight};
  margin-left: 2.5rem;

  &.smaller {
    font-size: 1.9rem;
  }

  @media ${device.mobile} {
    font-size: 2.2rem;
  }
`

const PageHeader__Settings = styled.div`
  display: flex;
  position: relative;

  .settings-icon {
    cursor: pointer;
    width: 3.2rem;
  }

  a {
    display: inherit;
    margin-right: ${props => props.theme.spacingXS};
  }

  svg {
    width: 3.2rem;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const PageContent = styled.section`
  margin-top: ${props => props.theme.spacingS};
  overflow-y: auto;
  padding-right: ${props => props.theme.spacingXXS};
  height: 70vh;

  @media only screen and (max-height: 650px) {
    height: 67vh;
  }
  @media only screen and (max-height: 600px) {
    height: 64vh;
  }
  @media only screen and (max-height: 550px) {
    height: 61vh;
  }
  @media only screen and (max-height: 500px) {
    height: 59vh;
  }
`

const PageContent__Day = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS}
    ${props => props.theme.spacingXXS} ${props => props.theme.spacingXXS};
  border-top: 1px solid rgb(119, 118, 118, 0.25);

  &:last-child {
    border-bottom: 1px solid rgb(119, 118, 118, 0.25);
  }
`

const PageContent__Day__Title = styled.h4`
  color: ${props => props.theme.grey};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontBold};
  margin-bottom: ${props => props.theme.spacingXXS};
`

const PageContent__Day__Expenses = styled.div``

const PageContent__NoData = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  text-align: center;

  svg {
    width: 25rem;
    opacity: 0.89;
  }

  p  {
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontMedium};
    color: ${props => props.theme.grey};
    text-align: center;
  }
`

const PageAddItem = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.surfacesBlack};
  border-radius: 50%;
  box-shadow: 7px 7px 16px 0 rgba(0, 0, 0, 0.07);
  z-index: 11;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: contrast(1.05);
  }

  &:active {
    background-color: ${props => props.theme.hoverBlack};
    box-shadow: 7px 3px 9px 0 rgba(0, 0, 0, 0.07);
    transform: translateY(2px);
  }

  svg {
    width: 3rem;
    fill: ${props => props.theme.white};
  }
`

const PageLoading = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacingL};
`

const PageError = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.white};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontMedium};
  margin-top: ${props => props.theme.spacingL};

  svg {
    width: 4rem;
    margin-right: 0.5rem;
  }
`

const DetailBack = styled.span`
  position: absolute;
  top: 3rem;
  left: 2rem;

  svg {
    transform: rotate(90deg);
    width: 3.2rem;
    margin-right: ${props => props.theme.spacingXS};
  }
`

const DetailHeader = styled.div<DetailHeaderProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 5rem;
    padding: 0.4rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    background-color: ${props => (props.editorActive ? '#1b1f3a' : '')};
    cursor: pointer;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const DetailTitle = styled.input`
  color: ${props => props.theme.white};
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontSemiBold};
  background: transparent;
  border: none;
`

const DetailDate = styled.h5`
  color: ${props => props.theme.grey};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontExtraBold};
  margin-top: 0.4rem;
`

const DetailTags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacingXS};
  margin-top: ${props => props.theme.spacingS};
  background-color: ${props => props.theme.surfacesBlack};
  border-radius: ${props => props.theme.smallBorderRadius};

  svg {
    width: 2rem;
    fill: ${props => props.theme.white};
    margin-left: auto;
    cursor: pointer;
  }
`

const DetailTags__Inner = styled.div`
  display: flex;

  p {
    color: ${props => props.theme.offWhite};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontMedium};
  }

  .single-tag .inner {
    margin-bottom: 0;
  }
`

const DetailTagEditor = styled.div`
  margin-top: ${props => props.theme.spacingXS};
`

const DetailContent = styled.p`
  margin-top: ${props => props.theme.spacingM};
  color: ${props => props.theme.white};
`

const DetailSave = styled.div`
  display: flex;
  align-items: center;
  float: right;
  margin: ${props => props.theme.spacingM} 0;
  animation: ${fadeIn} 0.4s ease forwards;

  p {
    font-weight: 500;
    font-size: 1.2rem;
    margin-right: 2.5rem;
    color: ${props => props.theme.grey};
  }
`

const SearchResults = styled.div`
  margin-top: ${props => props.theme.spacingM};
`

const SearchResults__Module = styled.div`
  margin-bottom: ${props => props.theme.spacingL};
`

const SearchResults__Module__Title = styled.h3`
  color: ${props => props.theme.accent};
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontBold};
  margin-bottom: ${props => props.theme.spacingXS};
`

const SearchResults__Item = styled.div`
  display: flex;
  align-items: baseline;
  padding: 3rem 1rem;
  border-bottom: 1px solid rgb(119, 118, 118, 0.25);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${props => props.theme.hoverBlack};
  }

  &:last-child {
    border: none;
  }

  .task-status {
    margin-left: auto;
    transform: translateY(3px);
  }
`

const SearchResults__Item__Title = styled.p`
  color: ${props => props.theme.white};
  font-size: 1.6rem;
  font-weight: ${props => props.theme.fontLight};
`

const SearchResults__Item__Date = styled.span`
  color: ${props => props.theme.grey};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.fontSemiBold};
  margin-left: ${props => props.theme.spacingXS};
`

const SearchResults__Item__Value = styled.span`
  color: ${props => props.theme.accent};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.fontSemiBold};
  margin-left: auto;
`

export const Styled = {
  PageContainer,
  PageTitle,
  PageHeader,
  PageHeader__View,
  PageHeader__View__Dropdown,
  PageHeader__View__Counter,
  PageHeader__Settings,
  PageContent,
  PageContent__Day,
  PageContent__Day__Title,
  PageContent__Day__Expenses,
  PageContent__NoData,
  PageAddItem,
  PageLoading,
  PageError,
  DetailBack,
  DetailHeader,
  DetailTitle,
  DetailDate,
  DetailTags,
  DetailTags__Inner,
  DetailTagEditor,
  DetailContent,
  DetailSave,
  SearchResults,
  SearchResults__Module,
  SearchResults__Module__Title,
  SearchResults__Item,
  SearchResults__Item__Title,
  SearchResults__Item__Date,
  SearchResults__Item__Value
}
