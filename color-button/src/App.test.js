import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';
import { primary, secondary, disable } from './defaults/colors';


test('button has correct initial color', () => {
  render(<App />);
  //find an element with a role of button and check its color
  const button = screen.getByRole('button', { name: `change to ${replaceCamelWithSpaces(secondary)}` });
  expect(button).toHaveStyle({ backgroundColor: primary });
});
test('should button turn secondary when clicked', () => { 
  render(<App />);
  const button = screen.getByRole('button', { name: `change to ${replaceCamelWithSpaces(secondary)}` });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: secondary });

  expect(button.textContent).toBe(`change to ${replaceCamelWithSpaces(primary)}`);
})

test('should button disabled when click on checkbox', () => { 
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: `change to ${replaceCamelWithSpaces(secondary)}` });
  expect(button).not.toBeDisabled();
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();
 })

test('should button turn gray when disable', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: `change to ${replaceCamelWithSpaces(secondary)}` });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: disable });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: primary });
  fireEvent.click(button)
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: disable });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: secondary });
})

describe('space before camel-case capital letters', () => {
  test('Works for no inner capital letters',() => {
    const result = replaceCamelWithSpaces('red');
    expect(result).toBe('red');
  })
  test('works for one inner capital letter', () => {
    const result = replaceCamelWithSpaces('redBlue');
    expect(result).toBe('red blue');
  })
  test('works for multiple inner capital letters', () => {
    const result = replaceCamelWithSpaces('redBlueGreen');
    expect(result).toBe('red blue green');
  })
  test('should return null when not a string', () => {
    const result = replaceCamelWithSpaces(1);
    expect(result).toBe(null);
  })

  test('Should return same string if has spaces', () => {
    const result = replaceCamelWithSpaces('red blue');
    expect(result).toBe('red blue');
    const result2 = replaceCamelWithSpaces('red blueGreen')
    expect(result2).toBe('red blueGreen');
  })

})