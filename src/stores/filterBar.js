import { defineComponent } from 'vue';
import { useStore } from 'pinia';

export default defineComponent({
    setup() {
        const store = useStore();

        function selectFilter(filterName) {
            store.currentFilter.value = filterName;
        }

        return {
            currentFilter: store.currentFilter,
            selectFilter,
        };
    },
});