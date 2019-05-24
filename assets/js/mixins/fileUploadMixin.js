export default {
    methods: {
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // Filter system files or hide files
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent();
                }
                // Filter php html js file
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent();
                }
                // Automatic compression
                if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                    newFile.error = 'compressing';
                    const imageCompressor = new ImageCompressor(null, {
                        convertSize: Infinity,
                        maxWidth: 512,
                        maxHeight: 512,
                    });
                    imageCompressor.compress(newFile.file)
                        .then((file) => {
                            this.$refs.upload.update(newFile, {error: '', file, size: file.size, type: file.type});
                        })
                        .catch((err) => {
                            this.$refs.upload.update(newFile, {error: err.message || 'compress'});
                        })
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                newFile.blob = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file);
                }
                // Thumbnails
                newFile.thumb = '';
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob;
                }
            }
        },
        // add, update, remove File Event
        inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                // update
                if (newFile.active && !oldFile.active) {
                    // beforeSend
                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, {error: 'size'});
                    }
                }
            }
        }
    }
}