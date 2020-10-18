import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass'],
})
export class RatingComponent implements OnInit {
  @Input() rating: number
  @Input() amountOfRatings: number

  stars = []

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      if (i <= this.rating) this.stars.push('fas fa-star fa-fw')
      else if (i == Math.ceil(this.rating))
        this.stars.push('fas fa-star-half-alt fa-fw')
      else this.stars.push('far fa-star fa-fw')
    }
  }
}
