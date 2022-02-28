import faker from 'faker';
import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';
import { MinLengthValidation } from '../min-length/min-length-validation';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  it('should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).minLength(5).build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)]);
  });
});
