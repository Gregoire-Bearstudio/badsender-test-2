'use strict'

// https://github.com/jaredhanson/oauth2orize
// https://github.com/awais786327/oauth2orize-examples
// https://github.com/solderjs/example-oauth2orize-consumer

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BasicStrategy = require('passport-http').BasicStrategy
const ClientPasswordStrategy = require('passport-oauth2-client-password')
  .Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const createError = require('http-errors')

const config = require('../node.config.js')
const {
  Users,
  OAuthClients,
  OAuthTokens,
} = require('../common/models.common.js')

const adminUser = Object.freeze({
  isAdmin: true,
  id: config.admin.id,
  email: config.emailOptions.from,
  name: `admin`,
})

module.exports = {
  adminUser,
  GUARD_USER: guard(`user`),
  GUARD_USER_REDIRECT: guard(`user`, true),
  GUARD_ADMIN: guard(`admin`),
  GUARD_ADMIN_REDIRECT: guard(`admin`, true),
}

//////
// GUARD MIDDLEWARE
//////

// redirect parameter is used for pages outside Nuxt application
// • like the mosaico editor
function guard(role = `user`, redirect = false) {
  const isAdminRoute = role === `admin`
  return function guardRoute(req, res, next) {
    const { user } = req
    // non connected user shouldn't access those pages
    if (!user) {
      redirect
        ? res.redirect(`/account/login`)
        : next(new createError.Unauthorized())
      return
    }
    // non admin user shouldn't access those pages
    if (isAdminRoute && !user.isAdmin) {
      redirect
        ? res.redirect(`/account/admin`)
        : next(new createError.Unauthorized())
      return
    }
    next()
  }
}

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // admin
    if (username === config.admin.username) {
      if (password === config.admin.password) {
        return done(null, { ...adminUser })
      }
      return done(null, false, { message: 'password.error.incorrect' })
    }
    // user
    try {
      const user = await Users.findOne({
        email: username,
        isDeactivated: { $ne: true },
        token: { $exists: false },
      })
      if (!user) return done(null, false, { message: 'password.error.nouser' })
      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        return done(null, false, { message: 'password.error.incorrect' })
      }
      return done(null, user)
    } catch (err) {
      return done(null, false, err)
    }
  }),
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  if (id === config.admin.id) return done(null, { ...adminUser })
  try {
    const user = await Users.findOneForApi({
      _id: id,
      isDeactivated: { $ne: true },
      token: { $exists: false },
    })
    if (!user) return done(null, false)
    done(null, user.toJSON())
  } catch (err) {
    done(null, false, err)
  }
})

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
async function verifyClient(clientId, clientSecret, done) {
  try {
    const client = await OAuthClients.findByClientId(clientId)
    if (!client) return done(null, false)
    if (client.clientSecret !== clientSecret) return done(null, false)
    return done(null, client)
  } catch (error) {
    done(error)
  }
}

passport.use(new BasicStrategy(verifyClient))

passport.use(new ClientPasswordStrategy(verifyClient))

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(
  new BearerStrategy(async (accessToken, done) => {
    try {
      const token = await OAuthTokens.findById(accessToken)
      if (!token) return done(null, false)
      // The request came from a client only since userId is null,
      // therefore the client is passed back instead of a user.
      const queryToRun = token.userId
        ? Users.findById(token.userId)
        : OAuthClients.findByClientId(token.clientId)
      const result = await queryToRun
      if (!result) return done(null, false)
      // To keep this example simple, restricted scopes are not implemented,
      // and this is just for illustrative purposes.
      done(null, user, { scope: '*' })
    } catch (error) {
      done(error)
    }
  }),
)