import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

  title = 'Recipes';
  recipes = [
    {
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
    },
    {
        "url": "http://localhost:5000/api/recipes/2/",
        "ingredients": [
            {
                "id": 7,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/7/",
                    "uuid": "2e6e10b2-4bef-4d17-aae5-70cfa84dc0d9",
                    "name": "Appel",
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
                "amount": 3.0,
                "unit": "stuks",
                "recipe": 2
            },
            {
                "id": 8,
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
                "amount": 2.0,
                "unit": "stuks",
                "recipe": 2
            },
            {
                "id": 9,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/8/",
                    "uuid": "1cc42494-87e1-48e3-aa4a-ec4e489a0370",
                    "name": "Suiker",
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
                "amount": 120.0,
                "unit": "gram",
                "recipe": 2
            },
            {
                "id": 10,
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
                "amount": 3.0,
                "unit": "zakjes",
                "recipe": 2
            },
            {
                "id": 11,
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
                "amount": 190.0,
                "unit": "gram",
                "recipe": 2
            },
            {
                "id": 12,
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
                "amount": 4.0,
                "unit": "eetlepel",
                "recipe": 2
            },
            {
                "id": 13,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/9/",
                    "uuid": "990c7b3a-21fb-4a2d-b9f2-0eb3c3654c55",
                    "name": "Zonnebloemolie",
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
                "unit": "eetlepel",
                "recipe": 2
            },
            {
                "id": 14,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/10/",
                    "uuid": "ffcf9744-324d-43d5-9fa6-3658added881",
                    "name": "Zout",
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
                "unit": "snuifje",
                "recipe": 2
            }
        ],
        "chef": {
            "url": "http://localhost:5000/api/user/1/",
            "username": "mattydebie",
            "first_name": "",
            "last_name": "",
            "email": "matthias@admin.be"
        },
        "uuid": "2772b95d-21ae-4ffb-b925-923309fd1efd",
        "name": "Appeltaart",
        "language": "nl",
        "created_date": "2020-04-02T11:09:12.284744Z",
        "modified_date": "2020-04-02T21:33:32.885370Z",
        "image": null,
        "is_public": false
    },
    {
        "url": "http://localhost:5000/api/recipes/3/",
        "ingredients": [
            {
                "id": 15,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/11/",
                    "uuid": "e4a32c14-c21f-4688-8334-aff04c6c6d0f",
                    "name": "rozijnen",
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
                "amount": 100.0,
                "unit": "g",
                "recipe": 3
            },
            {
                "id": 16,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/12/",
                    "uuid": "41cb39e5-e473-4c23-a80a-df30c0f3363b",
                    "name": "rum",
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
                "amount": 0.5,
                "unit": "dl",
                "recipe": 3
            },
            {
                "id": 17,
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
                "amount": 6.0,
                "unit": "dl",
                "recipe": 3
            },
            {
                "id": 18,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/13/",
                    "uuid": "8bc56d35-1f1b-41bd-b18c-a33292f23ebe",
                    "name": "Vaniilestokje",
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
                "unit": "stuk",
                "recipe": 3
            },
            {
                "id": 19,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/14/",
                    "uuid": "5c46304e-5c3f-4070-af7b-e7ed4d1744aa",
                    "name": "Oud wit brood",
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
                "amount": 398.0,
                "unit": "g",
                "recipe": 3
            },
            {
                "id": 20,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/15/",
                    "uuid": "989f33a1-4f08-4071-80e9-35dd2b8b3bef",
                    "name": "Kaneelpoedr",
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
                "unit": "lepeltje",
                "recipe": 3
            },
            {
                "id": 21,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/16/",
                    "uuid": "1591e6a7-9238-4273-83ae-eab62ba06205",
                    "name": "Bruine Suiker",
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
                "amount": 80.0,
                "unit": "g",
                "recipe": 3
            },
            {
                "id": 22,
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
                "amount": 3.0,
                "unit": null,
                "recipe": 3
            },
            {
                "id": 23,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/17/",
                    "uuid": "c5f8bb09-1fca-4fc8-835c-ded92d53133e",
                    "name": "Peperkoek",
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
                "amount": 3.0,
                "unit": "sneetjes",
                "recipe": 3
            },
            {
                "id": 24,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/18/",
                    "uuid": "0dae5aa9-1458-4056-9f07-e1a838abac6b",
                    "name": "Witte Chocolade",
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
                "amount": 100.0,
                "unit": "g",
                "recipe": 3
            },
            {
                "id": 25,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/19/",
                    "uuid": "493a2c2d-b67b-4ed0-9a34-550aa8e2e988",
                    "name": "Zout",
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
                "unit": "snuifje",
                "recipe": 3
            },
            {
                "id": 26,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/20/",
                    "uuid": "bebc6366-de54-47ad-ac41-95f4b069f453",
                    "name": "Boter",
                    "language": "en",
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
                "unit": "klontje",
                "recipe": 3
            },
            {
                "id": 27,
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
                "amount": 1.0,
                "unit": "lepel",
                "recipe": 3
            },
            {
                "id": 28,
                "ingredient": {
                    "url": "http://localhost:5000/api/ingredients/21/",
                    "uuid": "829d1899-607d-426a-b6da-e9524244776e",
                    "name": "Bloemsuiker",
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
                "recipe": 3
            }
        ],
        "chef": {
            "url": "http://localhost:5000/api/user/2/",
            "username": "test",
            "first_name": "",
            "last_name": "",
            "email": ""
        },
        "uuid": "464af905-17cf-4e1d-ae7e-ad70300bce25",
        "name": "Broodpudding",
        "language": "nl",
        "created_date": "2020-04-02T21:18:49.032620Z",
        "modified_date": "2020-04-02T22:34:01.178433Z",
        "image": null,
        "is_public": true
    }
]

  constructor() { }

  ngOnInit(): void {
  }

}
