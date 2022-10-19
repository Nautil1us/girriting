import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('home work as expected', async () => {
  render(<App />)
  const input = await screen.findByRole('textbox')
  fireEvent.change(input , { target: { value: 'Matrix'}})
});


