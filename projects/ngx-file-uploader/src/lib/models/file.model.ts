import { Subject } from 'rxjs/internal/Subject';
import { FileModelStatus } from '../enums/file-model-status.enum';
import { Guid } from '../utilities/classes/Guid';

export class FileModel {
  constructor(
    fileName: string,
    externalId: string,
    size = 0,
    downloadUrl: string | null = null,
    file: File | null = null
  ) {
    this._name = fileName;
    this._externalId = externalId;
    this._uniqueId = Guid.newGuid();
    this._size = size;
    this._downloadUrl = downloadUrl;
    this._file = file;
    this._status = FileModelStatus.Initialized;
  }
  private _name: string;
  public get fileName(): string {
    return this._name;
  }

  private _externalId: string;
  public get externalId(): string {
    return this._externalId;
  }

  private _uniqueId: string;
  public get uniqueId(): string {
    return this._uniqueId;
  }

  private _size: number;
  public get size(): number {
    return this._size;
  }

  private _downloadUrl: string | null;
  public get downloadUrl(): string | null {
    return this._downloadUrl;
  }

  // private _content: string | ArrayBuffer;
  // public get content(): string | ArrayBuffer { return this._content; }
  private _file: File | null;
  public get file(): File | null {
    return this._file;
  }

  private _status: FileModelStatus;
  public get status(): FileModelStatus {
    return this._status;
  }

  public get fileExtension(): string {
    return this.fileName.split('.').pop()?.trim().toLowerCase() ?? '';
  }

  private _progressPercentage: number = 0;
  public get progressPercentage(): number {
    return this._progressPercentage;
  }

  public get isError(): boolean {
    return (
      this.status !== FileModelStatus.Ok &&
      this.status !== FileModelStatus.Initialized
    );
  }
  public get isValid(): boolean {
    return this.status === FileModelStatus.Ok;
  }
  /**
   * validateStatus
   */
  public validateStatus(validationModel: ValidationModel): boolean {
    let hasError = false;
    if (!validationModel.acceptableExtensions.includes(this.fileExtension)) {
      this._status = FileModelStatus.NotAllowedExtension;
      hasError = true;
    }
    if (
      !hasError &&
      validationModel.maximumFileSize > 0 &&
      this.size > validationModel.maximumFileSize
    ) {
      this._status = FileModelStatus.TooBigFile;
      hasError = true;
    }
    if (
      !hasError &&
      validationModel.maximumFileNumber > 0 &&
      ++validationModel.actualFileNumber > validationModel.maximumFileNumber
    ) {
      this._status = FileModelStatus.TooMuchCombinedFiles;
      hasError = true;
    }
    if (
      !hasError &&
      validationModel.maximumCombinedFileSize > 0 &&
      validationModel.actualCombinedSize + this.size >
        validationModel.maximumCombinedFileSize
    ) {
      this._status = FileModelStatus.TooBigCombinedFileSizes;
      hasError = true;
    }
    if (!hasError) {
      this._status = FileModelStatus.Ok;
    }
    return hasError;
  }
  /**
   * validateStatusAndAddFile
   */
  public validateStatusAndAddFile(
    validationModel: ValidationModel,
    file: File
  ) {}
  /**
   * evaluatesStatusAndAddFileContent
   */
  // public validateStatusAndAddFileContent(validationModel: ValidationModel, file: File) {
  //     const hasError = this.validateStatus(validationModel, false);
  //     if (!hasError) {
  //         this.getFileContent(file).subscribe(x=> {});
  //     }
  // }

  /**
   * addFileContent
   */
  public getFileContent(file: File): Subject<string | ArrayBuffer> {
    const subject = new Subject<string | ArrayBuffer>();
    if (!this.isError) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('progress', (event) => {
        console.log('progress');
        if (event.loaded && event.total) {
          // Calculate the percentage completed
          const percent = (event.loaded / event.total) * 100;
          console.log(`progress: ${percent}`);

          // Set the value to the progress component
          this._progressPercentage = percent;
        }
      });
      // Once loaded, do something with the string
      reader.addEventListener('load', (event) => {
        if (!!event && !!event.target) {
          subject.next(event.target.result as string | ArrayBuffer);
        }
      });
    }
    return subject;
  }
}

export class ValidationModel {
  constructor(
    acceptableExtensions: string[],
    maximumFileSize: number,
    maximumCombinedFileSize: number,
    maximumFileNumber: number,
    actualCombinedSize: number,
    actualFileNumber: number
  ) {
    this.acceptableExtensions = acceptableExtensions;
    this.maximumFileSize = maximumFileSize;
    this.maximumCombinedFileSize = maximumCombinedFileSize;
    this.maximumFileNumber = maximumFileNumber;
    this.actualCombinedSize = actualCombinedSize;
    this.actualFileNumber = actualFileNumber;
  }
  acceptableExtensions: string[];
  maximumFileSize: number;
  maximumCombinedFileSize: number;
  maximumFileNumber: number;
  actualCombinedSize: number;
  actualFileNumber: number;
}
