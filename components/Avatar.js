// Module Imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'





// Component Imports
import { actions } from '../store'
import AvatarUploader from './AvatarUploaderDialog'
import Component from './Component'





// Component Constants
const srcType = {
  groups: 'groups',
  'group-members': 'users',
  'join-requests': 'users',
  users: 'users',
}

const renderTypeLabel = {
  groups: group => group.attributes.name,
  users: user => user.attributes.username,
}

const avatarSize = {
  tiny: {
    name: 'tiny',
    px: 40,
  },
  small: {
    name: 'small',
    px: 100,
  },
  medium: {
    name: 'medium',
    px: 200,
  },
  large: {
    name: 'large',
    px: 400,
  },
}




/**
 * Handles loading and management of a user or group avatar.
 * Can also handle uploading new avatars through the 'editable' prop.
 *
 * @class Avatar
 * @extends {Component}
 */
class Avatar extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _displayUploader () {
    this.setState({ displayUploader: true })
  }

  async _handleUploaderComplete (_fileBlob) {
    const {
      updateAvatar,
    } = this.props

    const {
      id,
      type,
    } = this.state

    const fileBlob = _fileBlob

    fileBlob.name = `${srcType[type]}-${id}-avatar`

    const { status } = await updateAvatar(srcType[type], id, fileBlob)

    if (status === 'error') {
      return 'File Upload Error. Please Try again.'
    }

    this.setState({ displayUploader: false })

    return null
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillReceiveProps (nextProps) {
    if (!nextProps.src) {
      throw new ReferenceError('props.src is not defined')
    }

    const {
      id,
      type,
      attributes,
    } = nextProps.src

    const size = { ...avatarSize[nextProps.size] }
    const hasAvatar = srcType[type] && attributes && attributes.avatar
    const avatarLabel = srcType[type] && renderTypeLabel[srcType[type]] ? renderTypeLabel[srcType[type]](nextProps.src) : id

    this.setState({
      avatarLabel,
      id,
      type,
      size,
      avatarUrl: hasAvatar ? `/api/${srcType[type]}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods(['_handleUploaderComplete'])

    if (!props.src) {
      throw new ReferenceError('props.src is not defined')
    }

    const {
      id,
      type,
      attributes,
    } = props.src

    const size = { ...avatarSize[props.size] }
    const hasAvatar = srcType[type] && attributes && attributes.avatar
    const avatarLabel = srcType[type] && renderTypeLabel[srcType[type]] ? renderTypeLabel[srcType[type]](props.src) : id

    this.state = {
      avatarLabel,
      id,
      size,
      type,
      avatarUrl: hasAvatar ? `/api/${srcType[type]}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
      displayUploader: false,
    }
  }

  render () {
    const {
      avatarLabel,
      avatarUrl,
      displayUploader,
      size,
    } = this.state

    const {
      cachedAvatar,
      editable,
      className,
    } = this.props

    const avatar = cachedAvatar || avatarUrl

    return (
      <React.Fragment>
        <div
          aria-label={`${avatarLabel}'s avatar`}
          className={`avatar ${size.name} ${className}`}
          data-t="avatar:avatar"
          role="img"
          style={{ backgroundImage: `url(${avatar})` }}>
          {editable && (
            <button
              className="avatar-edit-overlay"
              data-t="avatar:avatar:edit-overlay"
              onClick={() => this.setState({ displayUploader: true })}>
              <h4>Edit</h4>
            </button>
          )}
        </div>

        {displayUploader && (
          <AvatarUploader
            data-t="avatar:avatar-uploader"
            visible={displayUploader}
            onComplete={this._handleUploaderComplete}
            onCancel={() => this.setState({ displayUploader: false })} />
        )}
      </React.Fragment>
    )
  }
}

Avatar.defaultProps = {
  cachedAvatar: null,
  className: '',
  editable: false,
  size: 'large',
  src: null,
}

Avatar.propTypes = {
  cachedAvatar: PropTypes.string,
  updateAvatar: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(avatarSize)),
  src: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(srcType)).isRequired,
    attributes: PropTypes.shape({
      avatar: PropTypes.bool,
    }),
  }),
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateAvatar: actions.updateAvatar,
}, dispatch)

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.src) {
    return {
      cachedAvatar: null,
    }
  }

  const {
    id,
    type,
  } = ownProps.src

  let cachedAvatar = null

  if (srcType[type]) {
    cachedAvatar = state.avatars[srcType[type]] && state.avatars[srcType[type]][id]
  }

  return {
    cachedAvatar,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
export { Avatar }
