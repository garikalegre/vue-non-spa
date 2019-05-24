export default {
    data() {
        return {
            valid: true,
            eventNameRules: [
                (v) => !!v || 'Le nom est requis',
            ],
            locationRules: [
                (v) => !!v || !!this.location || 'La localisation est requise',
            ],
            sportRules: [
                (v) => !!v || 'Le sport est requis',
            ],
            peopleRules: [
                (v) => !!v || 'Le nombre de sportif recherché est requis',
            ],
            startDateRules: [
                (v) => !!v || 'La date est requise',
            ],
            endDateRules: [
                (v) => !!v || 'La date est requise',
            ],
            startTimeRules: [
                (v) => !!v || 'L\'horaire est requis',
            ]
        }
    }
}