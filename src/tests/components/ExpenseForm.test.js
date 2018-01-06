import React from 'react';
import { shallow } from "enzyme";
import moment from "moment";

import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

describe('<ExpenseForm/>', () => {

  test('should render the expense form correctly without data', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the expense form correctly with data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('error').length).toBeGreaterThan(0);
  });

  test('should set the description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'My Description'
    wrapper.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
  });

  test('should set the note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const value = 'My note';
    wrapper.find('textarea').simulate('change', {
      target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
  });

  test("should set amount on valid amount input", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.12";
    wrapper.find("input").at(1).simulate("change", { target: { value } });
    expect(wrapper.state("amount")).toBe(value);
  });

  test("should set amount on invalid amount input", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.128787878";
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value } });
    expect(wrapper.state("amount")).toBe('');
  });

  test('should call on submit prop on valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expenses[0].description,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt,
      amount: expenses[0].amount
    });
  });

  test('should call the datechangepicker correctly', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
  });

  test('should call the focus changer correctly', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toEqual(focused);
  });
});