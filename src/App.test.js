import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders dashboard heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/გამარჯობა, გიორგი!/i);
  expect(linkElement).toBeInTheDocument();
});
