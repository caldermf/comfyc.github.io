const timeular_url_prefix = 'https://api.timeular.com/api/v3/time-entries/';
const clockify_url_prefix = 'https://api.clockify.me/api/v1/workspaces/';
const nat_db_id = '50d2fde3fa0f4bca8146608b489eee80';

const today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

var dateToday = yyyy + '-' + mm + '-' + dd; 
var firstOfMonth = yyyy + '-' + mm + '-01';

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
var yyyy = tomorrow.getFullYear();

var dateTomorrow = yyyy + '-' + mm + '-' + dd;

const lastMonday = new Date(today);
lastMonday.setDate(today.getDate() - today.getDay() + 1);
var dd = String(lastMonday.getDate()).padStart(2, '0');
var mm = String(lastMonday.getMonth() + 1).padStart(2, '0');
var yyyy = lastMonday.getFullYear();

var dateLastMonday = yyyy + '-' + mm + '-' + dd;

var squadTotal = 0;

async function calderDW() {
	api_url = timeular_url_prefix + dateToday + 'T04:00:00.000/' + dateTomorrow + 'T03:59:59.999';
	const response = await fetch(api_url, {
		headers: {
			'Authorization': 'Bearer NGIwZmVmOTctZWUyMC1iNTE3LWM0NDgtNmYxYTE5ZTM3MGU2'
		}
	});
	const data = await response.json();
	var timeEntries = data.timeEntries;
	var total = 0;
	for (i in timeEntries) {
		for (j in timeEntries[i].note.tags) {
			if (timeEntries[i].note.tags[j].label == "DeepWork") {
				total += new Date(timeEntries[i].duration.stoppedAt) - new Date(timeEntries[i].duration.startedAt);
			}
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('pcalder').style.display = 'none';
	}
	else {
		document.getElementById('calder').textContent = timeString;
	}
}


async function weeklyCalderDW() {
	api_url = timeular_url_prefix + dateLastMonday + 'T04:00:00.000/' + dateTomorrow + 'T03:59:59.999';
	const response = await fetch(api_url, {
		headers: {
			'Authorization': 'Bearer NGIwZmVmOTctZWUyMC1iNTE3LWM0NDgtNmYxYTE5ZTM3MGU2'
		}
	});
	const data = await response.json();
	var timeEntries = data.timeEntries;
	var total = 0;
	for (i in timeEntries) {
		for (j in timeEntries[i].note.tags) {
			if (timeEntries[i].note.tags[j].label == "DeepWork") {
				total += new Date(timeEntries[i].duration.stoppedAt) - new Date(timeEntries[i].duration.startedAt);
			}
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	document.getElementById('wcalder').textContent = timeString;
}

async function monthlyCalderDW() {
	api_url = timeular_url_prefix + firstOfMonth + 'T04:00:00.000/' + dateTomorrow + 'T03:59:59.999';
	const response = await fetch(api_url, {
		headers: {
			'Authorization': 'Bearer NGIwZmVmOTctZWUyMC1iNTE3LWM0NDgtNmYxYTE5ZTM3MGU2'
		}
	});
	const data = await response.json();
	var timeEntries = data.timeEntries;
	var total = 0;
	for (i in timeEntries) {
		for (j in timeEntries[i].note.tags) {
			if (timeEntries[i].note.tags[j].label == "DeepWork") {
				total += new Date(timeEntries[i].duration.stoppedAt) - new Date(timeEntries[i].duration.startedAt);
			}
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	document.getElementById('mcalder').textContent = timeString;
}

async function davidDW() {
	api_url = timeular_url_prefix + dateToday + 'T04:00:00.000/' + dateTomorrow + 'T03:59:59.999';
	const response = await fetch(api_url, {
		headers: {
			'Authorization': 'Bearer M2ExNzFjNmEtNDJkYi0wNmQ1LTMwOWYtYTQwYTEwZWI5MTlm'
		}
	});
	const data = await response.json();
	var timeEntries = data.timeEntries;
	var total = 0;
	for (i in timeEntries) {
		total += new Date(timeEntries[i].duration.stoppedAt) - new Date(timeEntries[i].duration.startedAt);
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('pdavid').style.display = 'none';
	}
	else {
		document.getElementById('david').textContent = timeString;
	}
}

async function matthewDW() {
	api_url = clockify_url_prefix + '5e19e724c0978657b3c1bc5e/user/5e666a9657ec6f76d894c685/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'M2NhZWJhMmYtZGM0NS00ZTA0LTg5MzUtN2IwYzUxYmE2ZjE1'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('pmatthew').style.display = 'none';
	}
	else {
		document.getElementById('matthew').textContent = timeString;
	}
}

async function siddDW() {
	api_url = clockify_url_prefix + '5ed6d5c1ecf8ef304403d386/user/5ed6d5c0ecf8ef304403d37f/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'NWQzODI4YWEtMzYwMi00MzBjLWEzZDktYWI4NjUzMDg5YWRi'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('psidd').style.display = 'none';
	}
	else {
		document.getElementById('sidd').textContent = timeString;
	}
}

async function jarDW() {
	api_url = clockify_url_prefix + '5f5eab7f3ab33d735bc2e487/user/5f5eab7e3ab33d735bc2e486/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'NGQ1MDBkNTctOGQzMS00YTc4LTk0ZjYtY2M0ODYzMWUwY2E3'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('pjar').style.display = 'none';
	}
	else {
		document.getElementById('jar').textContent = timeString;
	}
}

async function tannyDW() {
	api_url = clockify_url_prefix + '5e3aced891b8322612b7ec7c/user/5e3aced891b8322612b7ec7a/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'NTNmZjYwNGQtZjFkZi00MWUxLTg0M2MtMjJhZTM0YjhhZjVl'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('ptanny').style.display = 'none';
	}
	else {
		document.getElementById('tanny').textContent = timeString;
	}
}

async function alexDW() {
	api_url = clockify_url_prefix + '626d56c96963bd3cb5cf9da2/user/626d56c86963bd3cb5cf9d9d/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'MGUwYTBlMGEtNGZjYS00MzM1LTgyNWEtMWM0MzdmYWZjMDli'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('palex').style.display = 'none';
	}
	else {
		document.getElementById('alex').textContent = timeString;
	}
}

