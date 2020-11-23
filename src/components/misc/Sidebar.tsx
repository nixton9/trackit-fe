import React from 'react'
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

const defaultAvatar =
  'https://everydaynutrition.co.uk/wp-content/uploads/2015/01/default-user-avatar.png'

interface SidebarProps {
  user: {
    image: string
    name: string
    email: string
  }
  logout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ user, logout }) => {
  const [open, setOpen, overlayEl] = useToggleElement()

  const handleLogout = () => {
    setOpen(false)
    logout()
  }

  return (
    <>
      <Styled.SidebarToggle
        className="mbl-click"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </Styled.SidebarToggle>

      <Styled.SidebarContainer open={open}>
        <Styled.SidebarUser>
          <Styled.SidebarUser__Img
            alt={user.name}
            src={user.image ? user.image : defaultAvatar}
          />
          <Styled.SidebarUser__Info>
            <Styled.SidebarUser__Info__Name>
              {user.name}
            </Styled.SidebarUser__Info__Name>
            <Styled.SidebarUser__Info__Email>
              {user.email}
            </Styled.SidebarUser__Info__Email>
          </Styled.SidebarUser__Info>
        </Styled.SidebarUser>

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
  )
}

export default Sidebar
