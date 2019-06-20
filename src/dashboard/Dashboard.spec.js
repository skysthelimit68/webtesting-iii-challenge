// Test away

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';

import Dashboard from './Dashboard';

it('matches snapshot', () => {
    const { container } = render (<Dashboard />);
    expect(container).toMatchSnapshot();
})

it('make sure 2 buttons exist and set to default lock gate and close gate when app starts', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/lock gate/i);
    getByText(/close gate/i);
    expect(getByText('Lock Gate').disabled).toBeTruthy();
    expect(getByText('Close Gate').disabled).toBeFalsy();
})