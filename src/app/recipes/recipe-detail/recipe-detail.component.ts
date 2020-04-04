import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {

  recipe = {
        "url": "http://localhost:5000/api/recipes/1/",
        "ingredients": [
            {
                "id": 1,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/1/",
                    "uuid": "a67dbbd9-275a-4e6b-b10f-90d3cf59e2f1",
                    "name": "Zelfrijzende Bloem",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": null,
                    "calories": null,
                    "fat": null,
                    "fat_saturated": null,
                    "carbs": null,
                    "carbs_sugar": null,
                    "proteine": null,
                    "brand": null
                },
                "amount": 500.0,
                "unit": "g",
                "recipe": 1
            },
            {
                "id": 2,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/2/",
                    "uuid": "20513fdd-1251-4cac-8ab9-e2542b61bc45",
                    "name": "Halfvolle Melk",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": "ml",
                    "calories": 46,
                    "fat": 1.5,
                    "fat_saturated": 1.0,
                    "carbs": 4.8,
                    "carbs_sugar": 4.8,
                    "proteine": 3.3,
                    "brand": null
                },
                "amount": 1.0,
                "unit": "liter",
                "recipe": 1
            },
            {
                "id": 3,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/3/",
                    "uuid": "1b96f24c-97d3-4869-b953-8ef64e9d2904",
                    "name": "Eieren",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": null,
                    "calories": null,
                    "fat": null,
                    "fat_saturated": null,
                    "carbs": null,
                    "carbs_sugar": null,
                    "proteine": null,
                    "brand": null
                },
                "amount": 4.0,
                "unit": null,
                "recipe": 1
            },
            {
                "id": 4,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/4/",
                    "uuid": "b2e06106-b3ae-4ef7-9227-5643d6d924e7",
                    "name": "Vanillesuiker",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": null,
                    "calories": null,
                    "fat": null,
                    "fat_saturated": null,
                    "carbs": null,
                    "carbs_sugar": null,
                    "proteine": null,
                    "brand": null
                },
                "amount": 2.0,
                "unit": "pakjes",
                "recipe": 1
            },
            {
                "id": 5,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/5/",
                    "uuid": "de92b700-0c40-4592-afc1-6ed4384ba54d",
                    "name": "Vanillebloem",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": null,
                    "calories": null,
                    "fat": null,
                    "fat_saturated": null,
                    "carbs": null,
                    "carbs_sugar": null,
                    "proteine": null,
                    "brand": null
                },
                "amount": 1.0,
                "unit": "pakje",
                "recipe": 1
            },
            {
                "id": 6,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/6/",
                    "uuid": "288e5984-4536-4c21-85ff-8c2f16b6aec8",
                    "name": "Olijfolie",
                    "language": "nl",
                    "barcode": null,
                    "default_unit": null,
                    "calories": null,
                    "fat": null,
                    "fat_saturated": null,
                    "carbs": null,
                    "carbs_sugar": null,
                    "proteine": null,
                    "brand": null
                },
                "amount": 1.0,
                "unit": "lepel",
                "recipe": 1
            }
        ],
        "chef": {
            "url": "http://localhost:5000/api/user/1/",
            "username": "mattydebie",
            "first_name": "",
            "last_name": "",
            "email": "matthias@admin.be"
        },
        "uuid": "bbd34ee8-9daf-4256-a9a5-709499b16ec7",
        "name": "Pannekoeken",
        "language": "nl",
        "created_date": "2020-04-02T11:09:12.284744Z",
        "modified_date": "2020-04-02T21:20:09.526044Z",
        "image": "http://localhost:5000/media/5654e940-e667-4186-90ad-ec53aeabe5cb..jpg",
        "is_public": true
    }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
        const uuid = params['recipe_uuid'];
        console.log(uuid);
      });
  }

}
