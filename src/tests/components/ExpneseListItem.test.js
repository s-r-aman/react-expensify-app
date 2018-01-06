import React from 'react';
import { shallow } from "enzyme";

import expenses from "../fixtures/expenses";
import ExpenseListItem from "../../components/ExpenseListItem";

describe('<ExpenseListItem/>', () => {
  test('should render the expense list item correctly with the given data', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
  });
});