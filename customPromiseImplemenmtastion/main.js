import MyPromise from "./utility/promise";

const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('Success!'), 1000);
});

myPromise
    .then(value => {
        console.log(value); // 'Success!'
        return 'Next';
    })
    .then(value => {
        console.log(value); // 'Next'
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('Finished');
    });
