import React, {useContext} from 'react';
import { GlobalContext } from '../Expenses/context/GlobalState';
import { Table , Button} from 'semantic-ui-react';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <>
    <Table celled className={transaction.amount < 0 ? 'minus' : 'plus'}>
      

      <Table.Body>
        <Table.Row>
          <Table.Cell width='six'>{transaction.text}</Table.Cell>
          <Table.Cell width='six'>{sign}{moneyFormatter(transaction.amount)}</Table.Cell>
          <Table.Cell width='six'></Table.Cell>
          <Button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">Delete</Button>
        </Table.Row>
      </Table.Body>

    </Table>
    </>
    
  )
}
