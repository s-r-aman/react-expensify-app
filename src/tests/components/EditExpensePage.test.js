import React from 'react';
import { shallow } from "enzyme";

import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper,editExpense, removeExpense, history;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense} 
      removeExpense={removeExpense} 
      history={history} 
      expense={expenses[0]}
    />
  );
});

describe('<EditExpensePage/>', () => {

  test("should render the Edit Expense Component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should handle the on submit prop properly", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
  });

  test('should handle the on remove prop properly', () => {
    wrapper.find("button").prop("onClick")();
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[0].id})    
  });
});