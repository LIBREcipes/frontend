import { createAction, props } from '@ngrx/store'
import Recipe from 'src/app/models/recipe.model'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import Ingredient from 'src/app/models/ingredient.model'
import RecipeIngredientDto from 'src/app/models/DTO/recipe-ingredient.model'
import RecipeStepDto from 'src/app/models/DTO/recipe-step.model'

export const ErrorRecipeAction = createAction('RECIPE - error', props<Error>())

export const GetRecipesAction = createAction('RECIPE - get all')
export const SuccessGetRecipesAction = createAction(
  'RECIPE - get all succeeded',
  props<{ payload: Recipe[] }>(),
)

export const GetRecipeAction = createAction(
  'RECIPE - get',
  props<{ uuid: string }>(),
)
export const SuccessGetRecipeAction = createAction(
  'RECIPE - get succeeded',
  props<Recipe>(),
)

export const GetForChefAction = createAction(
  'RECIPE - get for chef',
  props<{ chef_uuid: string }>(),
)
export const GetForChefSuccessAction = createAction(
  'RECIPE - get for chef succeeded',
  props<{ recipes: Recipe[] }>(),
)

export const CreateRecipeAction = createAction(
  'RECIPE - create',
  props<{ recipe: RecipeCreateDto }>(),
)
export const CreateRecipeSuccessAction = createAction(
  'RECIPE - create succeeded',
  props<Recipe>(),
)

export const DeleteRecipeAction = createAction(
  'RECIPE - delete',
  props<{ recipe_uuid: string }>(),
)
export const DeleteRecipeSuccessAction = createAction(
  'RECIPE - delete succeeded',
  props<{ recipe_uuid: string }>(),
)

export const UpdateRecipeIngredientsAction = createAction(
  'RECIPE - update ingredients',
  props<{ recipe_uuid: string; ingredients: RecipeIngredientDto }>(),
)

export const UpdateRecipeStepsAction = createAction(
  'RECIPE - update steps',
  props<{ recipe_uuid: string; steps: RecipeStepDto }>(),
)

export const UpdateRecipeSuccessAction = createAction(
  'RECIPE - update succeeded',
  props<{ recipe: Recipe }>(),
)

// INGREDIENTS

export const SearchIngredientAction = createAction(
  'INGREDIENT - search',
  props<{ query: string }>(),
)

export const SearchIngredientSuccessAction = createAction(
  'INGREDIENT - search succeeded',
  props<{ ingredients: Ingredient[] }>(),
)

export const GetIngredientAction = createAction(
  'INGREDIENT - get',
  props<{ ingredient_uuid: string }>(),
)

export const GetIngredientSuccessAction = createAction(
  'INGREDIENT - get succeeded',
  props<{ ingredient: Ingredient }>(),
)
