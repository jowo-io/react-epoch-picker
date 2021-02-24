/**
 * accepts a dirty selected object and returns a cleaned and error free one!
 *
 * @param {array | object} data
 * @param {object | undefined} selected
 */
export default function getSelected(data, selected) {
    let updatedSelected = { keychain: [], values: {}, key: null };

    if (!selected || !selected.keychain || !selected.keychain.length) {
        if (data.length === 1) {
            // if data is an array of only 1 value, then automatically select that single value
            const key = data[0].key;
            updatedSelected = {
                keychain: [0],
                values: { [0]: key },
                key,
            };
        }
    } else {
        updatedSelected = {
            keychain: [...(selected.keychain || [])],
            values: { ...(selected.values || {}) },
            key: selected.key || null,
        };
    }
    return updatedSelected;
}
