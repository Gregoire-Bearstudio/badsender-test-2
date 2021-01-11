'use strict'

const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

const config = require('../../node.config.js')
const { Mailings } = require('../../services/models.js')
const mail = require('../../services/mail.js')
const modelsUtils = require('../../models/utils.js')
const processMosaicoHtmlRender = require('./process-mosaico-html-render.js')

module.exports = asyncHandler(sendTestMail)

/**
 * @api {post} /mailings/:mailingId/mosaico/send-test-mail mailing test mail
 * @apiPermission user
 * @apiName SendMailingByMail
 * @apiGroup Mailings
 *
 * @apiParam {string} mailingId
 *
 * @apiParam (Body) {String} rcpt the recipient email address
 * @apiParam (Body) {String} html the HTML output get in mosaico by `viewModel.exportHTML()`
 *
 * @apiSuccess {String} mailingList the emails to which the mailing has been sent
 *
 */

async function sendTestMail(req, res) {
  const { user, body } = req
  const { mailingId } = req.params
  const query = modelsUtils.addGroupFilter(req.user, { _id: mailingId })
  const mailing = await Mailings.findOne(query)
    .select({ name: 1, _company: 1 })
    .lean()
  if (!mailing) throw new createError.NotFound()
  // TODO: add back group check
  // if (!isFromCompany(user, mailing._company)) throw new createError.Unauthorized()

  // body.html is the result of viewModel.exportHTML()
  // • in /src/js/ext/badsender-server-storage.js
  const html = processMosaicoHtmlRender(req.body.html)
  const mailInfo = await mail.send({
    to: body.rcpt,
    replyTo: user && user.email != null ? user.email : void 0,
    subject: config.emailOptions.testSubjectPrefix + mailing.name,
    html,
  })

  console.log(`Message sent: ${mailInfo.response}`)
  res.json({ mailingList: body.rcpt })
}
