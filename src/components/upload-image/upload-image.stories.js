import React, { useState } from 'react';
import { action } from 'storybook/actions';

import UploadImage from '.';
import englishUploadImageTranslate from './upload-image-story-translate';

export default {
  title: 'Components/Inputs/UploadImage',
  tags: ['autodocs'],
  component: UploadImage,
  args: {
    translate: englishUploadImageTranslate,
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

/**
 * Empty state. Select file → status bar shows Loading → then Complete.
 * Status bar stays visible after upload so user can delete from there.
 */
export const Default = {
  args: {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif',
    label: 'Upload File',
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-default',
  },
  render: function DefaultStory(args) {
    const [value, setValue] = useState('');
    const [fileState, setFileState] = useState(null);
    const logChange = action('onChange');

    const handleChange = (file) => {
      logChange(file);
      if (file === null) {
        setValue('');
        setFileState(null);
        return;
      }
      setFileState({ name: file.name, size: file.size, status: 'uploading' });
      setTimeout(() => {
        setValue(URL.createObjectURL(file));
        setFileState({ name: file.name, size: file.size, status: 'complete' });
      }, 600);
    };

    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

export const Error = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'File type not supported.',
    testId: 'upload-image-error',
  },
  render: (args) => <UploadImage {...args} onChange={action('onChange')} />,
};

/** Validation error: file too large. Error shows in container only (no status bar). */
export const FileTooLarge = {
  args: {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif',
    error: true,
    helperText: 'File too large.',
    label: 'Upload File',
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-file-too-large',
  },
  render: (args) => <UploadImage {...args} onChange={action('onChange')} />,
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    testId: 'upload-image-disabled',
  },
  render: (args) => <UploadImage {...args} onChange={action('onChange')} />,
};

/** Contrasts clearly with Default: different formats, size, and CTA copy. */
export const CustomHintAndLabel = {
  args: {
    hintText: 'HEIC or WebP only — maximum 512 KB. Used for hero banners.',
    label: 'Drop hero image',
    maxFileSize: 512 * 1024,
    testId: 'upload-image-custom',
  },
  render: (args) => <UploadImage {...args} onChange={action('onChange')} />,
};

/**
 * Repeatable pattern: field label + dimensions hint + image accept/size.
 * Copy this when you need a labeled image upload (e.g. banner, hero, featured image).
 */
export const WithFieldLabelAndDimensionsHint = {
  args: {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif',
    dimensionsHint: 'Optimized for: 900×450 pixels',
    fieldLabel: 'Featured Image',
    label: 'Upload File',
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-with-label-and-hint',
  },
  render: function WithFieldLabelAndDimensionsHintStory(args) {
    const [value, setValue] = useState('');
    const logChange = action('onChange');
    return (
      <UploadImage
        {...args}
        onChange={(file) => {
          logChange(file);
          if (file === null) {
            setValue('');
          } else {
            setValue(URL.createObjectURL(file));
          }
        }}
        value={value}
      />
    );
  },
};

/**
 * Simulated API: select file → upload delay → value + complete status bar.
 */
export const WithUploadCallbackShowsImage = {
  args: {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif',
    label: 'Upload File',
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-callback',
  },
  render: function WithUploadCallbackStory(args) {
    const [value, setValue] = useState('');
    const [fileState, setFileState] = useState(null);
    const logChange = action('onChange');

    const handleChange = (file) => {
      logChange(file);
      if (file === null) {
        setValue('');
        setFileState(null);
        return;
      }
      setFileState({ name: file.name, size: file.size, status: 'uploading' });
      setTimeout(() => {
        setValue(URL.createObjectURL(file));
        setFileState({ name: file.name, size: file.size, status: 'complete' });
      }, 800);
    };

    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

/** Status bar: uploading – file name, "Loading", spinner next to delete. */
export const StatusUploading = {
  args: {
    acceptedFileTypes: 'image/svg+xml,image/png,image/jpeg,image/gif',
    fileState: {
      name: 'document_file_name.pdf',
      size: 102400,
      status: 'uploading',
    },
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-status-uploading',
  },
  render: function StatusUploadingStory(args) {
    const [fileState, setFileState] = useState(args.fileState);
    const logChange = action('onChange');
    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={(file) => {
          logChange(file);
          if (file === null) setFileState(null);
          else setFileState({ name: file.name, size: file.size, status: 'uploading' });
        }}
      />
    );
  },
};

/** Status bar: complete – file name, "Complete", checkmark next to delete. */
export const StatusComplete = {
  args: {
    acceptedFileTypes: 'image/svg+xml,image/png,image/jpeg,image/gif',
    fileState: {
      name: 'document_file_name.pdf',
      size: 204800,
      status: 'complete',
    },
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-status-complete',
  },
  render: function StatusCompleteStory(args) {
    const [fileState, setFileState] = useState(args.fileState);
    const logChange = action('onChange');
    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={(file) => {
          logChange(file);
          if (file === null) setFileState(null);
          else setFileState({ name: file.name, size: file.size, status: 'uploading' });
        }}
      />
    );
  },
};

/** Status bar: failed – upload failure (e.g. network), not validation. */
export const StatusFailed = {
  args: {
    acceptedFileTypes: 'image/svg+xml,image/png,image/jpeg,image/gif',
    fileState: {
      errorMessage: 'Network error',
      name: 'photo.png',
      size: 102400,
      status: 'failed',
    },
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-status-failed',
  },
  render: function StatusFailedStory(args) {
    const [fileState, setFileState] = useState(args.fileState);
    const logChange = action('onChange');
    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={(file) => {
          logChange(file);
          if (file === null) setFileState(null);
          else setFileState({ name: file.name, size: file.size, status: 'uploading' });
        }}
      />
    );
  },
};