async function mavisDW() {
	api_url = clockify_url_prefix + '5e2fae8e7a02e7486e3c9cb3/user/5e2fae8d7a02e7486e3c9cb2/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'YmJhYTFhYmQtMzQ4Yy00MjFiLTg5YzYtOGE2ODU5ZWI4ODU2'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';
	
	if (m == 0) {
		document.getElementById('pmavis').style.display = 'none';
	}
	else {
		document.getElementById('mavis').textContent = timeString;
	}
	
}

async function marisaDW() {
	api_url = clockify_url_prefix + '629e180eee936d4be89be07d/user/629e180eee936d4be89be073/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'ZTI1YjYxYzYtYzUyYy00MjM2LWIzMDItZTJlZjVlNjllZWQx'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('pmarisa').style.display = 'none';
	}
	else {
		document.getElementById('marisa').textContent = timeString;
	}
}

async function alvaroDW() {
	api_url = clockify_url_prefix + '62ad33a304cf142e40d7e1c2/user/62ad33a204cf142e40d7e1c0/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'NzcwOWVmYWMtZjg4ZS00ODExLTlmYmItOTJlNzA5MDBmNThj'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('palvaro').style.display = 'none';
	}
	else {
		document.getElementById('alvaro').textContent = timeString;
	}
}

async function annaDW() {
	api_url = clockify_url_prefix + '6286d0a83bf26277d6f75766/user/6286d0a73bf26277d6f7575f/time-entries?start=' + dateToday + 'T00:00:00.000Z&end=' + dateToday + 'T23:59:59.999Z';
	const response = await fetch(api_url, {
		headers: {
			'x-api-key': 'NDI3YjI5MzQtNDUzNi00ZGQ3LTlmYTQtNDZiMDQzMGVlYzU1'
		}
	});
	const data = await response.json();

	var total = 0;
	for (i in data) {
		if (data[i] && data[i].timeInterval.start && data[i].timeInterval.end) {
		total += new Date(data[i].timeInterval.end) - new Date(data[i].timeInterval.start);
		}
	}
	var m = Math.floor(total/60000);
	var timeString = (Math.floor(m/60)).toString() + 'h' + (m % 60).toString() + 'm';

	if (m == 0) {
		document.getElementById('panna').style.display = 'none';
	}
	else {
		document.getElementById('anna').textContent = timeString;
	}
}

calderDW();
davidDW();
matthewDW();
siddDW();
jarDW();
tannyDW();
alexDW();
mavisDW();
marisaDW();
alvaroDW();
annaDW();

