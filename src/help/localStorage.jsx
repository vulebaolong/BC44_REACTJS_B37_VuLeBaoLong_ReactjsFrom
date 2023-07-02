export const getLocalStorage = (key, defaultValue = undefined) => {
    const getValueLocal = localStorage.getItem(key);
    return getValueLocal !== null ? JSON.parse(getValueLocal) : defaultValue;
};

export const setLocalStorage = (key, value) => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};