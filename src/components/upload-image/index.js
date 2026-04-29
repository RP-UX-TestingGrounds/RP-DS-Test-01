import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

import Dimmer from '../dimmer';
import HelperText from '../helper-text';
import Icon from '../icon';
import Spinner from '../spinner';

import formatFileSize from '../../utils/format-file-size';
import defaultTranslate from '../../utils/translation';
import {
  getSupportText,
  UPLOAD_VALIDATION_ERROR_KEY,
  validateFile,
} from './upload-image-helpers';
import {
  UPLOAD_ZONE_BORDER_RESTING,
  UPLOAD_ZONE_SURFACE_ERROR,
} from './upload-image-tokens';
import UploaderItem, { UPLOADER_STATUS } from './uploader-item';

const DEFAULT_ACCEPTED_FILE_TYPES = 'image/svg+xml,image/png,image/jpeg,image/gif';
const DEFAULT_MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const DEFAULT_TRANSLATE_TEMPLATES = {
  formatListBeforeOrLast: '{{before}} or {{last}}',
  formatListItemSeparator: ', ',
  supportFormatsMax: '—{{formats}} (max. {{maxSize}})—',
};

/**
 * @param {string} key
 * @param {Record<string, unknown>} [data]
 * @returns {string}
 */
function defaultTranslation(key, data = {}) {
  if (Object.prototype.hasOwnProperty.call(DEFAULT_TRANSLATE_TEMPLATES, key)) {
    const template = DEFAULT_TRANSLATE_TEMPLATES[key];
    if (template.includes('{{')) {
      return defaultTranslate({ [key]: template }, key, data);
    }
    return template;
  }
  return `—${key}—`;
}

/**
 * When validation fails, map error keys through `translate`; if the host returns the key
 * unchanged, use the same placeholder pattern as `defaultTranslation` for known keys.
 *
 * @param {string} errorKey
 * @param {(key: string, data?: object) => string} translate
 * @returns {string}
 */
function translateValidationError(errorKey, translate) {
  const fromHost = translate(errorKey);
  if (fromHost !== errorKey) {
    return fromHost;
  }
  const isKnownValidationKey = errorKey === UPLOAD_VALIDATION_ERROR_KEY.FILE_TOO_LARGE
    || errorKey === UPLOAD_VALIDATION_ERROR_KEY.UNSUPPORTED_FILE;
  if (!isKnownValidationKey) {
    return fromHost;
  }
  return defaultTranslation(errorKey);
}

const ROOT_DOM_CUSTOM_PROPS = ['disabled', 'error', 'isDragOver', 'sx'];

const Root = styled('div', {
  shouldForwardProp: (prop) => !ROOT_DOM_CUSTOM_PROPS.includes(prop),
})(({
  isDragOver, error, disabled,
}) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: `1px ${error ? 'solid' : 'dashed'} ${error ? 'var(--error-main)' : UPLOAD_ZONE_BORDER_RESTING}`,
  borderRadius: 'var(--radius)',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-8)',
  justifyContent: 'center',
  maxWidth: '100%',
  minHeight: 120,
  minWidth: 0,
  overflow: 'hidden',
  padding: 'var(--spacing-24) var(--spacing-16)',
  position: 'relative',
  transition: 'background-color 0.15s ease, border-color 0.15s ease',
  ...(isDragOver && !error && {
    borderColor: 'var(--primary-main)',
    backgroundColor: 'var(--primary-light)',
  }),
  ...(!error && !disabled && {
    '&:hover': {
      borderColor: 'var(--primary-main)',
      backgroundColor: 'var(--primary-light)',
    },
  }),
  ...(error && {
    backgroundColor: UPLOAD_ZONE_SURFACE_ERROR,
  }),
  ...(disabled && {
    opacity: 0.6,
    pointerEvents: 'none',
  }),
}));

const IconWrapper = styled('div')({
  alignItems: 'center',
  backgroundColor: 'transparent',
  display: 'flex',
  height: 40,
  justifyContent: 'center',
  width: 40,
});

const TitleRow = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-4)',
  justifyContent: 'center',
  lineHeight: 'var(--typography-body-md-line-height)',
});

const UploadLink = styled('button')({
  background: 'none',
  border: 'none',
  color: 'var(--primary-main)',
  cursor: 'pointer',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
  padding: 0,
  textDecoration: 'underline',
  '&:focus': {
    outline: '2px solid var(--primary-main)',
    outlineOffset: 2,
  },
});

const TitleText = styled('span')({
  color: 'var(--text-primary)',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
});

/** minWidth: 0 so flex/grid parents do not block shrinking; keeps status row inside viewport. */
const uploadShellLayoutStyles = {
  boxSizing: 'border-box',
  maxWidth: '100%',
  minWidth: 0,
  width: '100%',
};

const ComponentWrapper = styled('div')(uploadShellLayoutStyles);
const UploadZoneShell = styled('div')(uploadShellLayoutStyles);
const StatusSection = styled('div')({
  ...uploadShellLayoutStyles,
  marginTop: 'var(--spacing-8)',
});

