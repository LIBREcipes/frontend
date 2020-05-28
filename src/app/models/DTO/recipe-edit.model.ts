import RecipeCreateDto from './recipe-create.model'

export default class RecipeEditDto {
  public uuid: string
  public name: string
  public description: string
  public portion_size: number
  public portion_type: string
  public is_public: boolean
  public image: File
  public image_id: number

  constructor(recipe) {
    this.uuid = recipe.uuid
    this.name = recipe.name
    this.description = recipe.description
    this.portion_type = recipe.portion_type
    this.portion_size = recipe.portion_size
    this.is_public = recipe.is_public
    if (
      recipe.image &&
      (recipe.image instanceof File || recipe.image instanceof Blob)
    ) {
      this.image = recipe.image
    }
    this.image_id = recipe.image_id
  }
}
