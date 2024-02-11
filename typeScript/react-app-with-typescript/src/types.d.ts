export interface Sub {
    nick: string
    subMonths: number
    avatar: string
    description?: string
}

export interface SubFromApi {
    nick: string
    months: number
    profileUrl: string
    description?: string
}

export type SubsFromApi = Array<SubFromApi>