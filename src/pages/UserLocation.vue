<template>
    <div>
    <section class="ui two column centered grid" style="position: relative;z-index: 1;">
     <div class="column">
         <form class="ui segment large form">
             <div class="ui message red" v-show="error">{{ error }}</div>
             <div class="ui segment">
                 <div class="field">
                     <div class="ui right icon input large" :class="{loading:spinner}">
                         <input type="text" 
                            placeholder="Enter your address" 
                            v-model="address"
                            id="autocomplete"/>
                         <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                     </div>
                 </div>
                 <button class="ui button">go</button>
             </div>
         </form>
     </div>
     
   
    </section>
    <section id="map">

    </section>
    </div>
 </template>
 
 <script>
 
 import axios from 'axios'

 export default{

    data(){
        return {
            address:"",
            error:"",
            spinner: false,
            apiKey: "AIzaSyBuB1l8grZngQTz6nj7MKjYHkKuPdzcoDY"
        };
    },
    mounted() {
        let autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            // {
            //     bounds: new google.maps.LatLngBounds(
            //         new google.maps.LatLngBounds(40.6782, 73.9442)
            //     )
            // }
        )
        autocomplete.addListener("place_changed", () => {
            let place = autocomplete.getPlace();
            console.log(place)
            this.showUserLocationOnTheMap(place.geometry.location.lat(), place.geometry.location.lng())
        })
    },
    methods: {
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
        showUserLocationOnTheMap(latitude, longitude){
            //create a new map object
            let map = new google.maps.Map(document.getElementById("map"),{
                zoom:15,
                center: new google.maps.LatLng(latitude, longitude),
                mapTypeID: 'roadmap'
            });

            //Add marker
            new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map:map
            })
        }

     }
 }
 </script>
 
 <style>
 .ui.button,
 .dot.circle.icon {
     background-color: #ff5a5f;
     color:white;
 }
 .pac-icon {
    display: none;
 }

 .pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
 }

 .pac-item:hover {
    background-color: aqua;
 }

 .pac-item-query {
    font-size: 16px;
 }

 #map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: aqua;
 }
 </style>