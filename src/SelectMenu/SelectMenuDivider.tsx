import styled, {css} from 'styled-components'
import {COMMON, get, SystemCommonProps} from '../constants'
import sx, {SxProp} from '../sx'
import {ComponentProps} from '../utils/types'

const dividerStyles = css`
  padding: ${get('space.1')} ${get('space.3')};
  margin: 0;
  font-size: ${get('fontSizes.0')};
  font-weight: ${get('fontWeights.bold')};
  color: ${get('colors.text.grayLight')};
  background-color: ${get('colors.bg.gray')};
  border-bottom: ${get('borderWidths.1')} solid ${get('colors.border.grayLight')};
`

const SelectMenuDivider = styled.div<SystemCommonProps & SxProp>`
  ${dividerStyles}
  ${COMMON}
  ${sx};
`

SelectMenuDivider.displayName = 'SelectMenu.Divider'

export type SelectMenuDividerProps = ComponentProps<typeof SelectMenuDivider>
export default SelectMenuDivider
