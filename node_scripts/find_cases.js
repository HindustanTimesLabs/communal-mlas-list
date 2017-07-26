var fsz = require("fsz"),
	jz = require("jeezy");

var json = fsz.readJSON("data/pols.json");

var out = [];

json.forEach(function(obj){

	obj.sections = [];

	obj.criminal_cases_json.forEach(function(obj0){

		if (
			obj0.ipc_sections.indexOf("153(A)") != -1 || 
			obj0.ipc_sections.indexOf("153A") != -1 ||
			obj0.ipc_sections.indexOf("153a") != -1 ||
			obj0.ipc_sections.indexOf("153(a)") != -1 ||
			obj0.ipc_sections.indexOf("153(1)(a)") != -1
		){
			obj.sections.push("153A");
		}

		if (
			obj0.ipc_sections.indexOf("153(1)(b)") != -1 ||
			obj0.ipc_sections.indexOf("153(1)A") != -1 ||
			obj0.ipc_sections.indexOf("153B") != -1 ||
			obj0.ipc_sections.indexOf("153(B)") != -1 ||
			obj0.ipc_sections.indexOf("153(b)") != -1
		){
			obj.sections.push("153B");
		}

		if (obj0.ipc_sections.indexOf("295") != -1){
			obj.sections.push("295");
		}
		 
		// if (obj0.ipc_sections.indexOf("296") != -1){
		// 	obj.sections.push("296");
		// }
		
		// if(obj0.ipc_sections.indexOf("297") != -1){
		// 	obj.sections.push("297");
		// }

		// if(obj0.ipc_sections.indexOf("298") != -1){
		// 	obj.sections.push("298");
		// }

		if (
			obj0.ipc_sections.indexOf("505(2)") != -1 ||
			obj0.ipc_sections.indexOf("505(ii)") != -1 ||
			obj0.ipc_sections.indexOf("505(II)") != -1
		){
			obj.sections.push("505(2)");
		}

		if (
			obj0.ipc_sections.indexOf("505(1)(C)") != -1 || 
			obj0.ipc_sections.indexOf("505C") != -1 || 
			obj0.ipc_sections.indexOf("505(I)(C)") != -1 ||
			obj0.ipc_sections.indexOf("505(c)") != -1
		){
			obj.sections.push("505(1)(c)");
		}

		if (
			obj0.other_details.indexOf("RPA125") != -1 ||
			obj0.other_details.indexOf("125 of the Representation of the People Act") != -1 ||
			obj0.other_details.indexOf("125 RP Act") != -1 ||
			obj0.other_details.indexOf("Section 125 R.P. Act") != -1 ||
			obj0.other_details.indexOf("Section 125 of R.P. Act") != -1 ||
			obj0.other_details.indexOf("125 R.P. Act") != -1 ||
			obj0.other_details.indexOf("Section-125 RP Act") != -1 ||
			obj0.other_details.indexOf("Sec.125 RP Act") != -1
		){
			obj.sections.push("RPA 125");
		}

	});
	obj.sections_unique = jz.arr.unique(obj.sections);
	out.push(obj);
});

fsz.writeJSON("data/pols2.json", out);