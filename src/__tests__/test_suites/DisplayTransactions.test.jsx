import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import AccountContainer from '../../components/AccountContainer'

describe('Display Transactions', () => {
	it('displays transactions after loading from the API', async () => {
		const mockTransactions = [
			{
				id: '1',
				date: '2026-02-21',
				description: 'Salary Deposit',
				category: 'Income',
				amount: 2500,
			},
			{
				id: '2',
				date: '2026-02-22',
				description: 'Coffee Shop',
				category: 'Food',
				amount: -6.75,
			},
		]

		global.setFetchResponse(mockTransactions)
		render(<AccountContainer />)

		expect(await screen.findByText('Salary Deposit')).toBeInTheDocument()
		expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
		expect(screen.getByText('Income')).toBeInTheDocument()
		expect(screen.getByText('Food')).toBeInTheDocument()
	})
})
