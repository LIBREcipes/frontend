import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { NotificationService } from '../../partial/notification/notification.service'

@Component({
  selector: 'app-shortlink-to-recipe',
  templateUrl: './shortlink-to-recipe.component.html',
  styleUrls: ['./shortlink-to-recipe.component.sass'],
})
export class ShortlinkToRecipeComponent implements OnInit {
  token: string = null
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notify: NotificationService,
  ) {
    this.token = route.snapshot.params['token']
  }

  ngOnInit(): void {
    this.apiService.getRecipeUuidFromShortlink(this.token).subscribe(
      resp => {
        this.router.navigate(['recipes', resp['recipe_uuid']])
      },
      error => {
        this.notify.showNotification('Could not get this recipe', false)
        this.router.navigateByUrl('')
      },
    )
  }
}
