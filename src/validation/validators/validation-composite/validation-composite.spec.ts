import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field');
    fieldValidationSpy.error = new Error('first_message_error');
    const fieldValidationSpy2 = new FieldValidationSpy('any_field');
    fieldValidationSpy2.error = new Error('second_message_error');
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    const messageError = sut.validate('any_field', 'any_value');
    expect(messageError).toBe('first_message_error');
  });
});