const FieldLabel = styled('label')({
  color: 'var(--text-primary)',
  display: 'block',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
  marginBottom: 'var(--spacing-4)',
});

const DimensionsHint = styled('p')({
  color: 'var(--text-secondary)',
  fontFamily: 'var(--typography-body-sm-font-family)',
  fontSize: 'var(--typography-body-sm-font-size)',
  fontWeight: 'var(--typography-body-sm-font-weight)',
  letterSpacing: 'var(--typography-body-sm-letter-spacing)',
  lineHeight: 'var(--typography-body-sm-line-height)',
  margin: '0 0 var(--spacing-8) 0',
});

const PreviewBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-8)',
});

const PreviewImage = styled('img')({
  maxHeight: 120,
  maxWidth: '100%',
  objectFit: 'contain',
});

const FilePreviewRow = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  gap: 'var(--spacing-8)',
});

const FileIconWrapper = styled(Box)({
  color: 'var(--text-secondary)',
  flexShrink: 0,
});

const ZoneHintWrap = styled(Box)({
  textAlign: 'center',
  width: '100%',
});

function UploadDropZoneCaption({
  handleKeyDown,
  labelText,
  messageInZone,
  onUploadLinkClick,
  supportText,
  translate,
  zoneDisabled,
}) {
  return (
    <>
      <TitleRow>
        <UploadLink
          aria-label={labelText}
          onClick={onUploadLinkClick}
          onKeyDown={handleKeyDown}
          tabIndex={zoneDisabled ? -1 : 0}
          type="button"
        >
          {labelText}
        </UploadLink>
        <TitleText>{translate('orDragAndDrop')}</TitleText>
      </TitleRow>
      <ZoneHintWrap>
        <HelperText
          disableMargin
          error={Boolean(messageInZone)}
          text={messageInZone ?? supportText}
        />
      </ZoneHintWrap>
    </>
  );
}

export default function UploadImage({
  acceptedFileTypes = DEFAULT_ACCEPTED_FILE_TYPES,
  acceptedFormatsLabel,
  dimensionsHint,
  disabled = false,
  error = false,
  fieldLabel,
  fileName,
  fileState,
  helperText,
  hintText,
  label,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  onChange,
  previewMode,
  testId,
  translate = defaultTranslation,
  value,
}) {
  const inputRef = useRef(null);
  const valueWhenUploadStartedRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const labelText = label ?? translate('uploadLabel');
  const supportText = getSupportText({
    acceptedFileTypes,
    acceptedFormatsLabel,
    hintText,
    maxFileSize,
    translate,
  });

  useEffect(() => {
    if (fileState != null) {
      setPendingUpload(null);
      return;
    }
    const valueSet = value != null && typeof value === 'string' && value.length > 0;
    if (valueSet && value !== valueWhenUploadStartedRef.current) {
      setPendingUpload(null);
    }
  }, [fileState, value]);

  const handleFile = useCallback(
    (file) => {
      setValidationError(null);
      if (!file) {
        setPendingUpload(null);
        valueWhenUploadStartedRef.current = null;
        onChange?.(null);
        return;
      }
      const result = validateFile(file, acceptedFileTypes, maxFileSize);
      if (!result.valid) {
        setValidationError(translateValidationError(result.errorKey, translate));
        return;
      }
      valueWhenUploadStartedRef.current = value ?? null;
      setPendingUpload({ name: file.name, size: file.size });
      onChange?.(file);
    },
    [acceptedFileTypes, maxFileSize, onChange, translate, value],
  );

  const handleInputChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      handleFile(file ?? null);
    },
    [handleFile],
  );

  const zoneDisabled = disabled;
  const handleLinkClick = useCallback(
    (e) => {
      e.preventDefault();
      if (zoneDisabled) return;
      inputRef.current?.click();
    },
    [zoneDisabled],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (zoneDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        handleLinkClick(e);
      }
    },
    [zoneDisabled, handleLinkClick],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;
      const file = e.dataTransfer?.files?.[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile],
  );

  const handlePreviewClick = useCallback(
    (e) => {
      if (zoneDisabled) return;
      e.preventDefault();
      inputRef.current?.click();
    },
    [zoneDisabled],
  );

  const displayError = error || Boolean(validationError);
  const messageInZone = displayError ? (validationError ?? helperText ?? null) : null;
  const hasValue = value != null && typeof value === 'string' && value.length > 0;
  const effectiveFileState = fileState ?? (pendingUpload ? { ...pendingUpload, status: UPLOADER_STATUS.UPLOADING } : null);
  const zoneIsUploading = effectiveFileState?.status === UPLOADER_STATUS.UPLOADING;
  const showPreview = hasValue && (!effectiveFileState || effectiveFileState.status === UPLOADER_STATUS.COMPLETE);
  const showAsFile = previewMode === 'file';
  const regionLabel = showPreview ? translate('ariaReplaceRegion') : translate('ariaUploadRegion');
  const wrapperProps = testId != null && testId !== '' ? { 'data-test-id': testId } : {};

  return (
    <ComponentWrapper {...wrapperProps}>
      {fieldLabel && <FieldLabel>{fieldLabel}</FieldLabel>}
      {dimensionsHint && <DimensionsHint>{dimensionsHint}</DimensionsHint>}
      <UploadZoneShell>
        <Dimmer
          active={zoneIsUploading}
          spinner={<Spinner size="small" />}
        >
          <Root
            aria-label={regionLabel}
            disabled={zoneDisabled}
            error={displayError}
            isDragOver={isDragOver}
            onClick={showPreview && !zoneDisabled ? handlePreviewClick : undefined}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="region"
            sx={showPreview && !zoneDisabled ? { cursor: 'pointer' } : undefined}
          >
            <input
              accept={acceptedFileTypes}
              ref={inputRef}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              type="file"
            />

            {showPreview ? (
              <PreviewBox>
                {showAsFile ? (
                  <FilePreviewRow>
                    <FileIconWrapper>
                      <Icon
                        fill="var(--text-secondary)"
                        name="uploadFile"
                        width={32}
                      />
                    </FileIconWrapper>
                    <TitleText>{fileName ?? translate('uploadedFileFallback')}</TitleText>
                  </FilePreviewRow>
                ) : (
                  <PreviewImage alt={translate('uploadedImageAlt')} src={value} />
                )}
                <UploadDropZoneCaption
                  handleKeyDown={handleKeyDown}
                  labelText={labelText}
                  messageInZone={messageInZone}
                  onUploadLinkClick={(e) => {
                    e.stopPropagation();
                    handleLinkClick(e);
                  }}
                  supportText={supportText}
                  translate={translate}
                  zoneDisabled={zoneDisabled}
                />
              </PreviewBox>
            ) : (
              <>
                <IconWrapper>
                  <Icon
                    fill={displayError ? 'var(--error-main)' : 'var(--primary-main)'}
                    name="uploadFile"
                    width={24}
                  />
                </IconWrapper>
                <UploadDropZoneCaption
                  handleKeyDown={handleKeyDown}
                  labelText={labelText}
                  messageInZone={messageInZone}
                  onUploadLinkClick={handleLinkClick}
                  supportText={supportText}
                  translate={translate}
                  zoneDisabled={zoneDisabled}
                />
              </>
            )}
          </Root>
        </Dimmer>
      </UploadZoneShell>
      {effectiveFileState && (
        <StatusSection>
          <UploaderItem
            disabled={disabled}
            fileState={effectiveFileState}
            formatSize={formatFileSize}
            onRemove={() => {
              setPendingUpload(null);
              setValidationError(null);
              onChange?.(null);
            }}
            translate={translate}
          />
        </StatusSection>
      )}
      {helperText && !displayError && <HelperText text={helperText} />}
    </ComponentWrapper>
  );
}

