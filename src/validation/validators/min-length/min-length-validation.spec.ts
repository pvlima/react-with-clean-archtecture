import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

function makeSut() {
  const sut = new MinLengthValidation(faker.database.column(), 5);
  return { sut };
}

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const { sut } = makeSut();
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError());
  });

  it('should return falsy if value is valid', () => {
    const { sut } = makeSut();
    const error = sut.validate('12345');
    expect(error).toBeFalsy();
  });
});
