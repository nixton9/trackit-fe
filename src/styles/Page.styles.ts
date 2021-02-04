import styled from 'styled-components/macro'
import { fadeIn } from './Drawer.styles'
import { SlideDown } from './TagEditor.styles'
import { device } from './theme'

type DetailHeaderProps = {
  editorActive?: boolean
}

type SingleChartProps = {
  area?: string
}

type SingleChart__CategoryProps = {
  bgColor: string
}

type SingleChart__ExpenseProps = {
  color?: string
  position: number
}

const PageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(100px, 1fr);
  grid-gap: 4rem;
  width: 100vw;
  height: 100vh;
  max-width: 120rem;
  margin: 0 auto;
  padding: 9rem 4rem 4rem;
  background: ${props => props.theme.backgroundBlack};
  overflow: hidden;

  .page-header-wrapper {
    position: relative;
  }

  &.note-detail {
    grid-template-rows: auto auto minmax(100px, 1fr);
    grid-template-columns: 100%;
    width: unset;
    height: unset;
    overflow: auto;
    padding-top: 10rem;
    grid-gap: 2rem;

    .editor-container {
      margin-top: 0;
    }
  }

  &.habits {
    display: block;
    height: unset;
    overflow: unset;
  }
`

const HabitsContainer = styled.div`
  position: relative;
  background-color: ${props => props.theme.backgroundBlack};
  display: grid;
  grid-template-rows: auto minmax(100px, 1fr);
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  padding-bottom: 4rem;
  overflow-x: hidden;
`

const PageTitle = styled.h1`
  color: ${props => props.theme.white};
  font-size: 3rem;
  font-weight: ${props => props.theme.fontSemiBold};

  &.smaller {
    font-size: 1.9rem;
  }

  &.search-title {
    position: relative;
  }
