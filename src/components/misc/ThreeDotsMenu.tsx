import React from 'react'
import { useToggleElement } from '../../utils/useToggleElement'
import styled, { keyframes } from 'styled-components/macro'

type ThreeDotsMenuProps = {
  options?: { label: string; onClick: () => void }[]
}

type MenuOverlayProps = {
  open: boolean
}

const showMenu = keyframes`
  0% { 
    opacity: 0;
    transform: scaleY(0);
  } 100% { 
    opacity: 1;
    transform: scaleY(1);
  }
`

const MenuContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 2rem;
  cursor: pointer;
`

const Icon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 2rem;
  border-radius: 50%;

  &:active:before {
    content: '';
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 50%;
    right: -1px;
    transform: translateY(-50%);
    background-color: ${props => props.theme.activeBackground};
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    z-index: -1;
  }

  span {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.3rem 0;
    background-color: ${props => props.theme.white};
    border-radius: 50%;
  }
`

const Menu = styled.ul`
  position: relative;
  list-style-type: none;
  background-color: ${props => props.theme.surfacesBlack};
  padding-top: 8px;
  padding-bottom: 8px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  z-index: 11;
  transform-origin: top;
  animation: ${showMenu} 0.2s ease;
`

const MenuItem = styled.li`
  color: #fff;
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontRegular};
  line-height: 1.5;
  padding: 1.2rem 2.5rem 1.2rem 1.5rem;
  min-width: 12rem;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover,
  &:active {
    background-color: ${props => props.theme.hoverBlack};
  }
`

const MenuOverlay = styled.div<MenuOverlayProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1;
`

export const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ options }) => {
  const [open, setOpen, overlayEl] = useToggleElement()
  const itemClick = (fn: () => void) => {
    fn()
    setOpen(false)
  }
  return (
    <MenuContainer className="three-dots-menu">
      {' '}
      <Icon onClick={() => setOpen(!open)} data-test-id="three-dots-menu">
        <span></span>
        <span></span>
        <span></span>
      </Icon>
      {/* open && data && data.length > 0 */}
      {open && options && options.length > 0 && (
        <Menu>
          {options.map(item => (
            <MenuItem key={item.label} onClick={() => itemClick(item.onClick)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
      <MenuOverlay open={open} ref={overlayEl} />
    </MenuContainer>
  )
}
