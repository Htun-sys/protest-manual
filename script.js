$(document).ready( function() {
	let url = "https://htun-sys.github.io/cdm-json/data/test.json";
	$.getJSON(url, function(data) {
		getMenuItems(data);
		$("#home").on("click", function() {
			getMenuItems(data);
		});
	});//endof getJSON


});


function getUniqueHeadingValues(list) {
	let newList = list.map((obj)=>{
		return obj["heading"];
	});
	return Array.from(new Set(newList));
}

function getUniqueSubheadingValues(heading, list) {
	list = list.filter((obj)=>obj["heading"]===heading);
	newList = list.map((obj)=>obj["subheading"]);
	return Array.from(new Set(newList));
}

function getUniqueContentHeadingValues(subheading, list) {
	list = list.filter((obj)=>obj["subheading"]===subheading);
	newList = list.map((obj)=>obj["contentheading"]);

	return Array.from(new Set(newList));
}
//there are heading, subheading and contentheading


function getContent(data, contentHeading) {
	$("section").empty();
	let selectedObj = data.filter((obj)=>obj["contentheading"]===contentHeading)[0];
	$("#navbar-brand").html(contentHeading);
	$("section").attr("id",`${selectedObj["id"]}`); 
	let contentObject = selectedObj["content"];
	let contentLength = contentObject["hk"].length;
	let table = $("<table>", {"class":"table"});
	let tableHeading = $("<tr>");
	tableHeading.append($("<th>", {"class":"headingMyanmar"}).text("Myanmar"));
	tableHeading.append($("<th>", {"class":"headingHK"}).text("Hongkong"));
	table.append(tableHeading);
	for (let z=0;z<contentLength ;z++) {
		let HK = contentObject["hk"][z];
		let MM = contentObject["mm"][z];
		let tableRow = $("<tr>");
		tableRow.append($("<td>",{
			"class":"mm"
		}).text(MM)).append($("<td>",{
			"class":"hk"
		}).text(HK));
		table.append(tableRow);	
	}
	$("section").append(table);
	let navigatorDiv = $("<div>", {"class":"navigatorDiv"});

	if (parseInt($("section").attr("id"))!==1) {
	let prevSpan = $("<span>", {"class":"prev"}).on("click",function() {
		var id = (parseInt($("section").attr("id"))-1).toString();
		let prevObj = data.filter((obj)=>obj["id"]===id)[0];
		getContent(data, prevObj["contentheading"]);
	}).text("< Prev");
	navigatorDiv.append(prevSpan);
	}

	if (parseInt($("section").attr("id"))!==data.length) {
	let nextSpan = $("<span>", {"class":"next"}).on("click",function() {
		var id = (parseInt($("section").attr("id"))+1).toString();
		let nextObj = data.filter((obj)=>obj["id"]===id)[0];
		console.log(nextObj);
		getContent(data, nextObj["contentheading"]);
	}).text("Next >");
	navigatorDiv.append(nextSpan);
	}
	$("section").append(navigatorDiv);
	removeFooter();
	setFooter();
}

function getMenuItems(data) {
	$("section").empty();
	$("#navbar-brand").text("HK Protest Manual");
	let headingList = getUniqueHeadingValues(data);
		for (let i=0; i<headingList.length; i++) {
			let card = $("<div>", {"class":"card"});
			let cardBody = $("<div>", {"class":"card-body"});
			let cardHeading = $("<h3>", {"class":"card-title"}).text(headingList[i]);
			cardBody.append(cardHeading);
			card.append(cardBody);
			$("section").append(card);//endof setting headings
			
			let subHeadingList = getUniqueSubheadingValues(headingList[i], data);
			for (let j=0;j<subHeadingList.length;j++) {
				let cardSubHeading = $("<h4>",{"class":"card-text"}).text(subHeadingList[j]);
				cardBody.append(cardSubHeading);
				let contentHeadingList = getUniqueContentHeadingValues(subHeadingList[j], data);
				for (let k=0;k<contentHeadingList.length;k++) {
					let cardContentHeading = $("<p>", {
						"class":"contentheading"
					}).text(contentHeadingList[k]);;
					cardContentHeading.on("click", function() {
						getContent(data, contentHeadingList[k])
					});
					cardBody.append(cardContentHeading);
				}
			}//endof subheading for loop
		};//endof heading for loop
	removeFooter();
	setFooter();
}

function setFooter () {
	let footerDiv = $("<div>", {"class":"footerDiv text-center p-3"}).text("2021 Myanmar");
	let footer = $("<footer>",{"class":"bg-light text-center text-lg-start"});
	footer.append(footerDiv);
	$("body").append(footer);
}

function removeFooter () {
	$("footer").remove();
}