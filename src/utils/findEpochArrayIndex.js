export default function findEpochArrayIndex(data, key) {
    const index = data.findIndex(({ key: k }) => key === k);
    if (index === -1) {
        throw new Error(`Could not locate the key ${key}`);
    }
    return index;
}
