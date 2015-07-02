var Graph = function(lineData) {
	var parseDate = d3.time.format("%H:%M").parse;

	var data = [];
	
	var points = [];

	var margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 50
	};
	
	var width = parseInt($(".graph").attr("width"));
	var height = parseInt($(".graph").attr("height"));

	var svg = 
		d3.select("div.graph").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  	.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg = d3.select('svg')
	  	.append("g")
 		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	;


	var xRange = null;
	var yRange = null;


	this.getSVG = function(){
		return svg;
	}

	this.setMargin = function(value){
		margin = value;
	}

	this.getMargin = function(){
		return margin;
	}

	this.getHeight = function(){
		return height;
	}

	this.getWidth = function(){
		return width;
	}

	this.getXRange = function(){
		return xRange;
	}

	this.getYRange = function(){
		return yRange;
	}

	var calculate = function(id, maxG){
		
		//set Y max data
		var maxData = 0;

		data[id].forEach(function(d) {
				d.time = parseDate(d.time);
				if(d.g > maxData)
					maxData = d.g;
			});
		
		maxData += 0.5;

		//d3 params
		xRange = 
			d3.time.scale().
			range([margin.left, width - margin.right]).
			domain(
				d3.extent(data[id], function(d) { return d.time; })
			)
		;
		yRange = 
			d3.scale.linear().
			range([height - margin.top, margin.bottom]).
			domain([0, maxData])
		;

		xAxis = d3.svg.axis()
				.scale(xRange)
				.orient("bottom")
				.tickFormat(d3.time.format("%H:%M"))
		;

		yAxis = d3.svg.axis()
			.scale(yRange)
			.orient("left")
			.ticks(5)
		;

		//Line Coloration
		$("linearGradient").remove();

		svg.append("linearGradient")
				.attr("id", "temperature-gradient")
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("x1", 0).attr("y1", yRange(maxG -0.1))
				.attr("x2", 0).attr("y2", yRange(maxG))
				.selectAll("stop")
				.data([
					{offset: "0%", color: "steelblue"},
					{offset: "50%", color: "gray"},
					{offset: "100%", color: "red"}
			  	])
				.enter().append("stop")
				  	.attr("offset", function(d) { return d.offset; })
				  	.attr("stop-color", function(d) { return d.color; })

		//remove old Values
		$("#graph").find("g").remove();
		$("#graph").find("path").remove();

		//set X axis
		svg.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
			.call(xAxis)
		;

		//set Y axis
		svg.append('svg:g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + (margin.left) + ',0)')
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("G/L");
		;

	}

	this.getXAxis = function(){
		return xAxis;
	}

	this.getYAxis = function(){
		return yAxis;
	}

	var lineFunc = d3.svg.line()
		.x(
			function(d) {
				return xRange(d.time);
			}
		)	

		.y(
			function(d) {
				return yRange(d.g);
			}
		)
		.interpolate('basis'); //line Type monotone || basis || linear

	this.draw = function(id, maxG){
		console.log(data[id]);
		console.log(points[id]);
		//Fixed Max g for drive
		var constLine = [
			{
				time: data[id][0].time,
				g: maxG
			},
			{
				time: data[id][data[id].length -1].time,
				g: maxG
			}
		];

		svg.append('svg:path')
			.datum(constLine)
			.attr("class", "line")
			.attr('d', lineFunc(constLine))
		;

		//g/L line
		if(data[id] != null){
			svg.append('svg:path')
				.datum(data[id])
				.attr("class", "line")
				.attr('d', lineFunc(data[id]))
			;
		}

		//Points
		$(".mark").remove();
		if (points[p.id] != null) {
			var lastP = null;
			var count = 0;

			//IMG
			svg.selectAll(".point")
				.data(points[p.id])
				.enter().append("svg:image")
				.attr("class", "mark")
				.attr("x", 
					function(d) {
						return xRange(parseDate(d.time)) -30
					}
				)
				.attr("y",
					function(d) {
						var move = 0;

						if (lastP != null) {
							if(lastP == d.time)
							{
								count++;
								move = count * 34;
							}
							else{
								count = 0;
							}
						}

						lastP = d.time;
						console.log("c: " + count);
						console.log("m: " + move);
						return yRange(d.g) -35 - move;
					}
				)
				.attr("height", "32")
				.attr("width", "32")
				.attr("xlink:href", function(d){return "./img/"+d.name+"/"+d.img+".png" })
				.on('click', function(d){
					console.log(d.obj);
				})
			;

			lastP = null;
			var lastG = 0;

			//Circle
			svg.selectAll(".point")
				.data(points[p.id])
				.enter().append("svg:circle")
				.attr("class", "mark")
				.attr("stroke", "black")
				.attr("fill", function(d, i) {return "black" })
				.attr("cx",
					function(d){
						return xRange(parseDate(d.time))
					}
				)
				.attr("cy",
					function(d) {
						if (lastP != null) {
							if(lastP == d.time)
							{
								return yRange(lastG);
							}
							else{
								lastG = d.g;
							}
						}

						lastP = d.time;
						return yRange(d.g);
					}
				)
				.attr('r', 3.5)
			;
		}
	}

	this.setData = function(p){
		var drinks = p.getElements();
		var da = [{time: "00:00", g:0}]; //
		var po = [];

		var lastE = null;
		var lastG = null;
		var curG = 0;

		var inDigest = false;
		var endDigest = null;

		var sleeps = false;
		var endSleep = false;

		drinks.forEach(
			function(e){
				console.log(e);
				var alc = 0;
				var el = e.element
				var time = e.time;

				if (inDigest && compareTime(e.time, endDigest) == 1) {
					inDigest = false;
				}

				if (sleeps && compareTime(e.time, endSleep) == 1) {
					sleeps = false;
				}

				//Reduce g/L every 15min untill Element time reached
				if (lastE != null && curG > 0) {
					// console.log('lst: ' + lastE + "\ne.t: " + e.time);
					var ti = timeBetween(lastE, e.time);
					// console.log('ti: ' + ti);
					for (var i = 0.083; i < ti && curG > 0; i += 0.083) {
						// console.log("put at " + addMinute(lastE, i*60));
						curG -= 0.15 * 0.083;
						curG = (curG < 0) ? 0 : curG;

						da.push({
							time: addMinute(lastE, i*60),
							g:curG
						});
					}
				}

				if (el.element == "drink") {
					alc = ((el.vol * 100) * el.per * 0.8) / 10;
					alc = alc / (p.weight * p.r);

					if (inDigest) {
						e.time = addMinute(e.time, 60);
					}else{
						e.time = addMinute(e.time, 30);
					}
				}
				
				if (el.element == "food") {
					if(el.type > 1){
						inDigest = true;
					}

					endDigest = addMinute(e.time, 120);
				}

				po.push({
					name: el.element,
					img: el.img,
					time: time,
					obj: e.element,
					g: (e.time == lastE) ? lastG : curG
				});

				da.push({
					name: el.element,
					img: el.img,
					time: e.time,
					g: (curG + alc)
				});

				lastE = e.time;
				if (e.time != lastE) {
					lastG = curG;
				}

				curG = curG + alc;
			}
		);

		da = fillToEnd(lastE, curG, da);
		da.sort(compareTime);

		po.sort(compareTime);

		data[p.id] = da;
		points[p.id] = po;

		calculate(p.id, p.maxG);
		this.draw(p.id, p.maxG);
	}

	// if(0){
	// 	this.setData();
	// 	this.draw();
	// }


	var fillToEnd = function(b, curG, data){
		// console.log('Start: ' + lastE + "\n end: " + e.time);

		for (var i = 0.25; curG > 0; i += 0.25) {
			curG -= 0.15 * 0.25;
			curG = (curG < 0) ? 0 : curG;

			data.push({
				time: addMinute(b, i*60),
				g:curG
			});
		}

		return data;
	}

}
