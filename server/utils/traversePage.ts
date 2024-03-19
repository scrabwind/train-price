import { consola } from 'consola'

import type { Page } from 'playwright'

export const traversePage = async (page: Page) => {
  consola.info('Starting page traverse')

  await page.goto('https://www.cd.cz/en/spojeni-a-jizdenka/api-hp/')

  consola.info('Going to page')

  await page
    .getByRole('button', { name: 'Allow only necessary cookies' })
    .click()

  consola.success('Closed cookies')

  await page.locator('input[name="fasdlk"]').fill('Praha')

  consola.success('Filled praga')

  await page.getByLabel('Praha hl.n. station, district Praha, trains').click()

  consola.success('Clicked praga select')

  await page.locator('.connection-to input.select__input').fill('viden')

  consola.success('Filled vienna')

  await page.getByLabel('Vídeň municipality, Austria').click()

  consola.success('Clicked vienna select')

  await page.getByLabel('Date', { exact: true }).click()

  consola.success('Opened date calendar')

  await page.getByLabel('next', { exact: true }).click()

  consola.success('Chosen april')

  await page.getByText('25', { exact: true }).click()

  consola.success('Chosen day')

  await page.getByLabel('Time').fill('12:00')

  consola.success('Filled time')

  await page.getByRole('link', { name: 'Modify passenger(s)' }).click()

  consola.success('Chosen passengers')

  await page
    .getByLabel('Remove passenger Junior 18—25 years', { exact: true })
    .click()

  await page
    .getByRole('button', {
      name: 'Remove passenger Junior 18—25 years',
      exact: true,
    })
    .click()

  consola.success('Added passengers')

  await page.getByRole('button', { name: 'Finished' }).click()

  consola.success('Clicked finish')

  await page.getByLabel('Search').click()

  await page.waitForSelector('#connectionlistanchor')

  await page.waitForSelector('.split-button__btn--content')

  consola.success('Traversing page finished')
}
