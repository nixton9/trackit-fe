import React, { useState, useEffect, useRef } from 'react'
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ReactComponent as TasksIcon } from '../../assets/icons/tasks.svg'
import { ReactComponent as HabitsIcon } from '../../assets/icons/habits.svg'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { Styled } from '../../styles/Sidebar'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  user: {
    image: string
    name: string
    email: string
  }
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [open, setOpen] = useState(false)
  const overlayEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlayCurr = overlayEl.current

    overlayEl &&
      overlayCurr &&
      overlayCurr.addEventListener('click', () => setOpen(false))

    return () => {
      overlayEl &&
        overlayCurr &&
        overlayCurr.removeEventListener('click', () => setOpen(false))
    }
  }, [])

  return (
    <>
      <Styled.SidebarToggle onClick={() => setOpen(!open)}>
        <MenuIcon />
      </Styled.SidebarToggle>

      <Styled.SidebarContainer open={open}>
        <Styled.SidebarUser>
          <Styled.SidebarUser__Img alt={user.name} src={user.image} />
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
            <NavLink to="/" activeClassName="active">
              <Styled.SidebarNavItem>
                <HomeIcon /> Home
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink to="/notes" activeClassName="active">
              <Styled.SidebarNavItem>
                <NotesIcon /> Notes
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink to="/tasks" activeClassName="active">
              <Styled.SidebarNavItem>
                <TasksIcon /> Tasks
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink to="/habits" activeClassName="active">
              <Styled.SidebarNavItem>
                <HabitsIcon /> Habits
              </Styled.SidebarNavItem>
            </NavLink>
            <NavLink to="/expenses" activeClassName="active">
              <Styled.SidebarNavItem>
                <ExpensesIcon /> Expenses
              </Styled.SidebarNavItem>
            </NavLink>
          </div>

          <div>
            <NavLink to="/settings" activeClassName="active">
              <Styled.SidebarNavItem className="settings">
                <SettingsIcon /> Settings
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
