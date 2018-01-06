import React from 'react';
import { shallow } from "enzyme";

import expenses from "../fixtures/expenses";
import { ExpenseList } from "../../components/ExpenseList";

describe('<ExpenseList/>', () => {
  test('should render the expenselist correctly with some expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
  });
  test("should render the expenselist correctly without any expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});