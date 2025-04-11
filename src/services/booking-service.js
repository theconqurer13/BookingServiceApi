const {BookingRepository} = require('../repository/index');
const axios = require('axios'); 
const {FLIGHT_SERVICE_PATH} = require('../config/index');
class BookingService {

    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightRequestURL);
            return flight;

        } catch (error) {
            console.log("Error in service layer");
            throw {error};
        }
    } 

}

module.exports = BookingService;
