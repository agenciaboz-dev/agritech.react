declare interface CurrentConditions {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: null | string
    windgust: null | number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    conditions: string
    icon: string
    stations: string[]
    source: string
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
}
