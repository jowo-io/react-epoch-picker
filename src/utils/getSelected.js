export default function getSelected(data, selected) {
    let updatedSelected = { keychain: [], values: {}, key: null };

    if (!selected || !selected.keychain || !selected.keychain.length) {
        if (data.length === 1) {
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
