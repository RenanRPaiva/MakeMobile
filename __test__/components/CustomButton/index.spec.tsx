import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {CustomButton} from '../../../src/components/CustomButton';

describe('<CustomButton />', () => {
  it('Deve renderizar o botão com texto', () => {
    const {getByTestId} = render(<CustomButton>Label</CustomButton>);
    expect(getByTestId('btn')).toHaveTextContent('Label');
  });
  it('Deve chamar o evento on press', () => {
    const handlePress = jest.fn();
    render(<CustomButton onPress={handlePress}>Label</CustomButton>);
    fireEvent.press(screen.getByTestId('btn'));
    expect(handlePress).toBeCalledTimes(1);
  });
  it('Deve renderizar loading se loading for true', () => {
    render(<CustomButton loading>Label</CustomButton>);
    expect(screen.getByTestId('status')).not.toBeNull();
  });
  it('Não deve renderizar loading se loading for false', () => {
    render(<CustomButton loading={false}>Label</CustomButton>);
    expect(screen.queryByTestId('status')).toBeNull();
  });
  it('Não deve renderizar loading se loading não foi fornecido', () => {
    render(<CustomButton>Label</CustomButton>);
    expect(screen.queryByTestId('status')).toBeNull();
  });
  it('Se o botão desabilitado estiver desabilitado é fornecido', () => {
    const handlePress = jest.fn();
    render(<CustomButton disabled>Label</CustomButton>);
    const button = screen.getByTestId('btn');
    expect(button).toBeDisabled();
    fireEvent.press(button);
    expect(handlePress).toBeCalledTimes(0);
  });
});
