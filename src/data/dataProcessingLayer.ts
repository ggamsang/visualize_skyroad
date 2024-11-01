import { flightsLAX2RKSI, flightsDepartureAirport } from "../dummyData";
import { Aircraft, AircraftStatus, Flight, FlightList } from "../api/flight";
import { getAllActiveFlights, getDepartureAirport } from "../api/flight";
import { Airport } from "../api/airports";

// export const getDepartureAirport = async (airportICAO: string): Promise<any> => {
//     const TIMESTAMP_END = 1730194134
//     const url = `https://opensky-network.org/api/flights/departure?airport=${airportICAO}&begin=${TIMESTAMP_BEGIN}&end=${TIMESTAMP_END}`
//     const response = await fetch(url)
//     const data = await response.json()

//     return data
// }
const getAircraftTracks = async (flight: Flight): Promise<any> => {
    const TIMESTAMP_BEGIN = 1729589334
    const url = `https://opensky-network.org/api/tracks/all?icao24=${flight.icao24}&time=${flight.lastSeen}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const requestFlightTrack = async (flight: any) => {
    return await getAircraftTracks(flight)//.then(console.log)
    // const index = await flightsLAX2RKSI.findIndex(track => track.icao24 === flight.icao24);
    // return flightsLAX2RKSI[index] || {};
}

const requestFlightList = async ({ departureAirport, arrivalAirport, }
    : { departureAirport: Airport, arrivalAirport: Airport })
    : Promise<FlightList> => {

    console.log("****", departureAirport, arrivalAirport)

    return await getDepartureAirport(departureAirport["icao"])
        .then(flights => {
            const flightList: FlightList = flights
                .filter((flight: any) => flight.estArrivalAirport === arrivalAirport['icao'])
                .map((flight: any) => ({
                    ...flight,
                    text: `항공편:${flight.callsign}`,
                    dep: `출발:[공항이름](${flight.estDepartureAirport})`,
                    arr: `도착:[공항이름](${flight.estArrivalAirport})`
                }))
            console.log('******depart', flightList)
            return flightList
        })

    // const FlightList = flightsDepartureAirport
    //     .filter(flight => flight.estDepartureAirport === departureAirport.icao &&
    //         flight.estArrivalAirport === arrivalAirport.icao)
    //     .map(flight => (
    //         {
    //             ...flight,
    //             text: `항공편:${flight.callsign}`,
    //             dep: `출발:[공항이름](${flight.estDepartureAirport})`,
    //             arr: `도착:[공항이름](${flight.estArrivalAirport})`
    //         }));

    // 
    /*
        "icao24": "4d00f3",
        "firstSeen": 1725186940,
        "estDepartureAirport": "ELLX",
        "lastSeen": 1725195565,
        "estArrivalAirport": "LEMG",
        "callsign": "LGL663  ",
    */
    // return FlightList;
}

export { requestFlightList, requestFlightTrack, };


