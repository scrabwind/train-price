export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const result = await runTask('db:scrape', {
      payload: { browser: body?.browser },
    })

    return 'ok'
  } catch (error) {
    throw createError({ status: 500, message: `${error}` })
  }
})
