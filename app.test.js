const app = require('./app');
const { mean, median, mode, server } = require('./app');

describe('Finding the Mean Functions', function() {
	afterAll(async function() {
		server.close();
	});

	test('return mean of positive numbers', function() {
		let nums = [ 1, 2, 3, 4 ];
		expect(mean(nums)).toEqual(2.5);
	});

	test('return mean of array containing a negative number', function() {
		let nums = [ -4, 5, 6, 7 ];
		expect(mean(nums)).toEqual(3.5);
	});

	test('return mean of array containing only negative numbers', function() {
		let nums = [ -1, -2, -3, -4 ];
		expect(mean(nums)).toEqual(-2.5);
	});
});

describe('Finding the Median Functions', function() {
	afterAll(async function() {
		server.close();
	});

	test('return median of positive numbers', function() {
		let nums = [ 1, 2, 3, 4 ];
		expect(median(nums)).toEqual(2.5);
	});

	test('return median of array containing a negative number', function() {
		let nums = [ -4, 5, 6, 7 ];
		expect(median(nums)).toEqual(5.5);
	});

	test('return median of array containing only negative numbers', function() {
		let nums = [ -1, -2, -3, -4 ];
		expect(median(nums)).toEqual(-2.5);
	});
});

describe('Finding the Mode Functions', function() {
	afterAll(async function() {
		server.close();
	});

	test('return mode of positive numbers', function() {
		let nums = [ 1, 2, 3, 4 ];
		expect(mode(nums)).toEqual([ 1, 2, 3, 4 ]);
	});

	test('return mode of array containing a negative number', function() {
		let nums = [ -4, 5, 6, 7 ];
		expect(mode(nums)).toEqual([ -4, 5, 6, 7 ]);
	});

	test('return mode of array containing many duplicate numbers', function() {
		let nums = [ 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 4 ];
		expect(mode(nums)).toEqual([ 3 ]);
	});

	test('return mode of array containing only negative numbers', function() {
		let nums = [ -1, -1, -1, -1, -1, -1, -1, -1, -5, -5, -5, -5, -9, -9, -9 ];
		expect(mode(nums)).toEqual([ -1 ]);
	});
});
