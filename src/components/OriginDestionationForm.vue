<template>
    <section class="origin-destination-form">
        <div class="ui form">
            <div class="ui message red small" v-show="error">{{ error }}</div>
            <div class="two fields">
                <div class="field">
                    <div class="ui left icon input">
                        <!-- <i class=" dot circle link icon" @click="locatorButtonPressed"></i> -->
                        <i class="marker alternate icon"></i>
                        <input type="text" placeholder="Origin" v-model="address" ref="origin"/>                        
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="flag checkered icon"></i>
                        <!-- <i class=" dot circle link icon" @click="locatorButtonPressed"></i> -->
                        <input type="text" placeholder="Destination" ref="destination"/>                        
                    </div>
                </div>
                <button class="ui button small green" :class="{loading:spinner}" @click="calculateButtonPresses">calculate</button>
            </div>
        </div>
    </section>
</template>

<style>

.origin-destination-form{
    position: relative;
    z-index: 1;
    max-width: 610;
    margin: 10px;
}

</style>


<script>

import axios from 'axios';
import firebase from 'firebase';
export default{

    data(){

        return {
            route:{
                origin:{
                    address:'',
                    lat: 0,
                    lng: 0,
                },
                destination:{
                    address:'',
                    lat: 0,
                    lng: 0,
                },
                distance:{},
                duration:{}
            },
            error:"",
            spinner: false,
            address:""
        }
    },

    mounted(){
        for(let ref in this.$refs){
            const autocomplete = new google.maps.places.Autocomplete(
                this.$refs[ref],
            )
            autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            this.route[ref].address = `${place.name}, ${place.vicinity}`;
            this.route[ref].lat = place.geometry.location.lat();
            this.route[ref].lng = place.geometry.location.lng();
        });
        }
        
        // const originAutoComplete = new google.maps.places.Autocomplete(
        //     this.$refs["origin"],
        //     // {
        //     //     bounds: new google.maos,LatLngBounds(
        //     //         new google.maps.LatLng()
        //     //     )
        //     // }
        // );
        // originAutoComplete.addListener("okace_changed", () => {
        //     originAutoComplete.getPlace();
        // })
        // const destinationAutoComplete = new google.maps.places.Autocomplete(
        //     this.$refs["destination"],
        //     // {
        //     //     bounds: new google.maos,LatLngBounds(
        //     //         new google.maps.LatLng()
        //     //     )
        //     // }
        // );
        // destinationAutoComplete.addListener("place_changed", () => {
        //     destinationAutoComplete.getPlace();
        // })
    },
    methods:{
        calculateButtonPresses(){
            this.spinner = true;
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${this.route.destination.lat},${this.route.destination.lng}&origins=${this.route.origin.lat}, ${this.route.origin.lng}&key=AIzaSyBuB1l8grZngQTz6nj7MKjYHkKuPdzcoDY`;
            
            axios.get(URL).then((response) => {
                if(response.data.error_message){
                    this.error = response.data.error_message;
                } else {
                    //console.log(response.data);
                    const elements = response.data.rows[0].elements;
                    if(elements[0].status === "ZERO_RESULTS") {
                        this.error = "No Results Found"
                    } else {
                        this.route.distance = elements[0].distance;
                        this.route.duration = elements[0].duration;
                        this.route.color = this.getRandomColor();

                        this.saveRoute();

                    }
                    this.spinner = false;
                }
                
            }).catch(error =>{
                this.error = error.message;
                console.log(error.message);
            });
        },
        saveRoute(){
            const db = firebase.firestore();
            db.collection("routes")
                .doc()
                .set(this.route);
        },
        getRandomColor(){
            let characters = "0123456789ABCEDF"
            let color = "#";
            for(let i = 0; i < 6; i++){
                color += characters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        locatorButtonPressed(){

            this.spinner = true;

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                this.getAddressFrom(position.coords.latitude, position.coords.longitude);
                this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
                //  console.log(position.coords.latitude);
                //  console.log(position.coords.longitude);
                },

                error => {
                    this.error = "The locator was denied permission to find you. Please enter your address manually";
                    this.spinner = false;
                });
            } else {
                this.error = "Your browser does not support geolocation API";
                this.spinner = false;
                //console.log("Your browser does not support geolocation API");
            }
        },
        getAddressFrom(lat, long){
             axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBuB1l8grZngQTz6nj7MKjYHkKuPdzcoDY").then(response =>{
                 if(response.data.error_message){
                    this.error = esponse.data.error.message;
                    //console.log(response.data.error.message)
                 }else{
                    this.address = response.data.results[0].formatted_address
                    console.log(response.data.results[0].formatted_address);
                 }
                 this.spinner = false;
             })
             .catch(error => {
                this.error = error.message;
                this.spinner = false;
                //console.log(error.message);
             })
        },
    }
};

</script>