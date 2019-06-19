// Test away!

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';

import Controls from './Controls';
import Dashboard from '../dashboard/Dashboard';

describe('<Controls />', () => {
    
    //gate is open and unlocked
    it('make sure 2 buttons exist and set to default lock gate and close gate when app starts', () => {
        const { getByText } = render(<Controls />);
        getByText(/lock gate/i);
        getByText(/close gate/i);
        expect(getByText("Lock Gate").disabled).toBeTruthy();
        expect(getByText("Close Gate").disabled).toBeFalsy();
    })

    //gate is closed and unlocked
    it('gate is closed and unlocked', () => {
        const { getByText } = render(<Controls closed={true} locked={false}/>) 
        getByText(/open gate/i)
        getByText(/lock gate/i)
        expect(getByText("Open Gate").disabled).toBeFalsy();
        expect(getByText("Lock Gate").disabled).toBeFalsy();

    })

    //gate is closed and locked
    it('gate is closed and locked', () => {
        const { getByText } = render(<Controls closed={true} locked={true}/>)
        getByText(/open gate/i)
        getByText(/unlock gate/i)
        expect(getByText("Open Gate").disabled).toBeTruthy();
        expect(getByText("Unlock Gate").disabled).toBeFalsy();
    })

    //check for clicking close gate button when the gate is open and unlocked
    it('when Close Gate button is clicked, shows all proper response for all buttons and display', () => {
        const { getByText } = render(<Dashboard closed={false} locked={false}/>)
        const button = getByText("Close Gate");
        const openButton = getByText('Open');
        const unlockButton = getByText("Unlocked");
        fireEvent.click(button);
        expect(openButton.textContent).toBe("Closed")
        expect(unlockButton.textContent).toBe("Unlocked")
        expect(openButton.className).toContain("red-led")
        expect(unlockButton.className).toContain("green-led")
    })

    //check for clicking open gate button when the gate is closed and unlocked
    /*
    it('when Open Gate button is clicked, shows all proper response for all buttons and display', () => {
        const { getByText } = render(<Dashboard closed={true} locked={false}/>)
        const button = getByText("Open Gate");
        const closeButton = getByText('Closed');
        const unlockButton = getByText("Unlocked");
        fireEvent.click(button);
        expect(closeButton.textContent).toBe("Open")
        expect(unlockButton.textContent).toBe("Unlocked")
        expect(closeButton.className).toContain("green-led")
        expect(unlockButton.className).toContain("green-led")
    })
    */
    
})


/*
### Controls Component

- provide buttons to toggle the `closed` and `locked` states.
- buttons' text changes to reflect the state the door will be in if clicked
- the closed toggle button is disabled if the gate is locked
- the locked toggle button is disabled if the gate is open
*/