`

const PageHeader = styled.div`
  position: relative;
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
    transition: all 0.1s ease;

    &:hover,
    &:active {
      background-color: ${props => props.theme.darkenAccent};
    }
  }

  .input-wrapper {
    position: relative;
    background: ${props => props.theme.accent};
    color: ${props => props.theme.alwaysWhite};
    border-radius: ${props => props.theme.smallBorderRadius};
    width: 11rem;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover,
    &:active {
      background-color: ${props => props.theme.darkenAccent};
    }

    &:last-child {
      margin-left: 2rem;
    }

    input  {
      width: 100%;
      font-size: 1.5rem;
      padding: 0.6rem 3rem 0.6rem 1.5rem;
      background: inherit;
      color: inherit;
      border: none;
      font-weight: inherit;
      cursor: pointer;
    }

    svg {
      stroke: ${props => props.theme.alwaysWhite};
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    @media ${device.mobile} {
      width: 8.5rem;

      &:last-child {
        margin-left: 1rem;
      }

      input {
        font-size: 1.3rem;
      }
    }
  }

  .MuiSelect-select {
    color: ${props => props.theme.alwaysWhite};
    font-weight: ${props => props.theme.fontMedium};
    font-size: 1.7rem;
    min-height: 0;
  }

  .MuiSelect-icon {
    right: 1rem;
    stroke: ${props => props.theme.alwaysWhite};
    top: unset;
    transform: unset;
  }

  svg {
    width: 1.4rem;
    margin-left: 0.5rem;
    transform: translateY(0.4rem);
  }

  &.notes .MuiInput-root {
    background: ${props => props.theme.pinkColor};
  }
  &.habits .MuiInput-root {
    background: ${props => props.theme.greenColor};
  }
  &.expenses .input-wrapper,
  &.expenses .MuiInput-root {
    background: ${props => props.theme.blueColor};
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
  margin-left: auto;

  .settings-icon {
    cursor: pointer;
    width: 3.2rem;
  }

  a {
    position: relative;
    display: inherit;
    margin-right: ${props => props.theme.spacingXS};
  }

  .tooltip {
    display: flex;
  }

  svg {
    width: 3.2rem;
    height: 100%;

    &.stats-icon {
      width: 2.6rem;
    }

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const PageContent = styled.section`
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-right: ${props => props.theme.spacingXXS};

  &.settings-page {
    padding-left: 15rem;
    overflow-x: hidden;

    @media ${device.tablet} {
      padding-left: 8rem;
    }

    @media ${device.tabletXS} {
      padding-left: 4rem;
    }

    @media ${device.mobile} {
      padding-left: 2rem;
    }
  }

  &.desktop-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${props => props.theme.spacingS};
    padding-top: 2rem;

    &.expenses {
      grid-template-areas: 'bar-chart bar-chart' 'pie-chart list';
      grid-template-rows: fit-content(1rem) auto;
    }

    &.habits {
      grid-template-areas: 'pie-chart list';

      .pie-chart {
        min-height: 384px;
      }

      .pie-chart-flex {
        margin-top: 4rem;
      }
    }

    @media ${device.tablet} {
      display: block;
    }
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
  top: 40%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  &.centered {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
  }
`

const PageError = styled.div`
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.white};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontMedium};

  svg {
    width: 4rem;
    margin-right: 0.5rem;
  }
`

const DetailBack = styled.span`
  position: fixed;
  top: 4rem;
  left: 3rem;

  svg {
    transform: rotate(90deg);
    width: 3.2rem;
    margin-right: ${props => props.theme.spacingXS};

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const DetailHeader = styled.div<DetailHeaderProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .three-dots-menu {
    top: 2.5rem;
    right: 3rem;
  }

  .three-dots-menu div:first-child {
    padding-right: 0.5rem;
  }

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

  .title-wrapper {
    width: 100%;
  }
`

const DetailTitle = styled.input`
  color: ${props => props.theme.white};
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontSemiBold};
  background: transparent;
  border: none;
  width: 100%;
`

const DetailDate = styled.h5`
  color: ${props => props.theme.grey};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontExtraBold};
  margin-top: 0.4rem;
`

const DetailTagsContainer = styled.div`
  padding: ${props => props.theme.spacingXS};
  background-color: ${props => props.theme.surfacesBlack};
  border-radius: ${props => props.theme.smallBorderRadius};
`

const DetailTags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .mbl-click:before {
    z-index: 0 !important;
  }

  svg {
    position: relative;
    width: 2rem;
    fill: ${props => props.theme.white};
    margin-left: auto;
    cursor: pointer;
    transform: translateY(2px);
  }
`

const DetailTags__Inner = styled.div`
  display: flex;
  flex-wrap: wrap;

  p {
    color: ${props => props.theme.offWhite};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontMedium};
  }

  .single-tag {
    margin: 0.7rem 0;

    .inner {
      margin-bottom: 0;
    }
  }
`

const DetailTagEditor = styled.div`
  margin-top: ${props => props.theme.spacingS};
  animation: ${SlideDown} 0.2s linear forwards;

  &.editor {
    padding-left: ${props => props.theme.spacingXS};
  }

  .close {
    font-size: 2.5rem;
    font-weight: ${props => props.theme.fontMedium};
    color: ${props => props.theme.white};
    margin-left: ${props => props.theme.spacingXS};
    padding: 0.5rem;
    transform: rotate(45deg);
    cursor: pointer;
  }
`

const DetailContent = styled.div`
  color: ${props => props.theme.white};
`

const DetailSave = styled.div`
  text-align: center;
  margin: ${props => props.theme.spacingS} 0 ${props => props.theme.spacingM} 0;
  animation: ${fadeIn} 0.4s ease forwards;

  p {
    font-weight: 500;
    font-size: 1.2rem;
    margin-right: 2.5rem;
    color: ${props => props.theme.grey};
  }
`

const DetailSave__Button = styled.button`
  position: absolute;
  top: 3.2rem;
  right: 7rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem 0.7rem 1.5rem;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.alwaysWhite};
  font-size: 1.2rem;
  font-weight: ${props => props.theme.fontBold};
  border: none;
  border-radius: ${props => props.theme.smallBorderRadius};
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkenAccent};
  }

  svg {
    width: 2.7rem;
    margin-left: 0.5rem;
    background: transparent;
    fill: ${props => props.theme.accent};

    .svg-stroke {
      stroke: ${props => props.theme.alwaysWhite};
    }
  }
