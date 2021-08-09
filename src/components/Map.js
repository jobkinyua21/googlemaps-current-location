import React from 'react';
import {GoogleMap,DirectionsRenderer} from  "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
// const google=window.google;
const defaultLocation = { lat: -1.29129, lng: 36.824672 };
let destination = { lat:-1.291731, lng: 36.825409 };
const key ="";
const lib=["places"];
let directionsService;

class Map extends React.Component{
    state={
    directions:null,
    bounds:null,
    maps:null,
    markers:[],
    currentLocation:{lat:0,lng:0},

};
onMapLoad = map=>{
    navigator.geolocation.getCurrentPosition(
        ({coords:{latitude:lat, longitude:lng}})=>{
            const pos={lat,lng};
            this.setState({ currentLocation:pos });

            directionsService=new window.google.maps.DirectionsService();
             
            //load  current user origi and slot1 destination
            this.changeDirection(pos,destination);
        }
    );
};

// function that is calling the directions service
changeDirection=(pos,destination)=>{
    directionsService.route(
        {
            origin:pos,
            destination:destination,
            travelMode:window.google.maps.TravelMode.DRIVING
        },
        (result,status)=>{
            if (status===window.google.maps.DirectionsStatus.OK) {
                //changing the state of directions to the result of direction service
                this.setState({
                    directions:result
                });
            }else{
                console.error(`error fetching directions ${result}`);
            }
        }

    );
};

render(){
    return(
        <div>
            <LoadScript
             googleMapsApiKey={key} libraries={lib}>
             
                <GoogleMap
                center={defaultLocation}
                zoom={5}
                onLoad={map => this.onMapLoad(map)}
                mapContainerStyle={{height: "400px", width: "800px"}}>
                    {this.state.directions !== null &&(
                        <DirectionsRenderer directions={this.state.directions}/>

                    )}
                </GoogleMap>
             </LoadScript>
        </div>
    );
}
}

export default Map;