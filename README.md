# string-timer
Dead simple benchmark/elapsed timer, run purely from string outputs.

### installation
```bash
npm install string-timer
```

### usage
```js
const StringTimer = import('string-timer');

let time = new StringTimer; // instantiation begins the timer

// do some stuff
console.log(`time elapsed: {time}`); // time elapsed: 1.5sec

// do some more stuff
console.log(`time elapsed: {time}`); // time elapsed: 256ms

// set a marker
console.log(`time elapsed: {time.set('foo')}`); // time elapsed: 2ms

// do some stuff
console.log(`time elapsed: {time}`); // time elapsed: 10ms
console.log(`time elapsed: {time}`); // time elapsed: 5ms
console.log(`time elapsed: {time}`); // time elapsed: 25ms

// calculate from marker
console.log(`time elapsed: {time.from('foo')}`); // time elapsed: 40ms
```

### notes
- instantiation initializes a timer
- accessing the timer object itself from a string triggers the calculation and string formatting
