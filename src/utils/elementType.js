import {wrapPrimitivePropType} from '../DocPropTypes'
import {isValidElementType} from 'react-is'

// This function is a temporary workaround until we can get
// the official PropTypes.elementType working (https://git.io/fjMLX).
// PropTypes.elementType is currently `undefined` in the browser.
const elementType = wrapPrimitivePropType(function(props, propName, componentName) {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}': the prop is not a valid React component`
    )
  }
}, 'elementType')

export default elementType