`

const SearchResults = styled.div`
  overflow-y: auto;
  padding-top: ${props => props.theme.spacingXS};
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
  max-width: 85%;
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

const Settings__Title = styled.h3`
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontBold};
  margin-top: ${props => props.theme.spacingXL};

  &:first-of-type {
    margin-top: ${props => props.theme.spacingM};
  }
`

const SettingsBlock = styled.div`
  margin-top: ${props => props.theme.spacingS};
  padding-left: ${props => props.theme.spacingXS};
  position: relative;
  min-height: 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &.cols-3 {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.no-grid {
    display: block;
  }

  &:last-child {
    padding-bottom: ${props => props.theme.spacingS};
    margin-bottom: ${props => props.theme.spacingS};
  }

  .loading-spinner {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
  }

  .image {
    align-self: center;
    position: relative;
    top: 1.5rem;
  }

  .file-picker {
    position: relative;
    display: inline-block;
    margin-right: ${props => props.theme.spacingS};

    input {
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }

    small {
      position: absolute;
      font-size: 1.3rem;
      font-weight: ${props => props.theme.fontMedium};
      color: ${props => props.theme.grey};
      top: 5rem;
      left: 1rem;
    }
  }

  label {
    color: ${props => props.theme.offWhite};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontBold};
    display: block;
  }

  input {
    background: ${props => props.theme.surfacesBlack};
    color: ${props => props.theme.white};
    border: none;
    font-size: 1.75rem;
    font-weight: ${props => props.theme.fontExtraLight};
    min-width: 25rem;
    margin-top: ${props => props.theme.spacingXS};
    padding: ${props => props.theme.spacingXXS};
    text-indent: 5px;
    border-radius: ${props => props.theme.smallBorderRadius};
  }

  .inline-btn {
    position: relative;
    padding: 0.8rem 1.5rem;
    margin: 1rem 0 0 0;
    background-color: ${props => props.theme.surfacesBlack};
    color: ${props => props.theme.white};
    font-size: 1.2rem;
    font-weight: ${props => props.theme.fontSemiBold};
    border: none;
    border-radius: ${props => props.theme.smallBorderRadius};
    transition: all 0.15s linear;
    cursor: pointer;

    &:hover,
    &:active {
      filter: contrast(1.1);
    }

    label {
      display: flex;
      align-items: center;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      cursor: pointer;
    }

    span {
      display: flex;
      align-items: center;
    }

    svg {
      width: 1.4rem;
      height: 100%;
      margin-left: 1rem;

      .svg-fill {
        fill: ${props => props.theme.white};
      }
      .svg-stroke {
        stroke: ${props => props.theme.white};
      }
    }
  }

  .toggle-button {
    margin-top: ${props => props.theme.spacingXS};
  }

  p {
    color: ${props => props.theme.white};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontLight};
    line-height: 3.1rem;
    max-width: 90%;

    a {
      color: ${props => props.theme.accent};
      font-weight: ${props => props.theme.fontMedium};
    }
  }

  @media ${device.tabletXL} {
    display: block;

    .image,
    .new-password,
    .walkthrough,
    .theme {
      margin-top: ${props => props.theme.spacingS};
    }

    .image {
      top: unset;
    }

    .file-picker {
      margin-right: ${props => props.theme.spacingXS};
    }
  }
`

const SettingsButton = styled.button`
  color: ${props => props.theme.alwaysWhite};
  background-color: ${props => props.theme.accent};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.fontSemiBold};
  border: none;
  margin-top: 4rem;
  padding: 0.6rem 1.2rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  margin-right: auto;
  cursor: pointer;

  &.nm-button  {
    margin-top: ${props => props.theme.spacingXS};
  }

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkenAccent};
  }

  &:disabled {
    opacity: 0.7;
  }
`

