const api_values_url = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/';
const api_sensor_url = 'http://api.gios.gov.pl/pjp-api/rest/station/sensors/';
const currentStationId = '501';
const latestTest = 0;
const PM10_id = 3;
const PM25_id = 69;

const getSensorId = async (id, paramId) => {
    const response = await fetch(api_sensor_url + id);
    const data = await response.json();

    const sensorId = data.find(item => item.param.idParam === paramId).id.toString();
    return sensorId;
}

const getSensorValues = async (pollutionId) => {
    const sensorId = await getSensorId(currentStationId, pollutionId);

    const response = await fetch(api_values_url + sensorId);
    const data = await response.json();

    const latestValue = data.values[latestTest].value;
    return latestValue;
}

const setSensorValues = async () => {
    let PM10_value = await getSensorValues(PM10_id);
    //document.getElementById('PM10').textContent = PM10_value;

    let PM25_value = await getSensorValues(PM25_id);
    //document.getElementById('PM2.5').textContent = PM25_value;
}

setSensorValues();



//console.log(PM10_value);
