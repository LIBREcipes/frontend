import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  forwardRef,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  @Input() accept: string = '*'

  file: File = null
  private onChange: Function

  constructor(private host: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0)
    this.file = file
    this.onChange(file)
  }

  writeValue(obj: any): void {
    console.log('file-upload-writeValue', obj)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
