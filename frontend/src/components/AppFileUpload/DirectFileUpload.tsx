import React, { Component } from 'react';
import IFileDto from '../AppFileUpload/IFileDto';
import { toIFileDto } from './mappers';
import FileUpload from './FileUpload';
import '../AppFileUpload/style.scss';

interface Props {
  existingFileNames?: string[];
  onAdd(
    file: File,
    progress: (status: number) => void,
    onError: (errMsg: string) => void
  ): Promise<boolean>;
  multiple?: boolean;
  concurrentLimit?: number;
}

interface State {
  files: IFileDto[];
}

export default class DirectFileUpload extends Component<Props, State> {
  static CLEAR_TIMEOUT = 2000;
  static DEFAULT_CONCURRENT_LIMIT = 5;

  constructor(props: Props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  handleClearTimeout = (file: File) => {
    setTimeout(() => {
      this.setState(oldState => ({
        files: oldState.files.filter(f => f.fileObject !== file),
      }));
    }, DirectFileUpload.CLEAR_TIMEOUT);
  };

  componentDidUpdate() {
    this.handleNotLoadedFiles();
  }

  handleNotLoadedFiles = () => {
    const { onAdd, concurrentLimit } = this.props;
    const { files } = this.state;

    const notStarted = files.filter(f => f.progress === -1 && !f.error);
    const runningCount = files.filter(
      f => f.progress > -1 && f.progress < 100
    ).length;

    const _concurrentLimit =
      concurrentLimit ?? DirectFileUpload.DEFAULT_CONCURRENT_LIMIT;
    const runnableCount = _concurrentLimit - runningCount;
    if (runnableCount < 1) return;
    const runNext = notStarted.slice(
      0,
      Math.min(runnableCount, notStarted.length)
    );
    if (!runNext.length) return;

    for (const fileDto of runNext) {
      const file = fileDto.fileObject;
      const onProgressCb = (progress: number) => {
        this.setState(oldState => {
          if (oldState.files.find(f => f.fileObject === file)?.error)
            return oldState;
          return {
            files: [
              ...oldState.files.map(f =>
                f.fileObject !== file
                  ? f
                  : { ...f, progress: Math.min(progress, 99) }
              ),
            ],
          };
        });
      };
      const onErrorCb = (err: string) => {
        this.setState(oldState => ({
          files: [
            ...oldState.files.map(f =>
              f.fileObject !== file ? f : { ...f, progress: 0, error: err }
            ),
          ],
        }));
      };
      onAdd(file, onProgressCb, onErrorCb).then(success => {
        this.handleClearTimeout(file);
        if (!success) return;
        this.setState(oldState => ({
          files: [
            ...oldState.files.map(f =>
              f.fileObject !== file ? f : { ...f, progress: 100 }
            ),
          ],
        }));
      });
    }
    const runNextObjs = runNext.map(f => f.fileObject);
    this.setState(oldState => ({
      files: [
        ...oldState.files.map(f =>
          !runNextObjs.includes(f.fileObject) ? f : { ...f, progress: 1 }
        ),
      ],
    }));
  };

  handleDrop = async (acceptedFiles: File[]) => {
    const { files } = this.state;
    const { existingFileNames } = this.props;

    const acceptedFileDtos = acceptedFiles.map(af =>
      toIFileDto(
        af,
        -1,
        files.find(f => af.name === f.fileObject.name) ||
          existingFileNames?.includes(af.name)
          ? 'Already exists'
          : undefined
      )
    );

    this.setState({ files: [...files, ...acceptedFileDtos] });

    acceptedFileDtos
      .filter(f => !!f.error)
      .forEach(fileDto => this.handleClearTimeout(fileDto.fileObject));
  };

  render() {
    const { multiple } = this.props;
    const { files } = this.state;

    return (
      <FileUpload
        files={files}
        multiple={multiple}
        onAccepted={this.handleDrop}
      />
    );
  }
}
