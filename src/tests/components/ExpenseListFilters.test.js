import React from 'react';
import {shallow} from 'enzyme';
import moment from "moment";

import { filters, altfilters } from "../fixtures/filters";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";

let wrapper, sortByAmount, sortByDate, setTextFilter, setStartDate, setEndDate;

beforeEach(() => {
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setTextFilter={setTextFilter}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
});

describe('<ExpenseListFilter/>', () => {
  
  test('should render the component correclty', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the component correclty with alternate data", () => {
    wrapper.setProps({filters: altfilters});
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle the text change properly', () => {
    const value = 'bills';
    wrapper.find('input').at(0).simulate('change', {
      target: {value}
    });
    expect(setTextFilter).toHaveBeenCalledWith(value);
  });

  test("should handle the sort by amount properly", () => {
    const value = "amount";
    wrapper
      .find("select")
      .simulate("change", { target: { value } });
    expect(sortByAmount).toHaveBeenCalled();
  });

  test("should handle the sort by date properly", () => {
    const value = "date";
    wrapper.find("select").simulate("change", { target: { value } });
    expect(sortByDate).toHaveBeenCalled();
  });

  test("should handle the date change properly", () => {
    const dates = {
      startDate: moment(0),
      endDate: moment(0).add(4, 'days')
    };
    wrapper.find("DateRangePicker").prop('onDatesChange')({...dates});
    expect(setStartDate).toHaveBeenCalledWith(dates.startDate);
    expect(setEndDate).toHaveBeenCalledWith(dates.endDate);
  });

  test('should handle the focus change properly', () => {
    const calendarFocused = "startDate";
    wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  });
});