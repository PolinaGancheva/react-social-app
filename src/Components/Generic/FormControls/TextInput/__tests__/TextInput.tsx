import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInut', () => {
  it('renders without crashing', () => {
    render(<TextInput readOnly />);
  });

  it('renders properly', () => {
    render(<TextInput readOnly data-testid="myInput" />);
    expect(screen.queryByTestId('myInput')).toBeTruthy();
  });

  it('is controlled component', () => {
    const { rerender } = render(
      <TextInput readOnly data-testid="myInput" value="" />
    );

    const input = screen.getByTestId('myInput') as HTMLInputElement;
    expect(input.value).toEqual('');

    rerender(
      <TextInput readOnly data-testid="myInput" value="changed value" />
    );

    expect(input.value).toEqual('changed value');
  });

  it('calls onChange', () => {
    let value = '';

    render(
      <TextInput
        readOnly
        data-testid="myInput"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          value = e.target.value;
        }}
      />
    );

    fireEvent.change(screen.getByTestId('myInput'), {
      target: { value: 'I changed the value' },
    });

    expect(value).toEqual('I changed the value');
  });

  it('does not renders errors when the input is not touched', () => {
    render(
      <TextInput
        readOnly
        data-testid="myInput"
        errorMessage="Something went wrong"
      />
    );
    expect(screen.queryByText('Something went wrong')).toBeFalsy();
  });

  it('renders errors when the input is touched', () => {
    render(
      <TextInput
        readOnly
        data-testid="myInput"
        isTouched
        errorMessage="Something went wrong"
      />
    );
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('renders the label', () => {
    render(
      <TextInput
        readOnly
        name="username"
        data-testid="myInput"
        label="Username"
        errorMessage="Something went wrong"
      />
    );
    expect(screen.getByLabelText('Username')).toBeTruthy();
  });
});
