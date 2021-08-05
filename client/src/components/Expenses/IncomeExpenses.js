import React, { useContext } from 'react';
import { GlobalContext } from '../Expenses/context/GlobalState';
import { FaRegSmile, FaRegSadTear } from 'react-icons/fa';
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

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  return (
    <Message className="income-expenses-container">
        <Message.Header><FaRegSmile /> Income</Message.Header>
        <h2 className="money plus" style={{color:'green'}}>{moneyFormatter(income)}</h2>
        <br />
        <Message.Header><FaRegSadTear /> Expenses</Message.Header>
        <h2 className="money minus" style={{color:'red'}}>{moneyFormatter(expense)}</h2>
    </Message>
  )
}
