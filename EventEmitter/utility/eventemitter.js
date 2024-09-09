class EventEmitter {
    /**
     * Initializes the EventEmitter with an empty events object.
     * @constructor
     */
    constructor(){
        this.events = {};
    }

    /**
     * Registers an event listener for the given event.
     * @param {string} event - The event to listen to.
     * @param {function} listener - The event listener to call when the event is emitted.
     * @example
     * const emitter = new EventEmitter();
     * emitter.on("myEvent", (data) => {
     *     console.log(data);
     * });
     * emitter.emit("myEvent", { foo: "bar" });
     */
    on(event,listener){
        if(!this.events[event]){
            this.events[event] = []
        }
        this.events[event].push(listener)
    }

    /**
     * Emits the given event with the provided arguments.
     * @param {string} event - The event to emit.
     * @param {...*} args - The arguments to pass to the event listeners.
     * @example
     * const emitter = new EventEmitter();
     * emitter.on("myEvent", (data) => {
     *     console.log(data);
     * });
     * emitter.emit("myEvent", { foo: "bar" });
     */
    emit(event, ...args){
        if(this.events[event]){
            this.events[event].forEach((listener)=>{
                listener(...args)
            })
        }

    }

    /**
     * Removes the given event listener for the given event.
     * @param {string} event - The event to remove the listener from.
     * @param {function} listener - The event listener to remove.
     * @example
     * const emitter = new EventEmitter();
     * const listener = (data) => {
     *     console.log(data);
     * };
     * emitter.on("myEvent", listener);
     * emitter.off("myEvent", listener);
     */
    off(event,listener){
        if(!this.events[event]) return;
        this.events[event] = this.events[event].filter((l)=>{
            return l !== listener
        })
    }

    /**
     * Registers an event listener for the given event that will only be called once.
     * @param {string} event - The event to listen to.
     * @param {function} listener - The event listener to call when the event is emitted.
     * @example
     * const emitter = new EventEmitter();
     * emitter.once("myEvent", (data) => {
     *     console.log(data);
     * });
     * emitter.emit("myEvent", { foo: "bar" });
     */

    once(event,listener){
        const fn = (...args)=>{
            listener(...args)
            this.off(event,fn)
        }
        this.on(event,fn)
    }
}

export default EventEmitter

