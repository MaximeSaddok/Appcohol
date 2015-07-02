var Profile = function(s,w,id,name,drive){

	this.id = id;

	this.name = name;
	this.isYongDriver = drive;
	this.weight = w;
	this.sex = s;

	this.maxG = (this.isYongDriver) ? 0.2 : 0.5;

	if (this.sex == 'H' || this.sex == 'h') {
		this.r = 0.7;
	}
	else{
		this.r = 0.6;
	}

	var elements = [];

	this.addElement = function(d){
		elements.push(d);
		elements.sort(compareTime);
	}

	this.removeElement = function(d){
		var index = null
		elements.forEach(
			function(e, i){
				if (JSON.stringify(e) === JSON.stringify(d)) {
					index = i;
					return -1
				}
			}
		);
		
		elements.splice(index, 1);
		elements.sort(compareTime);
	}

	this.getElements = function(){
		return elements;
	}

	
}

var compareTime = function(a, b){
	timeA = (a.time != undefined) ? a.time.split(":") : a.split(":");
	timeB = (b.time != undefined) ? b.time.split(":") : b.split(":");

	if (parseInt(timeA[0]) < parseInt(timeB[0])) {
		return -1;
	}
	else if(parseInt(timeA[0]) > parseInt(timeB[0])){
		return 1
	}
	else{
		if (parseInt(timeA[1]) < parseInt(timeB[1])) {
			return -1;
		}
		else if(parseInt(timeA[1]) > parseInt(timeB[1])){
			return 1
		}
	}

	if(a.element != undefined && a.element.element != undefined){
		if (a.element.element != b.element.element) {
			if (a.element.element != "drink") {
				return -1;
			}
			else if(b.element.element != "drink"){
				return 1;
			}
		}
	}

	return 0;
}

var p = new Profile('F', 65, 0, "aa", true);

var Food = function(ty){
	this.element = "food";
	this.type = ty; //1 = snak; 2 = meal
	this.img = (ty == 1) ? "snack" : "meal";
}

var Drink = function(ty, v){
	this.element = "drink";
	this.img = ty; // beer, wine.... (To set)
	this.vol = v; // Volume in L

	switch(ty) {
		case "wine":
			this.name = "Vin"; // beer, wine.... (To set)
			this.per = 12; //alcohol percent
			break;

		case "digest":
			this.name = "Digestif"; // beer, wine.... (To set)
			this.per = 43; //alcohol percent
			break;

		case "beer":
			this.name = "Bière"; // beer, wine.... (To set)
			this.per = 5.5; //alcohol percent
			break;

		case "cocktail":
			this.name = "Cocktail"; // beer, wine.... (To set)
			this.per = 20; //alcohol percent
			break;
	}
	
}

var Sleep = function(t){
	this.element = "sleep";
	this.img = "sleep";
	this.time = t;// Amount of time slept
}

function timeBetween(d1, d2){
	if (compareTime({time: d2}, {time: d1}) == -1) {
		return -1;
	}

	var t1 = d1.split(':');
	var t2 = d2.split(':');

	var h1 = parseInt(t1[0]);
	var h2 = parseInt(t2[0]);

	var m1 = parseInt(t1[1]);
	var m2 = parseInt(t2[1]);

	m1 += (h1*60);
	m2 += (h2*60);

	m = m1 - m2;
	var h = Math.round((m /60) * 100) /100;
	var time = Math.abs(h);

	return time;
}

function addMinute(d1, m){
	m = parseInt(m);
	var t = d1.split(':');

	var min = parseInt(t[1]);
	min += m;
	
	var hToAddd = Math.floor((min / 60))
	var h = parseInt(t[0]) + hToAddd;
	min -= 60 * hToAddd;

	if (min < 0)
		min = 0;

	h = h.toString();
	min = min.toString();
	
	if (h.length == 1) {
		h = "0"+h;
	}

	if (min.length == 1) {
		min = "0"+min;
	}

	time = h+ ":" +min;

	return time;
}

// p.addElement({time: "03:30", element: new Drink("beer", 0.5, 1)});
// p.addElement({time: "03:30", element: new Drink(0.1, 5)});

// p.addElement({time: "03:00", element: new Food(2)});
// p.addElement({time: "02:30", element: new Drink("wine", 0.3, 0.3)});
// p.addElement({time: "01:00", element: new Food(1)});
p.addElement({time: "01:30", element: new Drink("wine", 0.25)});
// p.addElement({time: "01:30", element: new Drink("wine", 0.3, 5)});
// p.addElement({time: "01:30", element: new Drink("wine", 0.5, 6.5)});
// p.addElement({time: "01:30", element: new Drink("wine", 0.5, 6.5)});
p.addElement({time: "00:00", element: new Drink("digest", 0.03)});
p.addElement({time: "00:00", element: new Food(2)});


// function test(obj){
// 	function F(){
// 		this.newVar = 13;
// 	}

// 	// F.prototype = obj;
// 	for (var property in obj) {
//     	F.prototype[property] = obj.prototype[property];
//     }

// 	return new F();
// }

// var a = test(new Drink("wine", 2, 2));

// console.log(a);