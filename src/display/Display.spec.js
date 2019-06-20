// Test away!

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';

import Display from './Display';



describe('<Display />', () => {
    it('make sure gates exist and set to default unlocked and open, and with green light', () => {
        const { getByText } = render(<Display />);
        getByText(/unlocked/i);
        getByText(/open/i);
        expect(getByText(/open/i).className).toContain('green-led');
        expect(getByText(/unlocked/i).className).toContain('green-led');
    })

    it('gate is open, locked can only be false, shows proper display and color', () => {
        const { getByText } = render(<Display closed={false} locked={false}/>);
        expect(getByText("Open").className).toContain('green-led')
        expect(getByText("Unlocked").className).toContain('green-led')
       
    })

    it('door is closed and locked shows proper display and color ', () => {
        const { getByText } = render(<Display closed={true} locked={true}/>);
        expect(getByText("Closed").className).toContain('red-led')
        expect(getByText("Locked").className).toContain('red-led')

    })

    it('door is closed and unlocked shows proper display and color', () => {
        const { getByText } = render(<Display locked={false} closed={true}/>)
        expect(getByText("Unlocked").className).toContain('green-led')
        expect(getByText("Closed").className).toContain('red-led')

    })

   
//npm test -- --verbose
//yarn test --verbose




})

/*

### Display Component

- displays if gate is open/closed and if it is locked/unlocked
- displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise
- displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise
- when `locked` or `closed` use the `red-led` class
- when `unlocked` or `open` use the `green-led` class

*/