// Module Imports
import UUIDv4 from 'uuid/v4'





// Component Imports
import isRequired from './isRequired'





// Component Constants
const ALERT_LEVELS = {
  success: 'Success!',
  info: 'Info',
  warn: 'Warning',
  error: 'Error',
}





export default function (body, level, title, duration, suppressMenu) {
  const id = UUIDv4()

  if (level && !Object.keys(ALERT_LEVELS).includes(level)) {
    throw new Error(`options.level must be one of: ${JSON.stringify(Object.keys(ALERT_LEVELS))}`)
  }

  return {
    id,
    type: 'website-alerts',
    attributes: {
      body: body || isRequired('body'),
      createdAt: Date.now(),
      duration: typeof duration === 'number' ? duration : 10000,
      level: level || 'error',
      suppressMenu,
      title: title || ALERT_LEVELS[(level || 'error')],
    },
  }
}
