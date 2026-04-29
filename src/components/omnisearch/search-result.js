import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import highlightText from '../../utils/highlight-text';

const Header = styled('div')(() => ({
  fontWeight: 'var(--font-weight-bold)',
  fontSize: 'var(--omnisearch-font-size-medium)',
  '& em': {
    color: 'var(--primary-main)',
    fontStyle: 'normal',
    fontWeight: 'var(--font-weight-bold)',
  },
}));

const ContentLink = styled('a')(() => ({
  textDecoration: 'unset',
  padding: 'var(--omnisearch-padding-y-small) var(--omnisearch-padding-xl)',
  display: 'block',
  color: 'inherit',
  borderRadius: 'var(--omnisearch-radius)',

  '&:focus-visible': {
    outline: 'none',
  },
}));

const Description = styled('div')(() => ({
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--text-secondary)',
  fontSize: 'var(--omnisearch-font-size-small)',
  marginTop: 'var(--omnisearch-gap-y-xs)',
}));

function SearchResult({
  searchQuery,
  href,
  header,
  description,
  onNavigate = null,
  testId = 'search-result',
  searchType = null,
}) {
  const attrs = {
    'data-test-id': testId,
  };

  if (searchType) {
    attrs['data-search-type'] = searchType;
  }

  if (typeof onNavigate === 'function') {
    attrs.onClick = (event) => onNavigate(href, searchType, event);
    attrs.role = 'button';
    attrs.tabIndex = 0;
  } else {
    attrs.href = href;
    attrs.role = 'link';
  }

  return (
    <ContentLink className="actionable" {...attrs}>
      <Header>
        {highlightText(header, searchQuery)}
      </Header>
      <Description>
        {description}
      </Description>
    </ContentLink>
  );
}

SearchResult.propTypes = {
  href: PropTypes.string,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
  testId: PropTypes.string,
  searchType: PropTypes.string,
};

export default SearchResult;
