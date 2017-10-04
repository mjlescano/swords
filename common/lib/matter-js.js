/**
 * Monkey patch matter-js to make it work on node
 */

// use the unbundled version
import Matter from 'matter-js/src/module/main'

// https://github.com/liabru/matter-js/issues/468
Matter.Common.isElement = () => false

export default Matter
