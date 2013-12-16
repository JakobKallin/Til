Array.prototype.after = function(value) {
	var index = this.indexOf(value);
	if ( index === -1 ) {
		return undefined;
	} else {
		return this[index + 1];
	}
};

Object.defineProperty(Array.prototype, 'last', {
	get: function() {
		return this[this.length - 1];
	}
});