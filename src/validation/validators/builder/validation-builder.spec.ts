import faker from 'faker';
import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });
});
