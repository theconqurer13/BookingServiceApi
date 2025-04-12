const {BookingRepository} = require('../repository/index');
const axios = require('axios'); 
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const {ServiceError} = require('../utils/errors/service-errors');
class BookingService {

    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight');
            }
            const totalCost = priceOfFlight * data.noOfSeats;
            const bookingPlayload = {...data,totalCost};   
            const booking = await this.bookingRepository.create(bookingPlayload);
             
        } catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            
            throw new ServiceError();
        }
    } 

}

module.exports = BookingService;
