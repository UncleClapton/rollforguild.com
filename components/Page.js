// Module imports
import { bindActionCreators } from 'redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import Head from './Head'
import Header from './Header'





// Component constants
initStore()





export default (Component, title = 'Untitled', reduxOptions = {}) => {
  class Page extends React.Component {
    static async getInitialProps(ctx) {
      const {
        asPath,
        isServer,
        query,
      } = ctx
      let props = {}

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx)
      }

      return {
        asPath,
        isServer,
        query,
        ...props,
      }
    }

    render () {
      const mainClasses = ['fade-in', 'page', title.toLowerCase().replace(' ', '-')].join(' ')

      return (
        <div role="application">
          <Head title={title} />

          <Header />

          <main className={mainClasses}>
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  let { mapDispatchToProps } = reduxOptions

  if (Array.isArray(reduxOptions.mapDispatchToProps)) {
    mapDispatchToProps = dispatch => {
      const actionMap = {}

      for (const actionName of reduxOptions.mapDispatchToProps) {
        actionMap[actionName] = bindActionCreators(actions[actionName], dispatch)
      }

      return actionMap
    }
  }

  return withRedux(initStore, reduxOptions.mapStateToProps, mapDispatchToProps)(Page)
}
