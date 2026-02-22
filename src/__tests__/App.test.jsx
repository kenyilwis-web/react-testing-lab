import { describe, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../components/App'

describe('App', () => {
	it('renders the app heading', async () => {
		global.setFetchResponse([])
		render(<App />)

		expect(screen.getByRole('heading', { name: /the royal bank of flatiron/i })).toBeInTheDocument()
		await waitFor(() => expect(global.fetch).toHaveBeenCalled())
	})
})