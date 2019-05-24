export default {
    data() {
        return {
            apiEndPoint: 'https://api.giphy.com/v1/gifs/search',
            apiKey: 'tbDd0iBtTJz13kX2GlbCiTA4H0q1u3in',
            query: 'hello',
            results: false,
            current_gif: false,
            showGifBlock: false
        }
    },
    methods: {
        searchGIFs() {
            this.$http.get(this.apiEndPoint, {
                params: {
                    api_key: this.apiKey,
                    q: this.query.split(' ').join('+'),
                    limit: 25
                }
            })
                .then(function (response) {
                    this.results = response.data.data;
                    this.current_gif = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        viewGIF(gif) {
            this.current_gif = gif.images.original.url;
            this.query='';
            this.showGifBlock= false;
            this.results = false;
        },
        resetGiphy(){
            this.current_gif = false;
            this.query='';
            this.showGifBlock= false;
            this.results = false;
        },
        queryHandler(event)
        {
            this.query = event.target.value;
        }
    },
    mounted(){
        this.searchGIFs()
    }
}