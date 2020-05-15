import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import User from 'src/app/models/user.model'
import { LogoutAction } from 'src/app/store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Router } from '@angular/router'
import { WithDestroy } from 'src/app/mixins'
import { ModalService } from '../../modals/modal.service'
import { LoginFormComponent } from 'src/app/forms/login-form/login-form.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent extends WithDestroy() implements OnInit {
  isDropdownActive = false

  user: User

  navbarLinks = [
    {
      key: 'recipes',
      value: 'Recipes',
      link: '/recipes',
    },
    {
      key: 'myRecipes',
      value: 'My Recipes',
      auth: true,
    },
  ]

  userDropdownOptions = [
    {
      key: 'profile',
      icon: 'fa fa-user',
      value: 'Profile',
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
    private modalService: ModalService,
  ) {
    super()
    authenticationService.currentUser
      .pipe(
        takeUntil(this.destroy$),
        tap(user => {
          this.user = user
        }),
      )
      .subscribe()

    router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => (this.isDropdownActive = false))
  }

  ngOnInit(): void {}

  showLoginModal(): void {
    this.isDropdownActive = false
    this.modalService
      .showModal<User>(LoginFormComponent, {
        title: 'Login',
        confirmButtonText: 'Login',
        hideCancel: true,
        startDisabled: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  showRegistrationModal(): void {
    this.isDropdownActive = false
    this.modalService.showRegistrationForm()
  }

  onDropdownSelected(item) {
    if ('link' in item) {
      this.router.navigateByUrl(item['link'])
      return
    }

    switch (item['key']) {
      case 'myRecipes':
        this.router.navigate(['/chefs', this.user.uuid, 'recipes'])
        break
      case 'profile':
        this.router.navigate(['/chefs', this.user.uuid])
        break
      case 'signout':
        this.store.dispatch(LogoutAction())
        location.reload()
        break
    }
  }
}
