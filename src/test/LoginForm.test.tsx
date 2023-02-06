import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('has email and password field and sign in button', () => {
    render(<LoginForm />);
    screen.getByPlaceholderText('Email');
    screen.getAllByPlaceholderText('Password');
    screen.getByRole('button');
  });

  it('changes input', () => {
    render(<LoginForm />);
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    userEvent.type(email, 'gumayusi@t1.gg');
    userEvent.type(password, '1111');
    expect(email).toHaveAttribute('value', 'gumayusi@t1.gg');
    expect(password).toHaveAttribute('value', '1111');
  });

  it('disables and enables input fields and sign in button', () => {
    render(<LoginForm />);
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    let button = screen.getByRole('button');
    userEvent.type(email, 'gumayusi@t1.gg');
    userEvent.type(password, '1111');
    userEvent.click(button);
    expect(email).toBeDisabled();
    expect(password).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
