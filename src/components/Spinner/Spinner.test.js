import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    test('renders spinner correctly', () => {
        render(<Spinner />);
        const spinnerContainer = screen.getByRole('status');
        expect(spinnerContainer).toBeInTheDocument();
        const visuallyHiddenText = screen.getByText('Loading...');
        expect(visuallyHiddenText).toBeInTheDocument();
    });
});
