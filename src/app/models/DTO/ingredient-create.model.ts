export default class IngredientCreateDto {
  name: string

  static fromFormValue(form): IngredientCreateDto {
    return form
  }
}
