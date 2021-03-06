/**
 * invokes a callback function x times
 *
 * @param {function} callback
 * @param {number} total
 */
const repeat = (callback, total) => {
    let arr = [];
    for (let i = 0; i < total; i++) {
        const returnValue = callback(i, total);
        if (returnValue) {
            arr.push(returnValue);
        }
    }
    return arr;
};

export default repeat;
