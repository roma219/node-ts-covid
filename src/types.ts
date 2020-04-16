
declare global {
    namespace Express {
        interface Request {
            user?: string
        }
    }
}

export type User = {
    login: string
    password: string
}

export type CountryData = {
    name: string
    totalCases: number
    totalDeaths: number
}

export enum TableFields {'Country,Other', 'TotalCases', 'TotalDeaths'}

export enum DataFields {
    'Country,Other' = 'name',
    'TotalCases' = 'totalCases',
    'TotalDeaths' = 'totalDeaths',
}
