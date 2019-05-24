<template>
    <v-layout row wrap>
        <v-flex d-flex justify-center xs1>
            <v-avatar>
                <img :src="avatarUrl(user)"/>
            </v-avatar>
        </v-flex>
        <v-flex xs11>
            <v-text-field
                    placeholder="Votre commentaire"
                    v-model="text"
                    textarea
            />
            <div class="buttons-box">
                <div class="buttons-group">
                    <div class="button-item">
                        <file-upload
                                v-model="file"
                                class="btn btn--floating btn--small blue select-image upload-images-btn"
                                extensions="gif,jpg,jpeg,png,webp"
                                accept="image/png,image/gif,image/jpeg,image/webp"
                                @input-filter="inputFilter"
                                @input-file="inputFile"
                        >
                            <v-icon color="white">camera_alt</v-icon>
                        </file-upload>
                        <span class="common-button-text fs-12 text-xs-center hidden-xs-only">Photo</span>
                    </div>
                    <div class="button-item">
                        <v-btn
                                fab
                                color="blue"
                                small
                                style="width: 31px; height: 31px;"
                                @click="showGifBlock = !showGifBlock"
                        >
                            <v-icon style="font-size: 31px;" color="white">gif</v-icon>
                        </v-btn>
                        <span class="text-xs-center fs-12 hidden-xs-only">Gif</span>
                    </div>
                    <div class="button-item" style="margin-left: -8px">
                        <v-btn @click.native.stop="smile = !smile" fab small class="smiles-addon-btn" color="blue">
                            <v-icon color="white">mood</v-icon>
                        </v-btn>
                        <span class="text-xs-center fs-12 hidden-xs-only">Smiley</span>
                    </div>
                </div>
                <v-btn color="blue" class="send-post-button text-capitalize" :disabled="!(text || current_gif)"
                       @click="clickHandler()" round outline>
                    Envoyer
                </v-btn>
            </div>
            <v-dialog v-if="$mq.phone" v-model="smile" fullscreen transition="dialog-bottom-transition" :overlay=false>
                <v-card-actions>
                    <v-btn color="red darken-1" flat="flat" @click.native="smile = false">fermer</v-btn>
                </v-card-actions>
                <v-card>
                    <keep-alive>
                        <picker v-if="smile" @select="addEmoji" style="width: 100%; height: 100%" :i18n="smileI18n"/>
                    </keep-alive>
                </v-card>
            </v-dialog>
            <v-dialog v-else v-model="smile" width="353">
                <v-card>
                    <keep-alive>
                        <picker v-if="smile" @select="addEmoji" :i18n="smileI18n"/>
                    </keep-alive>
                </v-card>
            </v-dialog>
            <v-dialog v-if="$mq.phone" v-model="showGifBlock" fullscreen transition="dialog-bottom-transition"
                      :overlay=false>
                <v-card>
                    <giphy
                            v-if="showGifBlock"
                            :resetGiphy="resetGiphy"
                            :searchGIFs="searchGIFs"
                            :viewGIF="viewGIF"
                            :query="query"
                            :results="results"
                            :current_gif="current_gif"
                            :queryHandler="queryHandler"
                            style="width: 100%; height: 100%"
                    />
                </v-card>
                <v-card-actions>
                    <v-btn color="red darken-1" flat="flat" @click.native="showGifBlock = false">fermer</v-btn>
                </v-card-actions>
            </v-dialog>
            <v-dialog v-else v-model="showGifBlock" width="353">
                <v-card style="min-height: 350px">
                    <giphy
                            v-if="showGifBlock"
                            :resetGiphy="resetGiphy"
                            :searchGIFs="searchGIFs"
                            :viewGIF="viewGIF"
                            :query="query"
                            :results="results"
                            :current_gif="current_gif"
                            :queryHandler="queryHandler"
                    />
                </v-card>
            </v-dialog>
            <div class="my-2" id="app-viewer" v-show="current_gif">
                <img :src="current_gif" class="center-block">
            </div>
            <img v-if="file.length && file[0].thumb" :src="file[0].thumb" width="auto" height="50" class="max-width-img"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import giphyMixin from '../../../mixins/giphyMixin';
    import avatarMixin from '../../../mixins/avatarMixin';
    import fileUpload from '../../../mixins/fileUploadMixin';

    export default {
        props: ['user', 'sendHandler', 'feedId'],
        mixins: [giphyMixin, avatarMixin, fileUpload],
        data() {
            return {
                text: '',
                file: [],
                smile: false,
                smileI18n: {search: 'Recherche', categories: {search: 'Résultats de recherche', recent: 'Récents'}}
            }
        },
        methods: {
            addEmoji(emoji) {
                this.text += emoji.native;
                this.smile = false;
            },
            clickHandler() {
                this.sendHandler({text: this.text, id: this.feedId, giphy: this.current_gif, file: this.file.length ? this.file[0] : null});
                this.text = null;
                this.current_gif = false;
                this.file = [];
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    /deep/ .input-group--text-field.input-group--textarea:not(.input-group--full-width) .input-group__input {
        padding: 0 20px !important;
    }

    /deep/ .avatar {
        margin-top: 10px;
    }

    .buttons-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .send-post-button {
            text-transform: capitalize;
            min-width: 185px;
        }
        button {
            font-size: 14px;
        }
    }

    .giphy-block {
        position: absolute;
        z-index: 99;
        background-color: $light-gray;
        width: 350px;
        padding: 10px;
        max-height: 500px;
        overflow-y: auto;
        .close-box {
            color: $error;
            display: flex;
            flex-direction: column-reverse;
            float: right;
        }
    }
    .button-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /deep/ label {
            margin-left: -15px;
        }
        .upload-images-btn {
            cursor: pointer;
        }
        .select-image {
            margin-top: -15px;
        }
        .smiles-addon-btn, .select-image {
            width: 31px;
            height: 31px;
        }
    }

    .buttons-group {
        display: flex;
    }
    @media screen and (max-width: 600px) {
        .buttons-box {
            flex-direction: column;
        }
    }
</style>