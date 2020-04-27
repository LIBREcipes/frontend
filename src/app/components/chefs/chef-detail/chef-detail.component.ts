import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { map, takeUntil } from 'rxjs/operators'
import { WithDestroy } from 'src/app/mixins'
import User from 'src/app/models/user.model'
import { GetChefAction } from 'src/app/store/actions/chef.actions'
import AppState from 'src/app/store/states/app.state'

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.sass'],
})
export class ChefDetailComponent extends WithDestroy()
  implements OnInit, OnDestroy {
  private chefUuid: string

  chef: User = null

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chefUuid = params['chef_uuid']
    })

    this.store
      .pipe(select('chefs'))
      .pipe(
        takeUntil(this.destroy$),
        map(x => {
          this.chef = x.chefs.find(chef => chef.uuid === this.chefUuid)
        }),
      )
      .subscribe()

    this.store.dispatch(GetChefAction({ uuid: this.chefUuid }))
  }
}
