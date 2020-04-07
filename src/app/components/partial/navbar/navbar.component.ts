import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import User from 'src/app/models/user.model'
import { LogoutAction } from 'src/app/store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  private destroyed$ = new Subject<boolean>()
  isActive = false

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
    private router: Router,
  ) {
    authenticationService.currentUser
      .pipe(
        takeUntil(this.destroyed$),
        tap(user => {
          this.user = user
        }),
      )
      .subscribe()
  }

  ngOnInit(): void {}

  onDropdownSelected(key) {
    switch (key) {
      case 'myRecipes':
        this.router.navigate(['/chefs', this.user.uuid, 'recipes'])
        break
      case 'signout':
        this.store.dispatch(LogoutAction())
        location.reload()
        break
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
