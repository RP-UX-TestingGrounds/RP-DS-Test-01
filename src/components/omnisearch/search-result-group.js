import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import defaultTranslate from '../../utils/translation';
import Icon from '../icon';

const SearchResults = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--omnisearch-gap-inner)',
  padding: 0,
  margin: 0,
}));

const SearchResult = styled('div')(() => ({
  borderRadius: 'var(--omnisearch-radius)',
  transition: 'background-color 0.2s ease',
}));

const Content = styled('div')(() => ({
  fontFamily: 'var(--font-family)',
  background: 'var(--white)',
}));

const Header = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 'var(--omnisearch-gap-y-small)',
}));

const Title = styled('h3')(() => ({
  margin: 0,
  fontWeight: 'var(--font-weight-regular)',
  fontSize: 'var(--omnisearch-font-size-large)',
  paddingLeft: 'var(--omnisearch-padding-x-small)',
}));

const Footer = styled('div')(() => ({
  marginTop: 'var(--omnisearch-padding-y-medium)',
}));

const FooterLink = styled('a')(() => ({
  color: 'var(--primary-main)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--omnisearch-gap-y-small)',
  fontSize: 'var(--omnisearch-font-size-medium)',
  textDecoration: 'unset',
  cursor: 'pointer',
}));

const defaultTranslation = (key, data) => {
  const translations = {
    viewAllOrdersWith: 'View all orders with “{{searchQuery}}”',
  };
  return defaultTranslate(translations, key, data);
};

function OmniSearchResultsGroup({
  results = [],
  searchQuery = '',
  rowsDisplayed = 3,
  translate = defaultTranslation,
  searchResult,
  viewAllHref,
  title = '',
  icon,
  onNavigate = null,
  testId = 'search-result-group',
  searchType = null,
}) {
  const attrs = {
    'data-test-id': testId,
  };
  if (searchType) {
    attrs['data-search-type'] = searchType;
  }

  const viewAllAttrs = {};
  if (typeof onNavigate === 'function') {
    viewAllAttrs.onClick = (event) => onNavigate(viewAllHref, searchType, event);
    viewAllAttrs.role = 'button';
    viewAllAttrs.tabIndex = 0;
  } else {
    viewAllAttrs.href = viewAllHref || '#';
    viewAllAttrs.role = 'link';
  }
  if (searchType) {
    viewAllAttrs['data-search-type'] = searchType;
  }

  return (
    <Content {...attrs}>
      {/* Header */}
      {(title || icon) && (
        <Header>
          {icon && <Icon name={icon} width={24} />}
          {title && (
            <Title>
              {title}
            </Title>
          )}
        </Header>
      )}

      {/* Results list */}
      <SearchResults>
        {results.slice(0, rowsDisplayed).map((result, index) => (
          <SearchResult key={result.id || index}>
            {/* Render custom result UI */}
            {typeof searchResult === 'function' ? searchResult(result, searchQuery, onNavigate) : searchResult}
          </SearchResult>
        ))}
      </SearchResults>

      {/* Footer link */}
      {(viewAllHref && searchQuery) && (
        <Footer>
          <FooterLink {...viewAllAttrs} data-test-id={`${testId}-view-all`}>
             {translate('viewAllOrdersWith', { searchQuery })}
            <OpenInNewIcon size={12} color="var(--primary-color)"/>
          </FooterLink>
        </Footer>
      )}
    </Content>
  );
}

OmniSearchResultsGroup.propTypes = {
  // Array of generic result objects (can be orders, messages, etc.)
  results: PropTypes.arrayOf(PropTypes.object),

  // Section title
  title: PropTypes.string,

  // Text shown in the footer link (e.g., search term)
  searchQuery: PropTypes.string,

  // Number to control how many rows we want to display
  rowsDisplayed: PropTypes.number,

  // “View all” link template (supports {query} placeholder)
  viewAllHref: PropTypes.string,

  // Function or React node for rendering each result item
  searchResult: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,

  translate: PropTypes.func,
  icon: PropTypes.string,
  onNavigate: PropTypes.func,
  testId: PropTypes.string,
  searchType: PropTypes.string,
};

export default OmniSearchResultsGroup;
