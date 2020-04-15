import fetch from 'node-fetch'
import cheerio from 'cheerio'
import tableparser from 'cheerio-tableparser'
import { TableFields, CountryData, DataFields } from './types'

const fetchStats = () => {
  return fetch('https://www.worldometers.info/coronavirus/')
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body)
      tableparser($)
      const data = ($('#main_table_countries_today') as any).parsetable(true, true, true)

      const info = data.filter((row : string[]) => Object.values(TableFields).includes(row[0])).reduce((result : CountryData[], current: string[]) => {
        current.forEach((value, index) => {
          if (!result[index]) result[index] = { name: '', totalCases: 0, totalDeaths: 0 }
          ;(result[index] as any)[(DataFields as any)[current[0]]] = current[index]
        })
        return result
      }, [])

      info.shift()

      return info
    })
}

export { fetchStats }
