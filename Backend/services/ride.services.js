const mapService = require("./maps.services")
const crypto = require("crypto")
const rideModel = require("../models/ride.model")

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const distanceKm = distanceTime.distance.value / 1000; 
        const durationMin = distanceTime.duration.value / 60;  

        const pricing = {
            auto: { baseFare: 20, perKm: 8, perMinute: 1.5 },
            car: { baseFare: 40, perKm: 12, perMinute: 2.5 },
            moto: { baseFare: 15, perKm: 6, perMinute: 1 },
            premier: { baseFare: 60, perKm: 16, perMinute: 3 } 
        };

        const fare = {};

        for (const vehicle in pricing) {
            const { baseFare, perKm, perMinute } = pricing[vehicle];
            fare[vehicle] = Math.round(baseFare + (distanceKm * perKm) + (durationMin * perMinute));
        }

    return fare;


}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}