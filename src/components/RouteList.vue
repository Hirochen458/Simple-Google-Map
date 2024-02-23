<template>
    <section class="route-list-view">
        <div class="route-list-view-header">
            <h3 class="ui header">Route List</h3>
            <select @change="sortRoute($event)">
                <option selected disabled>Sort</option>
                <optgroup label="Distance">
                    <option value="distance-asc">short</option>
                    <option value="distance-desc">long</option>
                </optgroup>
                <optgroup label="Duration">
                    <option value="duration-asc">fast</option>
                    <option value="duration-desc">slow</option>
                </optgroup>
            </select>
            <button class="show-all" @click="showAllRoutesButtonPressed()">Show All</button>
        </div>
        <div class="item" v-for="route in routes" :key="route.id" @click="routeItemPressed(route)" :style="{'background-color':route.color}">
            <div><i class="marker alternate icon"></i>{{ route.origin.address }}</div>
            <div><i class="flag checkered icon"></i>{{ route.destination.address }}</div>
            <div class="ui label small">{{ route.distance.text }}</div>
            <div class="ui label small">{{ route.duration.text }}</div>
            <button class="delete" @click="deleteRoute(route)" >Delete</button>
        </div>
    </section>
</template>

<script>
import firebase from 'firebase';
import { EventBus } from "@/EventBus";

export default{
    data(){
        return {
            routes:[]
        }
    },
    created(){
        const db = firebase.firestore();
        db.collection("routes").onSnapshot(snap => {
            //console.log(snap);
            this.routes = [];
            snap.forEach(doc => {
                // console.log(doc.data());
                // console.log(doc.id);
                let route = doc.data();
                route.id = doc.id;
                this.routes.push(route);
            })
        });
    },
    methods: {
        sortRoute(e){
            const sortName = e.target.value.split("-")[0];
            const sortOrder = e.target.value.split("-")[1];
            
            const db = firebase.firestore();
            db.collection("routes").orderBy(sortName + ".value", sortOrder)
                .get()
                .then(snap => {
                    this.routes = [];
                    snap.forEach(doc => {
                        let route = doc.data();
                        route.id = doc.id;
                        this.routes.push(route);
                    })
                });
        },
        routeItemPressed(route){
            // console.log(route);
            EventBus.$emit("routes-data", [route]);
        },
        showAllRoutesButtonPressed(){
            EventBus.$emit("routes-data", this.routes);
        },
        deleteRoute(route){
            const routeID = route.id;
            const db = firebase.firestore();
            db.collection('routes').doc(routeID).delete().then(() => {
                console.log('Route deleted');
                const find = true;
                while(!find){
                    const tempRoute = this.routes.pop();
                    if(tempRoute === route){
                        find === true;
                    }else{
                        this.routes.push(tempRoute);
                    }
                    
                }
                console.log(this.routes);
                //EventBus.$emit('routes-data', this.routes)
                EventBus.$emit('routes-data', this.routes);
            });

        }
    }
    
};

</script>

<style>

.route-list-view{
    position: relative;
    z-index: 1;
    max-width: 610;
    margin: 10px;
    background-color: aliceblue;
}

.route-list-view{
    padding: 10px;
}

.item{
    padding: 10px;
    cursor: pointer;
}

.item:hover{
    background-color: aqua;
}

.show-all{
    padding: 2px 10px;
    
}

</style> 