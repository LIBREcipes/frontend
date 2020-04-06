import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import User from 'src/app/models/user.model'
import { LogoutAction } from 'src/app/store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  private destroyed$ = new Subject<boolean>()

  user: User

  userDropdownOptions = [
    {
      key: 'myRecipes',
      icon: 'fa fa-book',
      value: 'My Recipes',
    },
    {
      key: 'signout',
      icon: 'fa fa-sign-out',
      value: 'Sign Out',
    },
  ]

  constructor(
    private store: Store<AppState>,
    authenticationService: AuthenticationService,
  ) {
    authenticationService.currentUser
      .pipe(
        takeUntil(this.destroyed$),
        tap((user) => {
          this.user = user
        }),
      )
      .subscribe()
  }

  ngOnInit(): void {}

  onDropdownSelected(key) {
    switch (key) {
      case 'myRecipes':
        console.log(key)
        break
      case 'signout':
        this.store.dispatch(LogoutAction())
        break
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