const SingleChart = styled.div<SingleChartProps>`
  margin-top: 0;
  padding: ${props => props.theme.spacingS};
  background-color: ${props => props.theme.surfacesBlack};
  border-radius: ${props => props.theme.mainBorderRadius};
  grid-area: ${props => props.area};
  height: min-content;

  &.no-data {
    min-height: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: ${props => props.theme.white};
      font-size: 1.4rem;
      font-weight: ${props => props.theme.fontMedium};
    }
  }

  @media ${device.tablet} {
    margin-top: ${props => props.theme.spacingM};

    &:first-child {
      margin-top: ${props => props.theme.spacingS};
    }

    &:last-child {
      margin-bottom: ${props => props.theme.spacingS};
    }
  }
`

const SingleChart__Title = styled.h3`
  color: ${props => props.theme.white};
  font-size: 1.95rem;
  font-weight: ${props => props.theme.fontExtraBold};
  //margin: 1.5rem 0 0 2rem;
`

const SingleChart__Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacingXS};

  @media ${device.mobile} {
    flex-wrap: wrap;
  }
`

const SingleChart__CategoriesList = styled.ul`
  list-style: none;
  width: 50%;
  max-width: 25rem;
  padding-left: ${props => props.theme.spacingS};

  @media ${device.mobileL} {
    width: 60%;
  }

  @media ${device.mobile} {
    width: 90%;
    margin: 0 auto;
    padding-left: ${props => props.theme.spacingXXS};
  }
`

const SingleChart__Category = styled.li<SingleChart__CategoryProps>`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  line-height: 1.4rem;

  .name {
    position: relative;
    color: ${props => props.theme.white};
    font-size: 1.2rem;
    font-weight: ${props => props.theme.fontMedium};

    &:before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.7rem;
      height: 0.7rem;
      background-color: ${props => props.bgColor};
      border-radius: 50%;
    }
  }

  .percentage {
    color: ${props => props.theme.lightBlue};
    font-size: 1.1rem;
    font-weight: ${props => props.theme.fontSemiBold};
    margin-top: 0.4rem;
  }

  .value {
    color: ${props => props.theme.white};
    font-size: 1.1rem;
    font-weight: ${props => props.theme.fontSemiBold};
    line-height: 2rem;
  }
`

const SingleChart__TopExpenses = styled.ul`
  list-style: none;
  width: 90%;
  margin: ${props => props.theme.spacingS} auto;
  padding-left: ${props => props.theme.spacingXXS};
`

const SingleChart__Expense = styled.li<SingleChart__ExpenseProps>`
  display: flex;
  justify-content: space-between;
  margin: 4rem auto 3rem auto;
  line-height: 1.4rem;
  min-height: 3.3rem;

  .title {
    position: relative;
    color: ${props => props.theme.white};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontLight};

    &:before {
      content: '${props => props.position}';
      position: absolute;
      left: -1.8rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.3rem;
      font-weight: ${props => props.theme.fontBold};
      color: ${props => props.theme.lightBlue};
    }
  }

  .category {
    color: ${props => props.color};
    font-size: 1.3rem;
    font-weight: ${props => props.theme.fontMedium};
    margin-top: 0.7rem;
  }

  .value {
    color: ${props => props.theme.white};
    font-size: 1.3rem;
    font-weight: ${props => props.theme.fontSemiBold};
  }
`

const SingleChart__Stat = styled.li`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacingS} auto;

  .title {
    color: ${props => props.theme.white};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontSemiBold};
  }

  .value {
    color: ${props => props.theme.lightBlue};
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontSemiBold};
  }
`

export const Styled = {
  PageContainer,
  HabitsContainer,
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
  DetailTagsContainer,
  DetailTags,
  DetailTags__Inner,
  DetailTagEditor,
  DetailContent,
  DetailSave,
  DetailSave__Button,
  SearchResults,
  SearchResults__Module,
  SearchResults__Module__Title,
  SearchResults__Item,
  SearchResults__Item__Title,
  SearchResults__Item__Date,
  SearchResults__Item__Value,
  Settings__Title,
  SettingsBlock,
  SettingsButton,
  SingleChart,
  SingleChart__Title,
  SingleChart__Flex,
  SingleChart__CategoriesList,
  SingleChart__Category,
  SingleChart__TopExpenses,
  SingleChart__Expense,
  SingleChart__Stat
}
