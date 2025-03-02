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

module.exports.confirmRide = async({driver, rideId})=>{
    if(!rideId){
        throw new Error("rideId is required")
    }
    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: "accepted",
        driver: driver._id
    })

    const ride = await rideModel.findOne({_id:rideId}).populate("user").populate("driver").select("+otp") 
    if(!ride){
        throw new Error("ride not found")
    }
    return ride
}

module.exports.startRide = async ({rideId, otp})=>{
    if(!rideId){
        throw new Error("rideId is required")
    }
    if(!otp){
        throw new Error("OTP is required")
    }
    const ride = await rideModel.findOne({_id: rideId}).populate("user").populate("driver").select("+otp")
    if(!ride){
        throw new Error("ride not found")
    }
    
    if(otp !== ride.otp){
        throw new Error("invalid OTP")
    }
    if(ride.status !== "accepted"){
        throw new Error("ride is not accepted")
    }
    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: "ongoing"
    })
    return ride;
}

module.exports.endRide = async({rideId})=>{
    if(!rideId){
        throw new Error("rideId is required")
    }
    const ride = await rideModel.findOne({_id: rideId}).populate("user").populate("driver").select("+otp")
    if(!ride){
        throw new Error("ride not found")
    }
    if(ride.status !== "ongoing"){
        throw new Error("ride not ongoing")
    }
    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: "completed"
    })
    return ride
}