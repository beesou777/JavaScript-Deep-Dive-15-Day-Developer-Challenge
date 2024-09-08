/**
 * Creates a throttled function that delays calling the original function until after the specified delay.
 * @param {function} func - The function to throttle.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} A throttled function.
 * @example
 * const throttledFunc = throttle(myFunction, 1000);
 * throttledFunc(); // Will not call myFunction until after 1000ms have passed.
 */
export default function throttle(func,delay){
    let timeout
    return function(...args){
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(()=>{
            func(...args)
        },delay)
    }
}