const express = require('express');
const ExpressError = require('./errorClasses');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const USERS = [ { username: 'StacysMom', city: 'Reno' }, { username: 'Rosalia', city: 'R' } ];

attmeptToSaveToDB = function() {
	throw 'Connection Error';
};

app.get('/', (req, res, next) => {
	return res.send('Home Page');
});

app.get('/users/:username', function(req, res, next) {
	// To get error handling to work, we need to first create a new instance of the error class
	// We then pass the error as a parameter to the "next()" in the catch
	try {
		const user = USERS.find((u) => u.username === req.params.username);
		if (!user) throw new ExpressError('Invalid Username', 404);
		return res.send({ user });
	} catch (err) {
		return next(err);
	}
});

app.get('/secret', (req, res, next) => {
	try {
		if (req.query.password !== 'popcorn') {
			throw new ExpressError('Invalid Password', 403);
		}
		return res.send('Congrats! You know the password!');
	} catch (err) {
		return next(err);
	}
});

app.get('/savetodb', (req, res) => {
	try {
		attmeptToSaveToDB();
		return res.send('SAVED TO DB');
	} catch (err) {
		// Since the attempttosavetodb function just returns an error, we can actually create our own custome error.
		// To do that, we just create a new ExpressError instance inside the next() as a parameter
		return next(new ExpressError('Database Error'));
		// no status code was put in so it can use the default of 500
	}
});

// This code will only run if no routes are matched
// It's an easy way to create a custom 404
app.use((req, res, next) => {
	const err = new ExpressError('Page Not Found', 404);
	next(err);
});

// app.use for errors goes at the bottom just in case an error happens
// this works because you're supposed to add in next() to the end of a function that could return an error
// Since nothing matches the next it moves all the way down to the bottom of the file
// app.use matches literally everything, so it WILL run
app.use((err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message;

	// res.status(err.status).send(err.message);
	return res.status(status).json({
		error: { message, status }
	});
});

app.listen(3000, () => {
	console.log('App on port 3000');
});
