import { FieldValidation } from '@/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldName: string) {
    return new ValidationBuilder(fieldName, []);
  }

  required() {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email() {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(minLength: number) {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength));
    return this;
  }

  build() {
    return this.validations;
  }
}
