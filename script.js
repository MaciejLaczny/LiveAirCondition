const api_values_url = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/'
const api_sensors_url = 'http://api.gios.gov.pl/pjp-api/rest/station/sensors/'
const api_city_url = 'http://api.gios.gov.pl/pjp-api/rest/station/findAll'
const api_quality_url = 'http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/'
const stationName = 'Płock-Reja'
const latestTest = 0

const PM10Value = document.getElementById('PM10Value')
const PM25Value = document.getElementById('PM25Value')
const COValue = document.getElementById('COValue')
const SO2Value = document.getElementById('SO2Value')
const qualityValue = document.getElementById('qualityValue')
const PM10Indicator = document.getElementById('PM10Indicator')
const PM25Indicator = document.getElementById('PM25Indicator')
const COIndicator = document.getElementById('COIndicator')

const getCityID = async (stationName) => {
    const response = await fetch(api_city_url)
    const data = await response.json()
    return data.find(city => city.stationName === stationName).id.toString()
}

const getCitySensors = async () => {
    const cityID = await getCityID(stationName)
    const response = await fetch(api_sensors_url + cityID)
    return await response.json()
}

const getParamID = async (paramCode) => {
    const citySensors = await getCitySensors()
    return citySensors.find(sensor => sensor.param.paramCode === paramCode).id.toString()
}

const getParamValue = async (paramLabel) => {
    const paramID = await getParamID(paramLabel)
    const response = await fetch(api_values_url + paramID)
    const data = await response.json()
    const current = data.values[latestTest].value
    if(!current){
        return data.values[latestTest + 1].value
    } else {
        return current
    } 
}

const getQuality = async () => {
    const cityID = await getCityID(stationName)
    const response = await fetch(api_quality_url + cityID)
    const data = await response.json()
    return data.stIndexLevel.indexLevelName
}

const setColor = (indicator, value, lowerLimit, upperLimit) => {
    if(value < lowerLimit){
        indicator.className = 'card-panel green darken-1'
    } else if(value >= lowerLimit && value < upperLimit) {
        indicator.className = 'card-panel yellow darken-2'
    } else {
        indicator.className = 'card-panel red darken-1'
    }
}

const setQuality = (async () => {
    qualityValue.textContent = await getQuality()
})()

const setIndicators = (async () => {
    const PM10 = (await getParamValue('PM10')).toFixed(2)
    PM10Value.textContent = PM10
    setColor(PM10Indicator, PM10, 60, 140)

    const PM25 = (await getParamValue('PM2.5')).toFixed(2)
    PM25Value.textContent = PM25
    setColor(PM25Indicator, PM25, 36, 84)

    const CO = (await getParamValue('CO')).toFixed(2)
    COValue.textContent = CO
    setColor(COIndicator, CO, 600, 1400)

    const SO2 = (await getParamValue('SO2')).toFixed(2)
    SO2Value.textContent = SO2
    setColor(SO2Indicator, SO2, 100, 350)
})()









