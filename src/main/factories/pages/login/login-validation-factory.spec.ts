import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';
import { makeLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').email().required().build(),
        ...ValidationBuilder.field('password').min(5).required().build(),
      ]),
    );
  });
});
