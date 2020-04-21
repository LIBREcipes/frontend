export default class RecipeCreateDto {
  name: string
  description: string
  portion_size: number
  portion_type: string
  is_public: boolean
  ingredients: []
  steps: []

  static fromFormValue(form): RecipeCreateDto {
    return form as RecipeCreateDto
  }
}
