/**
 * accepts a data array and key and finds the nested object that has a matching key field
 *
 * @param {array} data
 * @param {string} key
 */
export default function findEpochArrayIndex(data, key) {
    const index = data.findIndex(({ key: k }) => key === k);
    if (index === -1) {
        throw new Error(`Could not locate the key ${key}`);
    }
    return index;
}
