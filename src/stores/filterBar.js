import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const selectFilter = (filterName) => {
        store.currentFilter.value = filterName;
    }
    return {
        currentFilter: store.currentFilter,
        selectFilter,
    };
})