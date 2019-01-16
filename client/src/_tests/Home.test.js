import React from 'react';
import { shallow } from 'enzyme';
import Home from '../pages/Home/Home';
import { Input } from 'antd';

describe('<Home />', ()=>{
    it('renders one Input.Search component', ()=>{
        const wrapper = shallow(<Home />);
        expect(wrapper.find(Input.Search)).toHaveLength(1);
    });
})