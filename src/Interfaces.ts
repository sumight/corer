import {Keys} from './Keys'

export interface InterfacePost {
  [Keys.UserId]:number,
  [Keys.Id]:number,
  [Keys.Title]:string,
  [Keys.Body]:string
}

export interface InterfacePostFilter {
  [Keys.Body]:string,
  [Keys.Title]:string
}