import { Component, OnInit, OnDestroy } from '@angular/core'
import AppState from 'src/app/store/states/app.state'
import { Store, select } from '@ngrx/store'
import { map, filter, takeUntil } from 'rxjs/operators'
import { GetChefAction } from 'src/app/store/actions/chef.actions'
import { ActivatedRoute } from '@angular/router'
import User from 'src/app/models/user.model'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.sass'],
})
export class ChefDetailComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  private chefUuid: string

  chef: User = null

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chefUuid = params['chef_uuid']
    })

    this.store
      .pipe(select('chefs'))
      .pipe(
        takeUntil(this.destroyed$),
        map(x => {
          this.chef = x.chefs.find(chef => chef.uuid === this.chefUuid)
        }),
      )
      .subscribe()

    this.store.dispatch(GetChefAction({ uuid: this.chefUuid }))
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
