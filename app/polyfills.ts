interface HTMLCanvasElement {
	toBlob(callback: (blob: Blob) => void, type?, quality?): void;
}

if (!HTMLCanvasElement.prototype.toBlob) {
	Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
		value: function (callback, type?, quality?) {
			let [, encBinStr] = this.toDataURL(type, quality).split(',');

			let binStr = atob(encBinStr);
			let length = binStr.length;
			let array = new Uint8Array(length);

			for (let i = 0; i < length; i++) {
				array[i] = binStr.charCodeAt(i);
			}

			callback(new Blob([array], { type: type || 'image/png' }));
		}
	});
}
