import React, { useContext } from 'react';
import { Transaction } from './Transaction';
import { Message, Table } from 'semantic-ui-react';

import { GlobalContext } from '../Expenses/context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
    <Message>
      <Message.Header>History</Message.Header>
      <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell width='six'>Item</Table.HeaderCell>
        <Table.HeaderCell width='six'>Amount</Table.HeaderCell>
        <Table.HeaderCell width='six'>Currency</Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      </Table>

      <div>
      {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
      </div>
    </Message>
    </>
  )
}
