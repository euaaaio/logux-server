let { parseId } = require('@logux/core')
let semver = require('semver')

class Context {
  constructor (server, meta) {
    this.server = server
    this.meta = meta
    this.data = {}

    let parsed = parseId(meta.id)
    this.nodeId = parsed.nodeId
    this.userId = parsed.userId
    this.clientId = parsed.clientId
    this.isServer = this.userId === 'server'

    let client = server.clientIds.get(this.clientId)

    if (meta.subprotocol) {
      this.subprotocol = meta.subprotocol
    } else if (client) {
      this.subprotocol = client.node.remoteSubprotocol
    }

    if (client) {
      this.headers = client.node.remoteHeaders
    } else {
      this.headers = {}
    }
  }

  isSubprotocol (range) {
    return semver.satisfies(this.subprotocol, range)
  }

  sendBack (action, meta = {}) {
    return this.server.log.add(action, {
      status: 'processed',
      clients: [this.clientId],
      ...meta
    })
  }

  answer (action, meta = {}) {
    meta.answer = this.meta.id
    return this.sendBack(action, meta)
  }
}

module.exports = Context