/**
 * Full flow: select file → status bar (Loading) → callback returns URL → status bar (Complete) + preview.
 */
export const CallbackFlowWithStatusBar = {
  args: {
    acceptedFileTypes: 'image/png,image/jpeg,image/gif',
    dimensionsHint: 'Optimized for: 900×450 pixels',
    fieldLabel: 'Featured Image',
    maxFileSize: 3 * 1024 * 1024,
    testId: 'upload-image-callback-flow',
  },
  render: function CallbackFlowWithStatusBarStory(args) {
    const [value, setValue] = useState('');
    const [fileState, setFileState] = useState(null);
    const logChange = action('onChange');

    const handleChange = (file) => {
      logChange(file);
      if (file === null) {
        setValue('');
        setFileState(null);
        return;
      }
      setFileState({ name: file.name, size: file.size, status: 'uploading' });
      setTimeout(() => {
        setValue(URL.createObjectURL(file));
        setFileState({ name: file.name, size: file.size, status: 'complete' });
      }, 1200);
    };

    return (
      <UploadImage
        {...args}
        fileState={fileState}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

/**
 * File (non-image) preview: `value` is URL from API; **`fileName` must be set by the parent**
 * (e.g. from upload response) or the UI shows the translated fallback label, not the file name.
 */
export const FilePreview = {
  args: {
    acceptedFileTypes: 'application/pdf',
    acceptedFormatsLabel: 'PDF',
    fileName: 'terms-and-conditions.pdf',
    maxFileSize: 5 * 1024 * 1024,
    previewMode: 'file',
    testId: 'upload-image-file',
    value: 'https://example.com/files/terms-and-conditions.pdf',
  },
  render: function FilePreviewStory(args) {
    const [value, setValue] = useState(args.value);
    const [fileName, setFileName] = useState(args.fileName);
    const [fileState, setFileState] = useState(null);
    const logChange = action('onChange');

    const handleChange = (file) => {
      logChange(file);
      if (file === null) {
        setValue('');
        setFileName('');
        setFileState(null);
        return;
      }
      setFileState({ name: file.name, size: file.size, status: 'uploading' });
      setTimeout(() => {
        setValue(`https://example.com/files/${encodeURIComponent(file.name)}`);
        setFileName(file.name);
        setFileState({ name: file.name, size: file.size, status: 'complete' });
      }, 600);
    };

    return (
      <UploadImage
        {...args}
        fileName={fileName}
        fileState={fileState}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

/**
 * File upload with callback: PDF or images allowed in picker for easier Storybook testing.
 * For PDF-only UX, see **RestrictedToPdfOnly**.
 */
export const AllowPDFOnly = {
  args: {
    acceptedFileTypes: 'application/pdf',
    acceptedFormatsLabel: 'PDF',
    maxFileSize: 5 * 1024 * 1024,
    previewMode: 'file',
    testId: 'upload-image-file-callback',
  },
  render: function WithUploadCallbackFileStory(args) {
    const [value, setValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileState, setFileState] = useState(null);
    const logChange = action('onChange');

    const handleChange = (file) => {
      logChange(file);
      if (file === null) {
        setValue('');
        setFileName('');
        setFileState(null);
        return;
      }
      setFileState({ name: file.name, size: file.size, status: 'uploading' });
      setTimeout(() => {
        setValue(`https://example.com/uploads/${file.name}`);
        setFileName(file.name);
        setFileState({ name: file.name, size: file.size, status: 'complete' });
      }, 800);
    };

    return (
      <UploadImage
        {...args}
        fileName={fileName}
        fileState={fileState}
        onChange={handleChange}
        value={value}
      />
    );
  },
};
