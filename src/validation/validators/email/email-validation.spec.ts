import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

function makeSut() {
  const sut = new EmailValidation(faker.random.word());
  return { sut };
}

describe('EmailValidation', () => {
  it('shold return error if email is invalid', () => {
    const { sut } = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });

  it('shold return falsy if email is valid', () => {
    const { sut } = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
