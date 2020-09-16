const express = require('express');
const ExpressError = require('./errorClasses');

const { mean, median, mode } = require('mathjs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
	return res.send('Try /mean, /median, /mode. Put your numbers in a query string, like so | /mean?nums=1,2,3,4');
});

app.get('/mean', (req, res, next) => {
	if (!req.query['nums']) throw new ExpressError('Please Enter Some Numbers in the Query String', 400);
	let nums = req.query['nums'].split(',');
	let total;
	try {
		for (n of nums) {
			let i = parseInt(n);
			if (typeof i !== 'number') throw new ExpressError('Query Must Contain Numbers Only', 400);
		}
	} catch (err) {
		return next(err);
	}

	total = mean(nums);

	return res.json({
		operation: 'mean',
		value: total
	});
});
app.get('/median', (req, res, next) => {
	if (!req.query['nums']) throw new ExpressError('Please Enter Some Numbers in the Query String', 400);
	let nums = req.query['nums'].split(',');
	let total;
	try {
		for (n of nums) {
			let i = parseInt(n);
			if (typeof i !== 'number') throw new ExpressError('Query Must Contain Numbers Only', 400);
		}
	} catch (err) {
		return next(err);
	}

	total = median(nums);
	return res.json({
		operation: 'median',
		value: total
	});
});
app.get('/mode', (req, res, next) => {
	if (!req.query['nums']) throw new ExpressError('Please Enter Some Numbers in the Query String', 400);
	let nums = req.query['nums'].split(',');
	let arr = [];
	let total;

	try {
		for (n of nums) {
			let i = parseInt(n);
			if (typeof i !== 'number') throw new ExpressError('Query Must Contain Numbers Only', 400);
			arr.push(i);
		}
	} catch (err) {
		return next(err);
	}

	total = mode(arr);
	if (total.length > 1) {
		return res.json({
			operation: 'mode',
			value: total
		});
	} else {
		stotal = total[0];
		debugger;
		return res.json({
			operation: 'mode',
			value: stotal
		});
	}
	total = mode(arr);
});

app.use((err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message;

	// res.status(err.status).send(err.message);
	return res.status(status).json({
		error: { message, status }
	});
});

const server = app.listen(3000, () => {
	console.log('App on port 3000');
});

module.exports = { mean, median, mode, server };
