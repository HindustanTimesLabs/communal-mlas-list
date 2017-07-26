var fsz = require("fsz"),
	jz = require("jeezy"),
	pt = require("party-time");

var json = fsz.readJSON("data/data.json");

var out = [];

do_pols();

function do_pols(){
	json.forEach(d => {
		var obj = {};
		obj.name = d.name;
		obj.party_name = pt.convert(d.party, {greedy: false}).name;
		obj.party_abbr = pt.convert(d.party, {greedy: false}).abbr;
		obj.age = d.age;
		obj.url = d.url;
		obj.pol_type = d.unit_type == "state" ? "MLA" : "MP";
		obj.state = d.unit_type == "state" ? jz.str.toStartCase(d.unit, true).trim() : jz.str.toStartCase(d.subunit, true).trim()
		obj.constituency = jz.str.toStartCase(d.constituency, true).trim();
		obj.year = d.year;
		obj.communal_cases = d.communal_cases;
		obj.criminal_cases_json = d.criminal_cases_json;
		obj.photo = jz.str.toSlugCase(d.name) + ".jpg";
		out.push(obj);
	});
	// console.log(json[0]);
	// console.log(out[0]);
	fsz.writeFileSync("data/pols.json", JSON.stringify(out));
}

function do_cases(){
	json.forEach(d => {
	var cases = d.criminal_cases_json;
	cases.forEach(e => {
		if (e.communal_case){
			var obj = {};
			obj.name = d.name;
			obj.pary = d.party;
			obj.age = d.age;
			obj.url = d.url;
			obj.politician_type = d.unit_type == "state" ? "MLA" : "MP";
			obj.state = d.unit_type == "state" ? d.unit : d.subunit;
			obj.consituency = d.constituency;
			obj.election_year = d.year;
			obj.ipc_sections = e.ipc_sections;
			obj.other_details = e.other_details;
			out.push(obj);
		}
	});
});
}
