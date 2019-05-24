<template functional>
    <div>
        <suggested-friends
            :suggestedFriends="props.suggestedFriends"
            :addHandler="props.addHandler"
            :countAllSuggestedFriends="props.countAllSuggestedFriends"
            :redirectToItem="props.redirectToItem"
        ></suggested-friends>
        <suggested-events
            :suggestedEvents="props.suggestedEvents"
            :renderDate="props.renderDate"
            :goToEvent="props.goToEvent"
            :countAllSuggestedEvents="props.countAllSuggestedEvents"
            :redirectToItem="props.redirectToItem"
        ></suggested-events>
    </div>
</template>
