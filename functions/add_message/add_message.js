// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb'),
  q = faunadb.query;

  exports.handler = async (event, context) => {
  try {
    const messageBody = JSON.parse(event.body)
    var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
    
    const result = await adminClient.query(
      q.Create(
        q.Collection('messages'),
        { data: { detail: messageBody.message } }
      )
    )

    // const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result.ref.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
