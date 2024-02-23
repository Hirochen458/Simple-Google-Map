
<template>
    <section>
        <div class="header">
            <h1>Welcome to my mini Google map</h1>
        </div>
        <div class="textBody"><h1>This is a simple map app using Vue js and Google API that can provide some popular google map functions</h1></div>

        <div class="LocationText"><h1>This is the page to check current locations</h1></div>
        <Button class="LocationButton" @click="toLocation">Location</Button>
        <div class="CloseBuyText"><h1>This is the page for search near by area</h1></div>
        <Button class="CloseBuyButton" @click="toCloseBuy">CloseBuy</Button>
        <div class="navigationText"><h1>This is the page to show  directions between two places</h1></div>
        <Button class="navigationButton" @click="toDistanceClas">navigation</Button>
    </section>
    
</template>

<script>
import router from '../router';

export default{
    // mounted(){
    //     const map = new google.maps.Map(this.$refs["map"], {
    //         center:new google.maps.LatLng(40.691930, -73.984480),
    //         zoom: 15,
    //         mapTypeId:"roadmap"
    //     });
    // },
    methods:{
        toLocation(){
            router.push('/user-location');
            location.reload()
        },
        toCloseBuy(){
            router.push('/close-buy');
            location.reload()
        },
        toDistanceClas(){
            router.push('/distance-calcuator')
            location.reload();
        }
    }

}
</script>

<style>
.header {
    border: 5px solid;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
}

.textBody{
    /* border: 5px solid; */
    position: absolute;
    top: 25%;
    left:20%;
    right:20%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.LocationText{
    position: absolute;
    top: 35%;
    left:20%;
    right:20%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.LocationButton{
    position: absolute;
    top: 39%;
    left:30%;
    right:30%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.CloseBuyText{
    position: absolute;
    top: 45%;
    left:20%;
    right:20%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.CloseBuyButton{
    position: absolute;
    top: 48%;
    left:30%;
    right:30%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.navigationText{
    position: absolute;
    top: 55%;
    left:20%;
    right:20%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
.navigationButton{
    position: absolute;
    top: 59%;
    left:30%;
    right:30%;
    /* left: 25%; */
    /* transform: translate(-50%, -50%); */
    padding: 20px;
}
</style>