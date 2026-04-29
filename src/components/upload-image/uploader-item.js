import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

import Icon from '../icon';
import IconButton from '../icon-button';
import Spinner from '../spinner';

import { UPLOAD_ZONE_SURFACE_ERROR } from './upload-image-tokens';

export const UPLOADER_STATUS = {
  COMPLETE: 'complete',
  FAILED: 'failed',
  UPLOADING: 'uploading',
};

const UploaderItemRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'failed',
})(({ failed }) => ({
  alignItems: 'center',
  backgroundColor: failed ? UPLOAD_ZONE_SURFACE_ERROR : 'var(--card-color)',
  border: `1px solid ${failed ? 'var(--error-main)' : 'transparent'}`,
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
  boxSizing: 'border-box',
  display: 'flex',
  gap: 'var(--spacing-16)',
  maxWidth: '100%',
  minWidth: 0,
  overflow: 'hidden',
  padding: 'var(--spacing-16)',
  width: '100%',
}));

const UploaderItemContent = styled(Box)({
  display: 'flex',
  flex: '1 1 0',
  flexDirection: 'column',
  gap: 'var(--spacing-4)',
  minWidth: 0,
});

const UploaderItemTitle = styled('p')({
  color: 'var(--text-primary)',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
  margin: 0,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const UploaderItemTitleError = styled(UploaderItemTitle)({
  color: 'var(--error-main)',
});

const UploaderItemMeta = styled('p')({
  color: 'var(--text-secondary)',
  fontFamily: 'var(--typography-body-sm-font-family)',
  fontSize: 'var(--typography-body-sm-font-size)',
  fontWeight: 'var(--typography-body-sm-font-weight)',
  letterSpacing: 'var(--typography-body-sm-letter-spacing)',
  lineHeight: 'var(--typography-body-sm-line-height)',
  margin: 0,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const UploaderItemMetaError = styled(UploaderItemMeta)({
  color: 'var(--error-main)',
});

const StatusIndicatorWrap = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  height: 40,
  justifyContent: 'center',
  width: 40,
});

const UploaderItemTrailing = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  gap: 'var(--spacing-8)',
});

/**
 * @param {object} options
 * @param {object} options.fileState
 * @param {(n: number) => string} options.formatSize
 * @param {boolean} options.isComplete
 * @param {boolean} options.isFailed
 * @param {boolean} options.isUploading
 * @param {(key: string, data?: object) => string} options.translate
 * @returns {string}
 */
function getUploaderItemMetaText({
  fileState,
  formatSize,
  isComplete,
  isFailed,
  isUploading,
  translate,
}) {
  if (isFailed) {
    const errorDetail = fileState.errorMessage || translate('uploadErrorFallback');
    const failedLabel = translate('statusFailed');
    return `${errorDetail} • ${failedLabel}`;
  }

  const sizeSegment = fileState.size != null ? formatSize(fileState.size) : null;
  let statusSegment = null;
  if (isUploading) {
    statusSegment = translate('loading');
  } else if (isComplete) {
    statusSegment = translate('complete');
  }

  const segments = [sizeSegment, statusSegment].filter((s) => s != null && s !== '');
  return segments.join(' • ');
}

export default function UploaderItem({
  disabled,
  fileState,
  formatSize,
  onRemove,
  translate,
}) {
  const isFailed = fileState.status === UPLOADER_STATUS.FAILED;
  const isUploading = fileState.status === UPLOADER_STATUS.UPLOADING;
  const isComplete = fileState.status === UPLOADER_STATUS.COMPLETE;
  const title = isFailed ? translate('uploadFailed') : fileState.name;
  const metaText = getUploaderItemMetaText({
    fileState,
    formatSize,
    isComplete,
    isFailed,
    isUploading,
    translate,
  });

  const TitleComponent = isFailed ? UploaderItemTitleError : UploaderItemTitle;
  const MetaComponent = isFailed ? UploaderItemMetaError : UploaderItemMeta;

  return (
    <UploaderItemRoot failed={isFailed}>
      <UploaderItemContent>
        <TitleComponent>{title}</TitleComponent>
        <MetaComponent>{metaText}</MetaComponent>
      </UploaderItemContent>
      <UploaderItemTrailing>
        <IconButton
          aria-label={translate('removeFile')}
          color="default"
          disabled={disabled}
          onClick={onRemove}
          size="small"
        >
          {/*
            Icon defaults to --primary-color; default IconButton expects muted action icon.
          */}
          <Icon
            fill="var(--text-secondary)"
            name="deleteIcon"
            width={20}
          />
        </IconButton>
        {!isFailed && (isUploading || isComplete) && (
          <StatusIndicatorWrap>
            {isUploading && <Spinner size="small" />}
            {isComplete && (
              <Icon
                fill="var(--success-main)"
                name="checkCircle"
                width={24}
              />
            )}
          </StatusIndicatorWrap>
        )}
      </UploaderItemTrailing>
    </UploaderItemRoot>
  );
}

UploaderItem.propTypes = {
  disabled: PropTypes.bool,
  fileState: PropTypes.shape({
    errorMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    status: PropTypes.oneOf([
      UPLOADER_STATUS.UPLOADING,
      UPLOADER_STATUS.COMPLETE,
      UPLOADER_STATUS.FAILED,
    ]).isRequired,
  }).isRequired,
  formatSize: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
