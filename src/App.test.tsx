import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import App from './App'

const mockTodos = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Todo ${i + 1}`,
  completed: i % 2 === 0,
}))

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos),
        } as Response),
      ),
    )
  })

  it('renders checkboxes with data-testid attributes', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByTestId('loading-message')).not.toBeInTheDocument()
    })

    for (let i = 1; i <= 10; i++) {
      const checkbox = screen.getByTestId(`todo-checkbox-${i}`)
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    }
  })
})
