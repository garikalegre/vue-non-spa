<template functional>
    <div class="gr-req-btn">
        <div class="req-btn no-btn" @click="props.applyHandler({type:false, id:props.userID, name:props.username})">
            <v-icon class="centered-btn">clear</v-icon>
        </div>
        <div class="req-btn yes-btn" @click="props.applyHandler({type:true, id:props.userID, name:props.username})">
            <v-icon class="centered-btn">done</v-icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .req-btn {
        width: 30px;
        height: 30px;
        border-radius: 60px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 5px 20px 0 rgba(172, 232, 91, 0.2);
    }

    .no-btn {
        background-color: $error;
        line-height: 20px;
    }

    .yes-btn {
        background-color: $ok;
        margin-left: 15px;
    }

    .centered-btn {
        line-height: 32px;
    }

</style>