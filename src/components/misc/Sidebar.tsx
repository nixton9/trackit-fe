import React, { useState } from 'react'
import { UserHeader } from './UserHeader'
import { User } from '../../utils/ModuleTypes'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg'
import { Styled } from '../../styles/Sidebar.styles'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  user: User
  logout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ user, logout }) => {
  const [open, setOpen, overlayEl] = useToggleElement()
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 45) {
      setOpen(false)
    }

    if (touchStart - touchEnd < -150) {
      console.log('adsad')
    }
  }

  const handleLogout = () => {
    setOpen(false)
    logout()
  }

  const hasUser = Boolean(user.id) && Boolean(user.name) && Boolean(user.email)

  return hasUser ? (
    <>
      <Styled.SidebarToggle
        className="mbl-click"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon data-test-id="sidebar-icon" />
      </Styled.SidebarToggle>

      <Styled.SidebarContainer
        open={open}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <UserHeader user={user} small />

        <Styled.SidebarNav>
          <div>
            <NavLink
              to="/"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem>
                <HomeIcon /> Home
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink
              to="/notes"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem>
                <NotesIcon /> Notes
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink
              to="/tasks"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem>
                <TasksIcon /> Tasks
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink
              to="/habits"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem>
                <HabitsIcon /> Habits
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink
              to="/expenses"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem>
                <ExpensesIcon /> Expenses
              </Styled.SidebarNavItem>
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/settings"
              activeClassName="active"
              onClick={() => setOpen(false)}
            >
              <Styled.SidebarNavItem className="settings">
                <SettingsIcon /> Settings
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink to="/" onClick={handleLogout}>
              <Styled.SidebarNavItem className="logout">
                <LogoutIcon /> Logout
              </Styled.SidebarNavItem>
            </NavLink>
          </div>
        </Styled.SidebarNav>
      </Styled.SidebarContainer>

      <Styled.SidebarOverlay open={open} ref={overlayEl} />
    </>
  ) : null
}

export default Sidebar
