import React, { useMemo } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Dimmer from '../dimmer';
import Button from '../button';
import EmptyMessage from '../empty-message';

import styles from './activity-log.css';

import defaultTranslate from '../../utils/translation';
import { convertToTwelveHour } from '../../utils/date-format';
import formatActivityByDate from './activity-log-utils';

const defaultTranslation = (key, data) => {
  const translations = {
    noActivity: 'No activity data',
    viewMore: 'View more',
    missingInfo: `Event: {{event}}`,
  };
  return defaultTranslate(translations, key, data);
};

export default function ActivityLog({
  items,
  handlers = [],
  isLoading = false,
  onLoadMoreActivity,
  shouldRenderViewMore = true,
  translate = defaultTranslation,
  locale = 'en-US',
  testId = 'activity-log-test',
}) {
  const mappedHandlers = useMemo(() => {
    const map = {};
    handlers.forEach((handler) => {
      handler.events.forEach((event) => {
        map[event] = handler;
      });
    });
    return map;
  }, [handlers]);
  const formatText = (activity) => {
    // check to see if a handler exists, then call it
    const handler = mappedHandlers[activity?.event || null];
    if (handler) {
      return handler.format(activity);
    }
    return translate('missingInfo', activity);
  };

  const activityDateGroups = useMemo(() => (items ? formatActivityByDate(items, locale) : []), [items]);
  const hasActivity = (activityDateGroups?.length > 0);

  return (
    <Dimmer
      active={isLoading}
    >
      <div className={styles.activityWrapper} data-test-id={testId}>
        {activityDateGroups?.map((activityGroup, itemIndex) => (
          <div key={`${activityGroup.date}_${itemIndex}`}>
            <div className={styles.header}>
              {activityGroup.date}
            </div>
            <div className={styles.activityRowWrapper}>
              {
                activityGroup.data.map((activity, index) => (
                  <div key={`activity_log_${index}`} className={styles.row}>
                    <div
                      className={cx({
                        [styles.rowContent]: true,
                        [styles.active]: index === 0 && itemIndex === 0,
                      })}
                    >
                      <span
                        className={cx({
                          [styles.textContainer]: true,
                          [styles.bordered]: index > 0,
                        })}
                      >
                        <div dangerouslySetInnerHTML={{ __html: formatText(activity) }} />
                        <span>
                          {convertToTwelveHour(new Date(activity?.date || null), locale)}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
        {!hasActivity && (
          <EmptyMessage message={translate('noActivity')}/>
        )}
        {hasActivity && onLoadMoreActivity && shouldRenderViewMore && (
          <div className={styles.loadMoreBtn}>
            <Button
              testId="view-more-activity__button"
              variant="text"
              onClick={onLoadMoreActivity}
            >
              {translate('viewMore')}
            </Button>
          </div>
        )}
      </div>
    </Dimmer>
  );
}

ActivityLog.propTypes = {
  items: PropTypes.array,
  handlers: PropTypes.array,
  isLoading: PropTypes.bool,
  onLoadMoreActivity: PropTypes.func,
  shouldRenderViewMore: PropTypes.bool,
  translate: PropTypes.func,
  testId: PropTypes.string,
  locale: PropTypes.string,
};
