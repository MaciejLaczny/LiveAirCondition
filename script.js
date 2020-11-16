const api_values_url = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/'
const api_sensors_url = 'http://api.gios.gov.pl/pjp-api/rest/station/sensors/'
const api_city_url = 'http://api.gios.gov.pl/pjp-api/rest/station/findAll'
const stationName = 'Płock-Reja'
const latestTest = 0

const getCityID = async (stationName) => {
    const response = await fetch(api_city_url)
    const data = await response.json()
    return data.find(city => city.stationName === stationName).id.toString()
}

const getCitySensors = async () => {
    const cityID = await getCityID(stationName)
    const response = await fetch(api_sensors_url + cityID)
    const data = await response.json()
    console.log(data)
    return data
}

const getParamID = async (paramCode) => {
    const citySensors = await getCitySensors()
    const paramID = citySensors.find(sensor => sensor.param.paramCode === paramCode).id.toString()
    return paramID
}

const getParamValue = async (paramLabel) => {
    const paramID = await getParamID(paramLabel)
    const response = await fetch(api_values_url + paramID)
    const data = await response.json()
    return data.values[latestTest].value
}

const setSensor = async () => {
    const PM10Label = document.getElementById('PM10Label').innerHTML
    const PM10Value = await getParamValue(PM10Label)
    document.getElementById('PM10Value').textContent = PM10Value
}

setSensor()










