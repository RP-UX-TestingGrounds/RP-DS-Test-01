import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadImage from './index';
import englishUploadImageTranslate from './upload-image-story-translate';

function getFirstRoot(container) {
  const roots = container.querySelectorAll('[data-test-id="upload-image"]');
  return roots.length > 0 ? roots[0] : null;
}

describe('UploadImage', () => {
  const defaultProps = {
    onChange: jest.fn(),
    testId: 'upload-image',
    translate: englishUploadImageTranslate,
  };

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state with label and hint', () => {
    const { container, getByText } = render(<UploadImage {...defaultProps} />);
    const root = getFirstRoot(container);

    expect(within(root).getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
    expect(getByText(/Drag and Drop/)).toBeInTheDocument();
    expect(getByText('SVG, PNG, JPG or GIF (max. 3 MB)')).toBeInTheDocument();
  });

  it('renders with custom label and hintText', () => {
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        hintText="SVG only, 1MB max"
        label="Choose file"
      />,
    );
    const root = getFirstRoot(container);

    expect(within(root).getByRole('button', { name: 'Choose file' })).toBeInTheDocument();
    expect(getByText('SVG only, 1MB max')).toBeInTheDocument();
  });

  it('applies testId to root', () => {
    const { container } = render(<UploadImage {...defaultProps} />);
    const root = getFirstRoot(container);
    expect(root).toBeInTheDocument();
  });

  it('uses —key— placeholders when translate is omitted (production must pass translate)', () => {
    const { container } = render(
      <UploadImage
        onChange={jest.fn()}
        testId="upload-image"
      />,
    );
    const root = getFirstRoot(container);
    expect(within(root).getByRole('button', { name: '—uploadLabel—' })).toBeInTheDocument();
    expect(within(root).getByText('—SVG, PNG, JPG or GIF (max. 3 MB)—')).toBeInTheDocument();
  });

  it('calls onChange when user selects a valid file', () => {
    const onChange = jest.fn();
    const { container } = render(<UploadImage {...defaultProps} onChange={onChange} />);

    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();

    const file = new File(['x'], 'image.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('shows validation error and does not call onChange when file type is invalid', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(<UploadImage {...defaultProps} onChange={onChange} />);

    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('Unsupported file.')).toBeInTheDocument();
  });

  it('shows validation placeholder when translate returns raw keys for unsupported file', () => {
    const onChange = jest.fn();
    const translateStub = (key) => key;
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        onChange={onChange}
        translate={translateStub}
      />,
    );

    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('—unsupportedFile—')).toBeInTheDocument();
  });

  it('shows validation placeholder when translate returns raw key for file too large', () => {
    const onChange = jest.fn();
    const translateStub = (key) => key;
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        maxFileSize={1}
        onChange={onChange}
        translate={translateStub}
      />,
    );

    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    const file = new File(['ab'], 'image.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('—fileTooLarge—')).toBeInTheDocument();
  });

  it('shows validation error and does not call onChange when file is too large', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        maxFileSize={1}
        onChange={onChange}
      />,
    );

    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    const file = new File(['ab'], 'image.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('File too large.')).toBeInTheDocument();
  });

  it('shows preview when value is set; zone is clickable to replace', () => {
    const { container } = render(
      <UploadImage
        {...defaultProps}
        value="https://example.com/preview.png"
      />,
    );
    const root = getFirstRoot(container);

    expect(within(root).getByRole('img')).toHaveAttribute('src', 'https://example.com/preview.png');
    expect(within(root).getByRole('region', { name: 'Click or drag to replace file' })).toBeInTheDocument();
    expect(within(root).getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
  });

  it('shows validation error in zone when replacing preview with invalid file', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        onChange={onChange}
        value="https://example.com/preview.png"
      />,
    );
    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');
    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('Unsupported file.')).toBeInTheDocument();
  });

  it('keeps drop zone Dimmer spinner hidden when idle', () => {
    const { container, getByRole } = render(
      <UploadImage
        {...defaultProps}
        testId="upload-image"
      />,
    );
    const root = getFirstRoot(container);
    expect(getByRole('progressbar')).not.toBeVisible();
    expect(within(root).getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
  });

  it('shows Dimmer over drop zone and spinner next to Remove file while uploading', () => {
    const fileState = {
      name: 'file1.pdf',
      size: 1000,
      status: 'uploading',
    };
    const { getAllByRole, getByLabelText, getByTestId } = render(
      <UploadImage
        {...defaultProps}
        fileState={fileState}
      />,
    );
    const removeRow = getByLabelText('Remove file').parentElement;
    expect(removeRow).not.toBeNull();
    expect(within(removeRow).getByRole('progressbar')).toBeVisible();
    expect(getByTestId('dimmer-backdrop')).toBeVisible();
    const progressbars = getAllByRole('progressbar');
    expect(progressbars.length).toBe(2);
    progressbars.forEach((el) => {
      expect(el).toBeVisible();
    });
  });

  it('shows helperText when provided', () => {
    const { getByText } = render(
      <UploadImage
        {...defaultProps}
        helperText="Please upload a logo."
      />,
    );
    expect(getByText('Please upload a logo.')).toBeInTheDocument();
  });

  it('builds support text from acceptedFileTypes and maxFileSize when hintText is omitted', () => {
    const { getByText } = render(
      <UploadImage
        {...defaultProps}
        acceptedFileTypes="image/png,image/jpeg"
        maxFileSize={1024 * 1024}
      />,
    );
    expect(getByText('PNG or JPG (max. 1 MB)')).toBeInTheDocument();
  });

  it('shows file preview with fileName and file icon when previewMode is file', () => {
    const { container } = render(
      <UploadImage
        {...defaultProps}
        fileName="report.pdf"
        previewMode="file"
        value="https://example.com/files/report.pdf"
      />,
    );
    const root = getFirstRoot(container);
    expect(within(root).getByText('report.pdf')).toBeInTheDocument();
    expect(root.querySelector('img')).toBeNull();
    expect(within(root).getByRole('region', { name: 'Click or drag to replace file' })).toBeInTheDocument();
    expect(within(root).getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
  });

  it('when fileState is set, renders drop zone and one status row', () => {
    const fileState = {
      name: 'file1.pdf',
      size: 1000,
      status: 'uploading',
    };
    const { container, getByText } = render(
      <UploadImage
        {...defaultProps}
        fileState={fileState}
      />,
    );
    const root = getFirstRoot(container);
    const zone = within(root).getByRole('region', { name: 'Upload file by clicking or dragging' });
    expect(within(zone).getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
    expect(getByText('file1.pdf')).toBeInTheDocument();
    expect(getByText(/1000 B • Loading/)).toBeInTheDocument();
    expect(container.querySelector('[aria-label="Remove file"]')).toBeInTheDocument();
  });

  it('when fileState is failed, shows upload failed title and error meta line', () => {
    const fileState = {
      errorMessage: 'File too large',
      name: 'large.pdf',
      size: 5000,
      status: 'failed',
    };
    const { getByText } = render(
      <UploadImage
        {...defaultProps}
        fileState={fileState}
      />,
    );
    expect(getByText('Upload failed.')).toBeInTheDocument();
    expect(getByText(/File too large • Failed/)).toBeInTheDocument();
  });

  it('when fileState is set, calls onChange(null) when Remove file is clicked', () => {
    const onChange = jest.fn();
    const fileState = {
      name: 'doc.pdf',
      size: 100,
      status: 'complete',
    };
    const { getByLabelText } = render(
      <UploadImage
        {...defaultProps}
        fileState={fileState}
        onChange={onChange}
      />,
    );
    fireEvent.click(getByLabelText('Remove file'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('clears validation error when Remove file is clicked after an invalid replacement attempt', () => {
    const onChange = jest.fn();
    const fileState = {
      name: 'doc.pdf',
      size: 100,
      status: 'complete',
    };
    const { container, getByLabelText, queryByText } = render(
      <UploadImage
        {...defaultProps}
        fileState={fileState}
        onChange={onChange}
      />,
    );
    const root = getFirstRoot(container);
    const input = root.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [new File(['x'], 'bad.pdf', { type: 'application/pdf' })] } });
    expect(queryByText('Unsupported file.')).toBeInTheDocument();

    fireEvent.click(getByLabelText('Remove file'));
    expect(queryByText('Unsupported file.')).not.toBeInTheDocument();
  });

  it('shows error state when error is true (message in zone only)', () => {
    const { getByText } = render(
      <UploadImage
        {...defaultProps}
        error
        helperText="Upload failed."
      />,
    );
    expect(getByText('Upload failed.')).toBeInTheDocument();
  });
});
