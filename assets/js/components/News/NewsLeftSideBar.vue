<template functional>
    <div class="news-left-sb">
        <my-profile :user="props.user" :renderDate="props.renderDate" :avatarUrl="props.avatarUrl" :parseSport="props.parseSport"/>
        <my-friends :user="props.user" :avatarUrl="props.avatarUrl"/>
        <invite-banner/>
        <event-banner/>
    </div>
</template>