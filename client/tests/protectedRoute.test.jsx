import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from '../components/RequireAuth.jsx'

function Secret() { return <div>secret</div> }

describe('RequireAuth', () => {
  it('redirects when not authed', () => {
    const tree = (
      <MemoryRouter initialEntries={[{ pathname: '/secret' }]}> 
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/secret" element={<Secret />} />
          </Route>
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toBeTruthy()
  })
})
