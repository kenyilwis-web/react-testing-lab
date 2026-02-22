import { describe, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountContainer from '../../components/AccountContainer'

describe('Add Transactions', () => {
	it('adds a new transaction to the frontend and calls POST', async () => {
		const existingTransactions = [
			{
				id: '1',
				date: '2026-02-20',
				description: 'Book Store',
				category: 'Shopping',
				amount: -24.99,
			},
		]

		const createdTransaction = {
			id: '2',
			date: '2026-02-22',
			description: 'Gym Membership',
			category: 'Health',
			amount: '-45.00',
		}

		global.fetch = vi
			.fn()
			.mockResolvedValueOnce({
				json: async () => existingTransactions,
				ok: true,
				status: 200,
			})
			.mockResolvedValueOnce({
				json: async () => createdTransaction,
				ok: true,
				status: 201,
			})

		const { container } = render(<AccountContainer />)

		await screen.findByText('Book Store')

		const user = userEvent.setup()
		await user.type(screen.getByPlaceholderText('Description'), 'Gym Membership')
		await user.type(screen.getByPlaceholderText('Category'), 'Health')
		await user.type(screen.getByPlaceholderText('Amount'), '45.00')
		await user.type(container.querySelector('input[name="date"]'), '2026-02-22')
		await user.click(screen.getByRole('button', { name: /add transaction/i }))

		const postCall = global.fetch.mock.calls.find(([, options]) => options?.method === 'POST')
		expect(postCall).toBeTruthy()

		expect(await screen.findByText('Gym Membership')).toBeInTheDocument()
		expect(screen.getByText('Health')).toBeInTheDocument()
	})
})
