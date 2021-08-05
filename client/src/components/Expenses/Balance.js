import React, { useContext } from 'react';
import { GlobalContext } from '../Expenses/context/GlobalState';
import { Message } from 'semantic-ui-react';

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

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
    <Message className='balance-message'>
      <Message.Header>Your Balance</Message.Header>
    
      <h1>{moneyFormatter(total)}</h1>
    </Message>
    </>
  )
}
