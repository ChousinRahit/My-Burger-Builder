import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigatinoItem from './NavigatinoItem/NavigatinoItem'

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })


  it("should render two naviagtion items if not authenticated", () => {
    expect(wrapper.find(NavigatinoItem)).toHaveLength(2);
  });


  it("should render two naviagtion items if authenticated", () => {
      wrapper.setProps({isAuthenticated:true})
    expect(wrapper.find(NavigatinoItem)).toHaveLength(3);
  });
});
