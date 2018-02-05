// Module imports
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import Component from '../../components/Component'
import Map from '../../components/Map'
import Page from '../../components/Page'





// Component constants
const title = 'Manage Group'





class ManageGroup extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const { getGroup } = this.props
    const { id } = this.props.query
    let { group } = this.props

    if (!group) {
      group = await getGroup(id)
    }

    this.setState({
      group,
      loaded: true,
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      group: null,
      loaded: false,
    }
  }

  render () {
    const {
      loaded,
      group,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Manage {group ? group.attributes.name : 'Group'}</h1>
        </header>

        {!loaded && (
          <p>Loading...</p>
        )}

        {(loaded && !group) && (
          <p>No group with that ID was found.</p>
        )}

        {(loaded && group) && (
          <React.Fragment>
            <div className="games">
              <h2>Games</h2>
              <ul className="comma-separated inline">
                {group.attributes.games.map(game => (
                  <li key={game}>{game}</li>
                ))}
              </ul>
            </div>

            <div className="description">
              <h2>Description</h2>
              <p>{group.attributes.description || 'No description.'}</p>
            </div>

            <div className="location">
              <h2>Location</h2>
              <Map
                location={group.attributes.geo}
                markers={[{
                  ...group.attributes.geo,
                  label: group.attributes.address,
                }]}
                searchable={false} />
            </div>

            <div className="players">
              <ul>
                {[{ id: 1 }, { id: 2 }, { id: 3 }].map(({ id }) => (
                  <li key={id}>
                    <img
                      alt="Avatar for player"
                      className="avatar"
                      src={`//api.adorable.io/avatars/50/${Math.random()}`} />

                    <header>
                      Member
                    </header>

                    <menu
                      className="compact"
                      type="toolbar">
                      <div className="primary">
                        {/* <button className="small success">
                          Message
                        </button> */}

                        <button className="danger small">
                          Remove
                        </button>
                      </div>
                    </menu>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getGroup']

const mapStateToProps = (state, ownProps) => ({ group: state.groups[ownProps.query.id] || null })





export default Page(ManageGroup, title, {
  mapDispatchToProps,
  mapStateToProps,
})