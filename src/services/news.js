import { post } from '../utils/request'
import { get } from '../utils/request'

export function newsList() {
  return post('/api/v2/proxy', {
    url: 'https://36kr.com/pp/api/aggregation-entity?type=web_latest_article&b_id=51329&per_page=15'
  })
}

export function newsList2() {
  return post('/api/v2/proxy', {
    url: 'https://36kr.com/pp/api/feed-stream?type=web&feed_id=303&b_id=339102&per_page=10'
  })
}

export function loginFn(user) {
  return post('/api/v1/auth/login', user)
}

export function registFn(user) {
  return post('/api/v1/auth/reg', user)
}
