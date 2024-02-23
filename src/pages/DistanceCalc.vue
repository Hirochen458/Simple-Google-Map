<template>
    <main>
        <OriginDestionationForm />
        <RouteList />
        <DirectionsMapView />
    </main>
</template>

<script>
import OriginDestionationForm from '@/components/OriginDestionationForm';
import RouteList from '@/components/RouteList';
import DirectionsMapView from '@/components/DirectionsMapView';

export default{
    components:{ OriginDestionationForm, RouteList, DirectionsMapView }
};
</script> 