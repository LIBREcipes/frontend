import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core'

@Directive({
  selector: '[appConfirm]',
})
export class ConfirmDirective implements OnInit {
  private originalText
  private currentTimer

  @Output() confirm = new EventEmitter()

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.originalText = this.element.nativeElement.innerHTML
  }

  setInner(html) {
    this.element.nativeElement.innerHTML = html
  }

  @HostListener('click')
  onClick() {
    if (this.currentTimer) {
      this.confirm.emit()
      clearTimeout(this.currentTimer)
      this.currentTimer = null
      this.setInner(this.originalText)
      return
    }

    this.setInner(`
      <span class="icon"><i class="fas fa-exclamation-circle"></i></span>
      <span>Click to confirm</span>`)
    this.currentTimer = setTimeout(() => {
      this.setInner(this.originalText)
      this.currentTimer = null
    }, 3000)
  }
}
