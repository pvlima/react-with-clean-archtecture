import { FieldValidation } from '@/validation/protocols';
import { RequiredFieldValidation } from '@/validation/validators';

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

  build() {
    return this.validations;
  }
}
