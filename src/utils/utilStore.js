export function isError(action) {
    return action.type.endsWith('rejected');
}
