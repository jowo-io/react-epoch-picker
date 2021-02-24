/**
 * accepts the data and the keychain, then finds the nested epoch data that corresponds to the keychain
 *
 * @param {array | object} data
 * @param {array} keychain
 */
export default function nestedLookup(data, keychain) {
    let isFinal = false;
    let activeEpoch = data;
    keychain.forEach((key) => {
        if (typeof key === "number") {
            activeEpoch = activeEpoch[key];
        } else if (activeEpoch.epochs) {
            activeEpoch = activeEpoch.epochs;
            if (!activeEpoch.epochs) {
                isFinal = true;
            }
        }
    });
    const isArray = activeEpoch instanceof Array;
    return { activeEpoch, isFinal, isArray };
}
