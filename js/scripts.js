var isMobile = $(window).width() <= 768 ? true : false,
	url = window.location.href;

var crimes = [{
	name: "153A",
	url: "https://indiankanoon.org/doc/345634/"
},{
	name: "153B",
	url: "https://indiankanoon.org/doc/771276/"
},{
	name: "295",
	url: "https://indiankanoon.org/doc/305995/"
},{
	name: "295A",
	url: "https://indiankanoon.org/doc/1803184/"
},{
	name: "505(1)(c)",
	url: "https://indiankanoon.org/doc/1565692/"
},{
	name: "505(2)",
	url: "https://indiankanoon.org/doc/1198526/"
},{
	name: "505(3)",
	url: "https://indiankanoon.org/doc/584684/"
},{
	name: "RPA 125",
	url: "https://indiankanoon.org/doc/28226194/"
}]
	

$.getJSON("data/pols2.json", function(data){
// first draw
	draw(jz.arr.sortBy(data, "communal_cases", "desc"));

	$(".control select").change(function(){
		draw(get_data());
	});

	// Set up filters
	var parties = _.chain(data).pluck("party_name").uniq().value().sort().map(function(d){ 
		var obj = {};
		obj.name = d;
		obj.abbr = _.where(data, {party_name: d})[0].party_abbr;
		return obj;
	});
	// var party_abbrs = _.chain(data).pluck("party_abbr").uniq().value().sort();
	parties.forEach(function(party){
		$(".select-party").append("<option value='" + party.name + "'>" + (isMobile ? party.abbr : party.name) + "</option>");
	});

	var states = _.chain(data).pluck("state").uniq().value().sort();
	states.forEach(function(state){
		$(".select-state").append("<option>" + state + "</option>");
	});

	// Clear the filters
	$(document).on("click", ".clear-filters.active",function(){
		
		// reset all
		$(".control-filter select").each(function(index, select){
			$(this).val("all");	
		});

		draw(get_data());
	});
	
	// Functions for making data happen
	function get_sorted_data(){
		var val = $(".control-sort select").val();
		return jz.arr.sortBy(data, val, (val == "communal_cases" || val == "year" ? "desc" : "asc"));
	}

	function get_filter_object(){
		var filter_obj = {};

		$(".control-filter select").each(function(index, filter){
			var column = $(filter).attr("data-column");
			var value = $(filter).val();
			if (value != "all") filter_obj[column] = value;
		});

		// can we clear filters?
		if (Object.keys(filter_obj).length == 0){
			filter_obj = null;
			$(".clear-filters").addClass("inactive").removeClass("active");
		} else {
			$(".clear-filters").removeClass("inactive").addClass("active");
		}

		return filter_obj;
	}

	function get_data(){
		var d = get_sorted_data(),
			f = get_filter_object();
		return f ? _.where(d, f) : d;
	}
	
	// Function for drawing
	function draw(data){
		
		$(".pols-wrapper").empty();
		
		data.forEach(function(d, i){
	
			$(".pols-wrapper").append("<div class='pol pol-" + i + "'></div>");
			
			// photo img
			$(".pol-" + i).append("<div class='pol-photo'></div>");
	
			$(".pol-" + i + " .pol-photo").append("<a target='_blank' href='" + d.url + "'><img src='" + url + "/img/pol/" + d.photo + "' /></a>");
			
			// text
			$(".pol-" + i).append("<div class='pol-text'></div>")
	
			$(".pol-" + i + " .pol-text").append("<a target='_blank' href='" + d.url + "'><div class='pol-name'>" + d.name + "</div></a>");
			$(".pol-" + i + " .pol-text").append("<div class='pol-cases'>Accused in <span class='case-number'>" + d.communal_cases + "</span> communal " + (d.communal_cases > 1 ? "cases" : "case") + "</div>");
	
			$(".pol-" + i + " .pol-text").append("<div class='pol-sub pol-party'><b>" + d.party_name + "</b></div>");
			$(".pol-" + i + " .pol-text").append("<div class='pol-sub pol-description'>Elected in " + d.year + " as an " + d.pol_type + " from " + d.constituency + ", " + d.state + "</div>");
			
			$(".pol-" + i + " .pol-text").append("<div class='pol-sections-title'>Criminal sections</div>");

			d.sections_unique.sort().forEach(function(e){
				$(".pol-" + i + " .pol-text").append("<a target='_blank' href='" + _.where(crimes, {name: e})[0].url + "'><div class='section'>" + e + "</div></a>");
			});
			

		});

		photo_height_resize();

	}

	// Dealing with photos
	function photo_height_resize(){
		$(".pol-photo").each(function(i, d){
			var w = $(this).width();	
			$(this).height(w);
		});
	}
	photo_height_resize();
	$(window).resize(photo_height_resize);
});