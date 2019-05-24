export default {
    data(){
        return {
            countries: ['fr', 'be'],
            address: {},
            places: null,
            location: '',
            gApiKey: 'AIzaSyAs3s9xDOJBcBU3csg4JBBG1e17wdPnWo0'
        }
    },
    methods: {
        getAddressData(addressData, placeResultData) {
            this.address = addressData;
            this.places = placeResultData;
        }
    }
}