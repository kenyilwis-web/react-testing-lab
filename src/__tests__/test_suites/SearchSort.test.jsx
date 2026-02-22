import { describe, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountContainer from '../../components/AccountContainer'

describe('Search and Sort Transactions', () => {
	it('filters transactions when search input changes', async () => {
		const transactions = [
			{
				id: '1',
				date: '2026-02-20',
				description: 'Alpha Groceries',
				category: 'Food',
				amount: -30,
			},
			{
				id: '2',
				date: '2026-02-21',
				description: 'Metro Pass',
				category: 'Transportation',
				amount: -75,
			},
		]

		global.setFetchResponse(transactions)
		render(<AccountContainer />)

		await screen.findByText('Alpha Groceries')

		await userEvent.type(screen.getByPlaceholderText('Search your Recent Transactions'), 'metro')

		expect(screen.getByText('Metro Pass')).toBeInTheDocument()
		expect(screen.queryByText('Alpha Groceries')).not.toBeInTheDocument()
	})

	it('sorts transactions when sort option changes', async () => {
		const transactions = [
			{
				id: '1',
				date: '2026-02-20',
				description: 'Zoo Ticket',
				category: 'Entertainment',
				amount: -25,
			},
			{
				id: '2',
				date: '2026-02-21',
				description: 'Apple Juice',
				category: 'Food',
				amount: -8,
			},
		]

		global.setFetchResponse(transactions)
		render(<AccountContainer />)

		await screen.findByText('Zoo Ticket')

		fireEvent.change(screen.getByRole('combobox'), { target: { value: 'description' } })

		const rows = screen.getAllByRole('row').slice(1)
		const firstDataRow = rows[0]
		expect(within(firstDataRow).getByText('Apple Juice')).toBeInTheDocument()
	})
})
