import React, {useState, useContext} from 'react'
import { GlobalContext } from '../Expenses/context/GlobalState';
import { Button, Form } from 'semantic-ui-react';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
        <label>Item</label>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter item..." />
        </Form.Field>
        <Form.Field>
        <label>Amount(negative - expense, positive - income)
        </label>
        <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </Form.Field>
        <Button className='btn' type='sumbit'> Add transaction</Button>
      </Form>
    </>
  )
}

