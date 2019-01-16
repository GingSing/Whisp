import React from 'react';
import { shallow } from 'enzyme';
import Page from '../pages/Page/Page';

describe('<Page />', () => {
    it('renders children when passed in', () => {
        const wrapper = shallow((
            <Page>
                <div className="example" />
            </Page>
        ));
        expect(wrapper.contains(<div className="example" />)).toBe(true);
    })
})