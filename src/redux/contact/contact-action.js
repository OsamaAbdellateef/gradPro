export const handle_change = (name, value) => ({
    type: 'HANDLE_CHANGE',
    payload: value,
    name: name
})