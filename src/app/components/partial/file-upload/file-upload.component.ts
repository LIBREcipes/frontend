import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  forwardRef,
  ViewChild,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { ImageCropperComponent } from 'ngx-image-cropper'

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

  fileChangedEvent = null
  cropperConfig = {
    fileName: null,
    loading: true,
    rotate: 0,
    croppedImage: null,
  }

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent

  constructor(private host: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0)
    this.cropperConfig.fileName = file.name
  }

  fileChanged(event): void {
    this.fileChangedEvent = event
  }

  cropImage(): void {
    this.cropperConfig.loading = true
    this.imageCropper.crop()
  }
  imageCropped(event): void {
    const byteChars = atob(event.base64.split(',')[1])
    const byteNums = new Array(byteChars.length)
    for (let i = 0; i < byteChars.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i)
    }

    const blob: any = new Blob([new Uint8Array(byteNums)])
    blob.lastModifiedDate = new Date()
    blob.name = this.cropperConfig.fileName

    this.fileChangedEvent = null
    this.file = <File>blob
    this.onChange(<File>this.file)
  }

  writeValue(obj: any): void {
    if (obj == null) return

    let split: string = obj.file.split('/')
    this.file = <File>{
      name: split[split.length - 1],
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
