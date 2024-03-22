export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    if (!query.browser) return
    if (query?.browser === 'all') {
      await Promise.all([
        runTask('db:scrape:chromium'),
        runTask('db:scrape:webkit'),
        runTask('db:scrape:firefox'),
      ])
    } else {
      await runTask(`db:scrape:${query?.browser}`)
    }

    return
  } catch (error) {
    throw createError({ status: 500, message: `${error}` })
  }
})
