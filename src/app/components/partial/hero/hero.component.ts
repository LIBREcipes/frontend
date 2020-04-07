import { Component, OnInit, Input, Output } from '@angular/core'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass'],
})
export class HeroComponent implements OnInit {
  @Input() title = 'Hero'
  @Input() subtitle = null
  @Input() subtitleAction = null

  constructor() {}

  ngOnInit(): void {}
}
