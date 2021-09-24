 //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
 
module.exports= {heading: 

    function calcCrow(lat1, lon1, lat2, lon2) {
        
        var dLon = toRad(lon2-lon1)
        var X =  Math.cos(toRad(lat2)) * Math.sin(dLon);
        
        var Y = Math.cos(toRad(lat1))*Math.sin(toRad(lat2))-Math.sin(toRad(lat1))*Math.cos(toRad(lat2))*Math.cos(dLon);
     
        var degAngle = toDeg(Math.atan2(X,Y));

        if (degAngle<=0){
            degAngle = 360+degAngle;
        }

        return degAngle;

    }

};

 // Converts numeric degrees to radians
function toRad(Value)  {
    return Value * Math.PI / 180;
}

function toDeg(Value) {
    return Value * 180 / Math.PI;
}
