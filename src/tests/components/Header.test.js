import React from 'react';
import { shallow } from "enzyme";

import Header from '../../components/Header';

describe('<Header/>', () => {
  test('should render the Hedear component correctly', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
  });
});