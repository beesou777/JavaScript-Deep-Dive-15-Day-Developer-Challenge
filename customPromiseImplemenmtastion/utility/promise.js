export default class MyPromise {
    /**
     * Constructs a new MyPromise instance.
     * @param {function} executor - A function that takes two functions as arguments:
     *  `resolve` and `reject`. `resolve` is called when the promise is
     *  resolved, and `reject` is called when the promise is rejected.
     */
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(value));
            }
        };

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param {function} [onFulfilled] - The callback to execute when the Promise is resolved.
     * @param {function} [onRejected] - The callback to execute when the Promise is rejected.
     * @returns {MyPromise} a new Promise continuing the [*thenable chain*][1] of promise's.
     * [1]: https://promisesaplus.com/#the-then-method
     */

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    if (typeof onFulfilled === 'function') {
                        const result = onFulfilled(this.value);
                        resolve(result);
                    } else {
                        resolve(this.value);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            /**
             * Handles the rejected state of the promise by executing the `onRejected`
             * callback if it's a function, or by rejecting the promise with the
             * original reason if not.
             */
            const handleRejected = () => {
                try {
                    if (typeof onRejected === 'function') {
                        const result = onRejected(this.reason);
                        resolve(result);
                    } else {
                        reject(this.reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            if (this.state === 'fulfilled') {
                handleFulfilled();
            } else if (this.state === 'rejected') {
                handleRejected();
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }


    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(
            value => {
                return MyPromise.resolve(onFinally()).then(() => value);
            },
            reason => {
                return MyPromise.resolve(onFinally()).then(() => { throw reason });
            }
        );
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    /**
     * Creates a new MyPromise that resolves when all of the promises in the given
     * array have resolved, or rejects when any of the promises in the array
     * reject.
     *
     * @param {Array.<MyPromise>} promises - An array of promises to wait on.
     * @returns {MyPromise} A new promise that resolves when all of the promises in
     * the given array have resolved, or rejects when any of the promises in the
     * array reject.
     * @example
     * const promises = [
     *     MyPromise.resolve(1),
     *     MyPromise.resolve(2),
     *     MyPromise.resolve(3)
     * ];
     *
     * MyPromise.all(promises).then(values => {
     *     console.log(values); // [1, 2, 3]
     * });
     */
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let resolvedCount = 0;
            const results = [];
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i])
                    .then(value => {
                        resolvedCount++;
                        results[i] = value;
                        if (resolvedCount === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            }
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let promise of promises) {
                MyPromise.resolve(promise).then(resolve, reject);
            }
        });
    }
}
