import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Sidebar from '../components/misc/Sidebar'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('matches snapshot', () => {
  act(() => {
    render(<Sidebar />, container)
  })

  expect(container.innerHTML).toMatchSnapshot()
})
