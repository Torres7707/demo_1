// In this dummy data:
//  - all times/dates are represented as UNIX timestamps
//    (number of seconds since 00:00:00 January 1 1970 UTC)
//  - all weights are represented as number of grams.
exports.accounts = [{
	id: 0,
	username: "Alice",
	password: "abc123",
	birthdate: 177631200,
	city: "Jönköping",
	trainings: [
		{accountId: 0, start: 1512468000, stop: 1512468000+30*60, description: "Running 5km"},
		{accountId: 0, start: 1512900000, stop: 1512900000+60*60, description: "Running 10km"},
		{accountId: 0, start: 1513332000, stop: 1513332000+90*60, description: "Swimming"}
	],
	weights: [
		{accountId: 0, time: 1512640800, weight: 80000},
		{accountId: 0, time: 1513072800, weight: 78000}
	]
}, {
	id: 1,
	username: "Bob",
	password: "abc123",
	birthdate: 331171200,
	city: "Jönköping",
	trainings: [
		{accountId: 1, start: 1509562800, stop: 1509562800+30*60, description: "Walking"},
		{accountId: 1, start: 1509649200, stop: 1509649200+30*60, description: "Walking"},
		{accountId: 1, start: 1509735600, stop: 1509735600+30*60, description: "Walking"}
	],
	weights: [
		{accountId: 1, time: 1509566400, weight: 80000},
		{accountId: 1, time: 1509652800, weight: 80000},
		{accountId: 1, time: 1509739200, weight: 79000}
	]
}, {
	id: 2,
	username: "Claire",
	password: "abc123",
	birthdate: 177631200,
	city: "Göteborg",
	trainings: [
	],
	weights: [
	]
}]
