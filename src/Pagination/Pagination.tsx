import React from 'react'
import styled from 'styled-components'
import Box from '../Box'
import {COMMON, get} from '../constants'
import sx from '../sx'
import {buildComponentData, buildPaginationModel} from './model'

const Page = styled.a`
  display: inline-block;
  min-width: 32px;
  padding: 5px 10px;
  font-style: normal;
  line-height: 20px;
  color: ${get('pagination.colors.normal.fg')};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  margin-right: ${get('pagination.spaceBetween')};

  &:last-child {
    margin-right: 0;
  }

  border: ${get('borderWidths.1')} solid transparent;
  border-radius: ${get('pagination.borderRadius')};
  transition: border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);

  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${get('pagination.colors.hover.border')};
    outline: 0;
    transition-duration: 0.1s;
  }

  &:active {
    border-color: ${get('pagination.colors.active.border')};
  }

  &[rel='prev'],
  &[rel='next'] {
    color: ${get('pagination.colors.nextPrevious.fg')};
  }

  &[aria-current],
  &[aria-current]:hover {
    color: ${get('pagination.colors.selected.fg')};
    background-color: ${get('pagination.colors.selected.bg')};
    border-color: ${get('pagination.colors.selected.border')};
  }

  &[aria-disabled],
  &[aria-disabled]:hover {
    color: ${get('pagination.colors.disabled.fg')}; // check
    cursor: default;
    border-color: ${get('pagination.colors.disabled.border')};
  }

  @supports (clip-path: polygon(50% 0, 100% 50%, 50% 100%)) {
    &[rel='prev']::before,
    &[rel='next']::after {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: text-bottom;
      content: '';
      background-color: currentColor;
    }

    // chevron-left
    &[rel='prev']::before {
      margin-right: ${get('pagination.spaceBetween')};
      clip-path: polygon(
        9.8px 12.8px,
        8.7px 12.8px,
        4.5px 8.5px,
        4.5px 7.5px,
        8.7px 3.2px,
        9.8px 4.3px,
        6.1px 8px,
        9.8px 11.7px,
        9.8px 12.8px
      );
    }

    // chevron-right
    &[rel='next']::after {
      margin-left: ${get('pagination.spaceBetween')};
      clip-path: polygon(
        6.2px 3.2px,
        7.3px 3.2px,
        11.5px 7.5px,
        11.5px 8.5px,
        7.3px 12.8px,
        6.2px 11.7px,
        9.9px 8px,
        6.2px 4.3px,
        6.2px 3.2px
      );
    }
  }

  ${COMMON};
`

type UsePaginationPagesParameters = {
  theme?: object // set to theme type once /src/theme.js is converted
  pageCount: number
  currentPage: number
  onPageChange: (e: React.MouseEvent, n: number) => void
  hrefBuilder: (n: number) => string
  marginPageCount: number
  showPages?: boolean
  surroundingPageCount: number
}

function usePaginationPages({
  theme,
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder,
  marginPageCount,
  showPages,
  surroundingPageCount
}: UsePaginationPagesParameters) {
  const pageChange = React.useCallback(n => (e: React.MouseEvent) => onPageChange(e, n), [onPageChange])

  const model = React.useMemo(() => {
    return buildPaginationModel(pageCount, currentPage, !!showPages, marginPageCount, surroundingPageCount)
  }, [pageCount, currentPage, showPages, marginPageCount, surroundingPageCount])

  const children = React.useMemo(() => {
    return model.map(page => {
      const {props, key, content} = buildComponentData(page, hrefBuilder, pageChange(page.num))
      return (
        <Page {...props} key={key} theme={theme}>
          {content}
        </Page>
      )
    })
  }, [model, hrefBuilder, pageChange, theme])

  return children
}

const PaginationContainer = styled.nav`
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
  ${sx};
`

export type PaginationProps = {
  theme?: object
  pageCount: number
  currentPage: number
  onPageChange?: (e: React.MouseEvent, n: number) => void
  hrefBuilder?: (n: number) => string
  marginPageCount: number
  showPages?: boolean
  surroundingPageCount?: number
}

function Pagination({
  theme,
  pageCount,
  currentPage,
  onPageChange = noop,
  hrefBuilder = defaultHrefBuilder,
  marginPageCount = 1,
  showPages = true,
  surroundingPageCount = 2,
  ...rest
}: PaginationProps) {
  const pageElements = usePaginationPages({
    theme,
    pageCount,
    currentPage,
    onPageChange,
    hrefBuilder,
    marginPageCount,
    showPages,
    surroundingPageCount
  })
  return (
    <PaginationContainer aria-label="Pagination" {...rest} theme={theme}>
      <Box display="inline-block" theme={theme}>
        {pageElements}
      </Box>
    </PaginationContainer>
  )
}

function defaultHrefBuilder(pageNum: number) {
  return `#${pageNum}`
}

function noop() {}

Pagination.defaultProps = {
  hrefBuilder: defaultHrefBuilder,
  marginPageCount: 1,
  onPageChange: noop,
  showPages: true,
  surroundingPageCount: 2
}

export default Pagination
