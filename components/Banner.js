// Module imports
import React from 'react'





// Component imports
import { Link } from '../routes'
import Nav from './Nav'





export default (props) => (
  <React.Fragment>
    <input
      hidden
      id="application-banner-control"
      type="checkbox" />

    <header role="banner">
      <label
        className="button success"
        data-openNav
        htmlFor="application-banner-control">
        <i className="fas fa-fw fa-bars" />
        Menu
      </label>

      <label
        className="button secondary"
        data-closeNav
        htmlFor="application-banner-control">
        <i className="fas fa-fw fa-times" />
        Close
      </label>

      <Link href="/">
        <a><div className="brand" /></a>
      </Link>

      <Nav path={props.path} />

      <footer>
        <small>
          Questions, comments, or concerns? <a href="//rollforguild.atlassian.net/servicedesk/customer/portal/1" rel="noopener noreferrer" target="_blank">Let us know!</a>
        </small>

        <nav className="social">
          <a href="//twitter.com/RollForGuild">
            <i
              aria-label="Twitter Icon"
              role="img"
              className="fab fa-fw fa-twitter" />
          </a>

          <a href="//instagram.com/RollForGuild">
            <i
              aria-label="Instagram Icon"
              role="img"
              className="fab fa-fw fa-instagram" />
          </a>

          <a href="//facebook.com/RollForGuild">
            <i
              aria-label="Facebook Icon"
              role="img"
              className="fab fa-fw fa-facebook" />
          </a>
        </nav>
      </footer>
    </header>
  </React.Fragment>
)