export const debounce = (func, timeout = 200) => {
    let timeoutId = -1;
    return args => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(args), timeout);
    };
}

export const toggleButtonStatesKey = 'toggleButtonStatesKey';
export const toggleButtonStatesJsOnlyKey = 'toggleButtonStatesJsOnlyKey';
export const jsOnlyEditorStateKey = 'api-runner-state-js-only';
export const editorModeKey = 'api-runner-editor-mode';
export const localStorageSampleName = "geotabAPIRunner_sample";
export const selectedEditorIdKey = "'selectedEditorId'";
export const savedConfigsKey = 'api-runner-saved-configs';
export const unsavedEditorChangesKey = 'api-runner-unsaved-editor-changes';
export const localStorageUtils = {
    setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObject(key) {
        let value;
        try {
            value = localStorage.getItem(key);
            value = JSON.parse(value);
        } catch (e) {
            console.error('utils.getObject: Failed to parse JSON for key ', key, ': ', e);
        }
        return value === 'undefined' ? null : value;
    },
    getState(key) {
        return this.parseState(localStorage.getItem(key))
    },
    parseState(stateText) {
        let state;
        try {
            state = decodeURIComponent(atob(stateText));
            state = JSON.parse(state);
        } catch (e) {
            state = null;
        }
        return state === 'undefined' ? null : state;
    },
    encodeState(state) {
        return btoa(encodeURIComponent(JSON.stringify(state)))
    },
    getSavedConfigs() {
        return this.getObject(savedConfigsKey) || [];
    },
    setSavedConfigs(configs) {
        this.setObject(savedConfigsKey, configs);
    }
}

const sampleNameRegexp = /sample:[\w\d-]+/i;
const getSampleNameFromURL = () => {
        const hash = window.location.hash.substr(1);
        if (hash.match(sampleNameRegexp))
            return hash.replace("sample:", "");
        else if (hash === 'js-only')
            return hash;
        return null;
    };

export const getJsOnlyEditorMode = () => localStorage.getItem(editorModeKey);
export const isJsOnlyModeActive = () => localStorage.getItem(editorModeKey) === 'js-only';

export const timeSince = (date) => {
    date = new Date(date);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    function getTimeUnit(base) {
        return `${interval} ${base + (interval > 1 ? 's' : '')} ago`;
    }

    if (interval > 0) {
        return getTimeUnit('year');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
        return getTimeUnit('month');
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
        return getTimeUnit('day');
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
        return getTimeUnit('hour');
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
        return getTimeUnit('minute');
    }
    return 'seconds ago';
}

export function getSaveNameFromHash() {
    let name = window.location.hash.substring(1);
    name = decodeURI(name);
    if (!name.startsWith('save:')) {
        return null;
    }

    return name.replace('save:', '');
}
