import styled from 'styled-components'

type SidebarContainerProps = {
  open: boolean
}

const SidebarToggle = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  left: 2rem;
  fill: ${props => props.theme.white};

  svg {
    width: 3.2rem;
  }
`

const SidebarContainer = styled.div<SidebarContainerProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 65vw;
  max-width: 38rem;
  padding: 4rem;
  background: ${props => props.theme.mainGradient};
  box-shadow: 23px 0 16px 0 rgba(0, 0, 0, 0.07);
  transform: ${props => (props.open ? 'translateX(0);' : 'translateX(-101%);')};
  will-change: transform;
  transition: transform 0.2s linear;
  z-index: 11;
  overflow: hidden;
  svg {
    .svg-fill {
      fill: ${props => props.theme.mainBlue};
    }
    .svg-stroke {
      stroke: ${props => props.theme.mainBlue};
    }
  }
`

const SidebarOverlay = styled.div<SidebarContainerProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1;
`

const SidebarUser = styled.div`
  display: flex;
  align-items: center;
`

const SidebarUser__Img = styled.img`
  border-radius: 50%;
  width: 3.5rem;
  object-fit: contain;
`

const SidebarUser__Info = styled.div`
  margin-left: ${props => props.theme.spacingXXS};
`

const SidebarUser__Info__Name = styled.h3`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontRegular};
  font-size: 1.5rem;
`

const SidebarUser__Info__Email = styled.p`
  color: ${props => props.theme.greyishBlue};
  font-weight: ${props => props.theme.fontSemiBold};
  font-size: 1rem;
`

const SidebarNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacingM};
`

const SidebarNavItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};
  margin-bottom: ${props => props.theme.spacingM};
  font-size: 1.7rem;
  line-height: 2.5rem;
  font-weight: ${props => props.theme.fontRegular};

  &.settings {
    margin-bottom: 0;
  }

  svg {
    width: 3rem;
    margin-right: ${props => props.theme.spacingXS};
    fill: ${props => props.theme.mainBlue};
    .svg-fill {
      fill: ${props => props.theme.mainBlue};
    }
    .svg-stroke {
      stroke: ${props => props.theme.mainBlue};
    }
  }
`

export const Styled = {
  SidebarToggle,
  SidebarContainer,
  SidebarOverlay,
  SidebarUser,
  SidebarUser__Img,
  SidebarUser__Info,
  SidebarUser__Info__Name,
  SidebarUser__Info__Email,
  SidebarNav,
  SidebarNavItem
}