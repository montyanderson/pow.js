const crypto = require("crypto");

module.exports = {
	_hash(data) {
		const hash = crypto.createHash("sha256");
		hash.update(data);
		return hash.digest();
	},

	_lessThan(output, target) {
		for(let i = target.length - 1; i >= 0; i--) {
			if(output[i] > target[i])
				return false;

			if(output[i] < target[i])
				return true;
		}

		return true;
	},

	_iteration(input, target) {
		// increment nonce
		for(let i = input.length - target.length; i < input.length; i++) {
			if(input[i]++ !== 255)
				break;
		}

		// hash input
		const output = this._hash(input);

		// check if hash less than target
		return this._lessThan(output, target);
	},

	work(data, target) {
		if(target.length !== 32)
			throw new Error("Target must be a uint256!");

		const input = Buffer.alloc(data.length + 32);
		data.copy(input);

		while(true) {
			if(this._iteration(input, target) === true)
				return input.slice(data.length);
		}
	},

	verify(data, target, nonce) {
		if(target.length !== 32)
			throw new Error("Target must be a uint256!");

		if(nonce.length !== 32)
			throw new Error("Nonce must be a uint256!");

		const output = this._hash(Buffer.concat([ data, nonce ]));

		return this._lessThan(output, target);
	}
};
