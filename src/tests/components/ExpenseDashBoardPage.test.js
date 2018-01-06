import React from 'react';
import { shallow } from "enzyme";

import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

describe('<ExpenseDashboardPage/>', () => {
  test('should render the expense dashboard correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage/>);
    expect(wrapper).toMatchSnapshot();
  });
});