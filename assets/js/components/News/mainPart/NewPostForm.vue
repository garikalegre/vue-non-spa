<template>
    <v-card color="white" class="news-common-card newsfeed-post-form-card">
        <v-card-title primary-title>
            <div>
                <h3 class="news-card-title">Quoi de neuf {{user.username}} ?</h3>
            </div>
        </v-card-title>
        <hr>
        <v-layout row wrap>
            <v-flex d-flex justify-center xs1>
                <v-avatar>
                    <img :src="avatarUrl(user)"/>
                </v-avatar>
            </v-flex>
            <v-flex xs11>
                <v-text-field
                        :placeholder="`Exprimez-vous ${user.username} !`"
                        v-model="text"
                        textarea
                        rows="2"
                        class="news-textarea"
                        ref="newsTextarea"
                />
                <div class="buttons-box">
                    <div class="image-button">
                        <div class="button-item">
                            <file-upload
                                    v-model="files"
                                    class="btn btn--floating btn--small blue select-image upload-images-btn"
                                    extensions="gif,jpg,jpeg,png,webp"
                                    accept="image/png,image/gif,image/jpeg,image/webp"
                                    :multiple="true"
                                    @input-filter="inputFilter"
                                    @input-file="inputFile"
                                    ref="upload"
                            >
                                <v-icon color="white">camera_alt</v-icon>
                            </file-upload>
                            <span @click="triggerClick()" class="common-button-text text-xs-center hidden-xs-only">Photo</span>
                        </div>
                        <div class="button-item" style="margin-top: -20px;">
                            <v-btn
                                    fab
                                    color="blue"
                                    small
                                    class="giphy-post-btn"
                                    style="width: 31px; height: 31px;"
                                    @click="showGifBlock = !showGifBlock"
                            >
                                <v-icon style="font-size: 31px;" color="white">gif</v-icon>
                            </v-btn>
                            <span class="text-xs-center fs-12 hidden-xs-only">Gif</span>
                        </div>
                        <div class="button-item" style="margin-top: -20px; margin-left: -7px;">
                            <v-btn @click.native.stop="smile = !smile" fab small class="smiles-addon-btn" color="blue">
                                <v-icon color="white">mood</v-icon>
                            </v-btn>
                            <span class="text-xs-center fs-12 hidden-xs-only">Smiley</span>
                        </div>
                    </div>
                    <v-btn color="blue" class="send-post-button text-capitalize"
                           :disabled="!(files.length || text || current_gif)"
                           @click="clickHandler()" round outline
                    >
                        Envoyer
                    </v-btn>
                </div>
                <v-dialog v-if="$mq.phone" v-model="smile" fullscreen transition="dialog-bottom-transition" :overlay=false>
                    <v-card-actions>
                        <v-btn color="red darken-1" flat="flat" @click.native="smile = false">fermer</v-btn>
                    </v-card-actions>
                    <v-card>
                        <keep-alive>
                            <picker v-if="smile" @select="addEmoji" style="width: 100%; height: 100%" :i18n="smileI18n" />
                        </keep-alive>
                    </v-card>
                </v-dialog>
                <v-dialog v-else v-model="smile" width="353">
                    <v-card>
                        <keep-alive>
                            <picker v-if="smile" @select="addEmoji" :i18n="smileI18n" />
                        </keep-alive>
                    </v-card>
                </v-dialog>
                <v-dialog v-if="$mq.phone" v-model="showGifBlock" fullscreen transition="dialog-bottom-transition" :overlay=false>
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
                    <img :src="current_gif" class="center-block max-width-img">
                </div>
                <ul class="uploaded-images-list">
                    <li class="ml-1 mr-1" v-for="file in files" :key="file.id">
                        <img v-if="file.thumb" :src="file.thumb" width="auto" height="50" class="max-width-img"/>
                    </li>
                </ul>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import {EventBus} from '../../../main';
    import giphyMixin from '../../../mixins/giphyMixin';
    import avatarMixin from '../../../mixins/avatarMixin';
    import fileUpload from '../../../mixins/fileUploadMixin';

    export default {
        props: ['user', 'sendHandler'],
        mixins: [giphyMixin,avatarMixin, fileUpload],
        data() {
            return {
                text: '',
                files: [],
                smile: false,
                smileI18n: {search: 'Recherche', categories: {search: 'Résultats de recherche', recent: 'Récents'}}
            }
        },
        mounted() {
            EventBus.$emit('hideMenu');
        },
        methods: {
            addEmoji(emoji){
                this.text += emoji.native;
                this.smile = false;
                this.$refs.newsTextarea.focus();
            },
            clickHandler() {
                this.sendHandler({files: this.files, text: this.text, giphy: this.current_gif});
                this.text = '';
                this.files = [];
                this.current_gif = false;
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

    .button-item {
        display: flex;
        flex-direction: column;
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

    .piker-smile {
        position: absolute;
        z-index: 999;
    }

    .smiles-addon-btn {
        width: 31px;
        height: 31px;
    }

    .button-item {
        display: flex;
        flex-direction: column;
    }

    .common-button-text {
        font-size: 12px;
        cursor: pointer;
        margin-left: 22px;
        margin-top: 20px;
    }

    .buttons-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .send-post-button {
            text-transform: capitalize;
            min-width: 185px;
        }
        button {
            font-size: 14px;
        }
    }

    .image-button {
        cursor: pointer;
        display: flex;
        .upload-images-btn {
            cursor: pointer;
        }
        .select-image {
            width: 31px;
            height: 31px;
            margin-top: -35px;
        }
    }

    .uploaded-images-list {
        display: flex;
        flex-flow: wrap;
        width: 100%;
        li {
            list-style-type: none;
        }
    }

    /deep/ textarea::-webkit-input-placeholder {
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        color: $newstitlenames;
    }

    /deep/ textarea:-moz-placeholder { /* Firefox 18- */
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        color: $newstitlenames;
    }

    /deep/ textarea::-moz-placeholder { /* Firefox 19+ */
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        color: $newstitlenames;
    }

    /deep/ textarea:-ms-input-placeholder {
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        color: $newstitlenames;
    }

    /deep/ textarea::placeholder {
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        color: $newstitlenames;
    }

    @media screen and (max-width: 600px) {
        .buttons-box {
            flex-direction: column;
        }
        .giphy-post-btn{
            margin-left: 15px;
        }
        /deep/ div.avatar {
            height: 40px !important;
            width: 40px !important;
            margin-left: 10px;
        }
        .newsfeed-post-form-card{
            margin-top: -25px;
            margin-bottom: 10px;
        }
    }
</style>
