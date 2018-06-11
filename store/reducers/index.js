import { combineReducers } from 'redux'
import alerts from './alerts'
import authentication from './authentication'
import avatars from './avatars'
import characters from './characters'
import events from './events'
import games from './games'
import groups from './groups'
import rulesets from './rulesets'
import forums from './forums'
import users from './users'
import wordpress from './wordpress'
import __pending from './pending'




export default combineReducers({
  alerts,
  authentication,
  avatars,
  characters,
  events,
  games,
  forums,
  groups,
  rulesets,
  users,
  wordpress,
  __pending,
})
