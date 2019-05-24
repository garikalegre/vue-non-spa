<template functional>
    <div class="chat-log">
        <chat-message
                v-for="message in props.messages"
                :message="message"
                :currentUserId="props.currentUserId"
                :sortedParticipants="props.sortedParticipants"
                :key="message.id">
        </chat-message>
    </div>
</template>

<style lang="scss">
    .chat-log {
        overflow-y: auto;
        height: 500px;
        max-height: 100%;
    }
</style>