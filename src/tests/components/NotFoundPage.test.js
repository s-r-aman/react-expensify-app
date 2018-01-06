import React from "react";
import { shallow } from "enzyme";

import NotFoundPage from "../../components/NotFoundPage";

describe("<NotFoundPage/>", () => {
  test("should render the not found correctly", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
