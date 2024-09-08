/**
 * @function debouncer
 * @description Creates a debounced function that delays calling the original function until after the specified delay.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} A debounced function.
 * @example
 * const debouncedFunc = debouncer(myFunction, 1000);
 * debouncedFunc(); // Will not call myFunction until after 1000ms have passed.
 */

export default debouncer(func,delay){
    let timeout;
    return function(...args){
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            func(...args)
        },delay)
    }
}
