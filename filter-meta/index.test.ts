import { it, expect } from 'vitest'

import { filterMeta, ServerMeta } from '../index.js'

it('filters meta', () => {
  let meta1: ServerMeta = {
    id: '1 test 0',
    time: 0,
    added: 0,
    status: 'processed',
    server: '',
    reasons: []
  }
  expect(filterMeta(meta1)).toEqual({ id: '1 test 0', time: 0 })
  let meta2: ServerMeta = {
    id: '1 test 0',
    time: 0,
    added: 0,
    reasons: [],
    server: '',
    subprotocol: '1.1.0'
  }
  expect(filterMeta(meta2).subprotocol).toEqual('1.1.0')
})
