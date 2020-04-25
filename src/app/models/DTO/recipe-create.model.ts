import { FormGroup } from '@angular/forms'

export default class RecipeCreateDto {
  constructor(
    public name: string,
    public description: string,
    public portion_size: number,
    public portion_type: string,
    public is_public: boolean,
    public ingredients: [],
    public steps: [],
    public image: File,
    public image_id: number,
  ) {}

  static fromFormValue(form): RecipeCreateDto {
    return <RecipeCreateDto>form
  }
}
