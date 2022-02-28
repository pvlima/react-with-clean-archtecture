import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';

function makeSut(fieldName: string) {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);

  return { sut, fieldValidationsSpy };
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = 'any_field';
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    fieldValidationsSpy[0].error = new Error('first_message_error');
    fieldValidationsSpy[1].error = new Error('second_message_error');
    const messageError = sut.validate(fieldName, 'any_value');
    expect(messageError).toBe('first_message_error');
  });

  it('should return falsy if none validation fails', () => {
    const fieldName = 'any_field';
    const { sut } = makeSut(fieldName);
    const messageError = sut.validate(fieldName, 'any_value');
    expect(messageError).toBeFalsy();
  });
});
