const {BookingRepository} = require('../repository/index');
const axios = require('axios'); 

class BookingService {

    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const flight = await axios.get()
        } catch (error) {
            
        }
    }

}

