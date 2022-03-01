import { Validation } from '@/presentation/protocols';
import {
  ValidationComposite,
  ValidationBuilder,
} from '@/validation/validators';

export function makeLoginValidation(): Validation {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build(),
  ]);
}
