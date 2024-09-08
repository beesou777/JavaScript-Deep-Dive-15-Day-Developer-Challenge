# What is Debouncer ?

Debouncing is a technique that delays the execution of a function until the user stops performing a certain action for a specified amount of time

# What is Throttling ?

Throttling is a technique that limits the execution of a function to once in every specified time interval. 


# What is the Difference Between Debouncing and Throttling?


The main difference between debouncing and throttling is that debouncing executes the function only after some cooling period, while throttling executes the function at a regular interval. Debouncing and throttling are both useful techniques to improve the performance of your code, but they have different use cases and effects.

Debouncing is useful when you want to delay the execution of your code until the user stops performing a certain action. For example, you can use debouncing for autocomplete, where you want to wait for the user to stop typing before fetching suggestions from the backend. Debouncing can reduce the number of times your code is executed, but it can also introduce some latency in your user interface.

Throttling is useful when you want to limit the execution of your code to a certain frequency. For example, you can use throttling for resize, where you want to update the layout of your page at a fixed rate. Throttling can improve the responsiveness of your user interface, but it can also cause some loss of information or accuracy in your code.