import faker from 'faker';
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
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const messageError = faker.random.words();
    fieldValidationsSpy[0].error = new Error(messageError);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBe(messageError);
  });

  it('should return falsy if none validation fails', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const messageError = sut.validate(fieldName, faker.random.word());
    expect(messageError).toBeFalsy();
  });
});
