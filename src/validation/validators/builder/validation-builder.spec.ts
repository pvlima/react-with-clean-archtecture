import faker from 'faker';
import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('should return EmailFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });
});
