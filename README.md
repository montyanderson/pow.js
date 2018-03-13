# pow.js
Proof-of-Work implemented in Javascript

## Usage

``` javascript
const pow = require("pow.js");

const input = Buffer.from("Hello, World!");
const target = Buffer.from("00000000000000000000000000000000000000000000000000000000000f0000", "hex");

const nonce = pow.work(input, target);

// later
pow.verify(input, target, nonce); // true
```
