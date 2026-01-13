import { describe, it, expect } from 'vitest'
import Dashboard from '../dashboard/index.jsx'

describe('Dashboard', () => {
  it('renders without crashing', () => {
    expect(Dashboard).toBeTruthy()
  })
})
