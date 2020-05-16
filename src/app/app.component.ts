import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'librecipes'

  constructor() {
    this.title = environment.config.title
  }

  get version(): string {
    return environment.version
  }
}
