// Test away!

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { getByTestId } from '@testing-library/dom'

import Controls from './Controls';
import Dashboard from '../dashboard/Dashboard';
import Display from '../display/Display';

describe('<Controls />', () => {
    
    const container = document.body

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
    it('when Close Gate button is clicked, shows all proper response for all buttons and display',  () => {
        const { getByText } = render(<Controls closed={false} locked={false}/>)
        const closeButton = getByText('Close Gate');
        fireEvent.click(closeButton);      
        const { container } = render(<Display closed={true} locked={false}/>);
        const closeStatus = getByTestId(container, 'closeStatus');
        const lockStatus = getByTestId(container,'lockStatus');
        expect(closeStatus.textContent).toBe("Closed")
        expect(lockStatus.textContent).toBe("Unlocked")
        expect(closeStatus.className).toContain("led red-led")
        expect(lockStatus.className).toContain("led green-led")
    })

    //check for clicking open gate button when the gate is closed and unlocked
    
    it('when Open Gate button is clicked, shows all proper response for all buttons and display', () => {
        const { getByText } = render(<Controls closed={true} locked={false}/>)
        const closeButton = getByText("Open Gate");
        fireEvent.click(closeButton);      
        const { container } = render(<Display closed={false} locked={false}/>);
        const closeStatus = getByTestId(container, 'closeStatus');
        const lockStatus = getByTestId(container,'lockStatus');
        expect(closeStatus.textContent).toBe("Open")
        expect(lockStatus.textContent).toBe("Unlocked")
        expect(closeStatus.className).toContain("led green-led")
        expect(lockStatus.className).toContain("led green-led")
        

    })

    it('When Lock Gate button is clicked, shows all proper response for all buttons and display', () => {
        const { getByText } = render(<Controls closed={true} locked={false}/>)
        const button = getByText("Lock Gate");
        fireEvent.click(button);      
        const { container } = render(<Display closed={true} locked={true}/>);
        const closeStatus = getByTestId(container, 'closeStatus');
        const lockStatus = getByTestId(container,'lockStatus');
        expect(closeStatus.textContent).toBe("Closed")
        expect(lockStatus.textContent).toBe("Locked")
        expect(closeStatus.className).toContain("led red-led")
        expect(lockStatus.className).toContain("led red-led")
        
    })

    it('when Unlock Gate button is clicked, shows all proper response for all buttons and display',() => {
        const { getByText } = render(<Controls closed={true} locked={true}/>)
        const button = getByText("Unlock Gate");
        fireEvent.click(button);      
        const { container } = render(<Display closed={true} locked={false}/>);
        const closeStatus = getByTestId(container, 'closeStatus');
        const lockStatus = getByTestId(container,'lockStatus');
        expect(closeStatus.textContent).toBe("Closed")
        expect(lockStatus.textContent).toBe("Unlocked")
        expect(closeStatus.className).toContain("led red-led")
        expect(lockStatus.className).toContain("led green-led")
    })


})



/*
### Controls Component

- provide buttons to toggle the `closed` and `locked` states.
- buttons' text changes to reflect the state the door will be in if clicked
- the closed toggle button is disabled if the gate is locked
- the locked toggle button is disabled if the gate is open
*/