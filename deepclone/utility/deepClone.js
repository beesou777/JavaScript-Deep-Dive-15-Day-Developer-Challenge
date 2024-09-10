/**
 * Deep clones an object, handling nested objects, arrays, and other data types.
 * @param {object} obj - The object to clone.
 * @returns {object} The cloned object.
 * @throws {Error} If the object is of an unsupported type.
 */
export default function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof Set) {
        return new Set([...obj].map(item => deepClone(item)));
    }

    if (obj instanceof Map) {
        const map = new Map();
        for (const [key, value] of obj.entries()) {
            map.set(deepClone(key), deepClone(value));
        }
        return map;
    }

    if (typeof obj === "object") {
        const clone = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
        return clone;
    }

    throw new Error("Unsupported data type");
}