UploadDropZoneCaption.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  messageInZone: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  onUploadLinkClick: PropTypes.func.isRequired,
  supportText: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  zoneDisabled: PropTypes.bool.isRequired,
};

UploadImage.propTypes = {
  /** Accepted MIME types for the file input (e.g. "image/png,image/jpeg,image/gif") */
  acceptedFileTypes: PropTypes.string,
  /** Override format label in support text (e.g. "PDF, DOC"); else derived from acceptedFileTypes */
  acceptedFormatsLabel: PropTypes.string,
  /** Optional dimensions guidance (e.g. "Optimized for: 900×450 pixels") */
  dimensionsHint: PropTypes.string,
  /** Disable interaction */
  disabled: PropTypes.bool,
  /** Show error state */
  error: PropTypes.bool,
  /** Optional label above the upload zone (e.g. "Featured Image") */
  fieldLabel: PropTypes.string,
  /**
   * Display name in file preview mode (`previewMode="file"`). After upload, set this from the
   * API/file metadata; if omitted, `translate('uploadedFileFallback')` is shown (not the URL).
   */
  fileName: PropTypes.string,
  /** Current file status: one status bar row below the zone */
  fileState: PropTypes.shape({
    errorMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    status: PropTypes.oneOf(['uploading', 'complete', 'failed']).isRequired,
  }),
  /** Error or hint message below the zone */
  helperText: PropTypes.string,
  /** Hint/support text; if omitted, built from acceptedFileTypes and maxFileSize */
  hintText: PropTypes.string,
  /** Label for the upload link (defaults via translate('uploadLabel')) */
  label: PropTypes.string,
  /** Max file size in bytes (used in validation and in default support text) */
  maxFileSize: PropTypes.number,
  /** Called with selected File or null (on remove/cancel); parent uploads and sets value with URL */
  onChange: PropTypes.func,
  /** 'image' | 'file' – when 'file', show file icon + fileName instead of image thumbnail */
  previewMode: PropTypes.oneOf(['file', 'image']),
  /** Test ID on root wrapper */
  testId: PropTypes.string,
  translate: PropTypes.func,
  /** Preview URL when upload is complete */
  value: PropTypes.string,
};

export { UPLOAD_VALIDATION_ERROR_KEY } from './upload-image-helpers';
