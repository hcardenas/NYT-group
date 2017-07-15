
$("#clear_submit").on("click", function(event) {
	event.preventDefault();
	$("#content").empty();
});


$("#submit").on("click", function(event) {
	event.preventDefault();

	$("#content").empty();

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" ;


	var search_q ;
	var search = $("#search_term").val() ;
	if (search !== "") {
		search_q = "fq=" + $("#search_term").val() ;
	}
	else {
		search_q = "Obama";
	}

	var date = $("#start_year").val();
	var begin_date;

	if (date !== "") {
		begin_date = "&begin_date=" + date + "0101";
	} else {
		begin_date = "";
	}
	
	date = $("#end_year").val();
	var end_date;
	if (date !== "") {
		end_date = "&end_date=" + date  + "1231";
	}
	else {
		end_date = ";"
	}

	var key = "&api-key=84974ac78c4444a1b6b5bff7f57c637a"



	queryURL+= search_q;
	queryURL += begin_date;
	queryURL += end_date;

	queryURL+=key;

	var records_num = parseInt($(".drop_down").val());


	console.log(records_num);

	$.ajax({
		url: queryURL,
        method: "GET"

	}).done(function(res) {
		console.log(res);
		var outter_div;
		var conent_div;
		var section ;
		var pub_date;
		var print_headline;
		var headline;

		for (var i = 0; i < records_num; ++i) {
			console.log(i);

			 outter_div = $("<div class='panel panel-default' >");
			 conent_div = $('<div class="panel-body" style="background-color:rgb(236, 240, 241) !important;">');
			 headline = $("<h4>").html("<span class='label label-default' style='background-color: #20315a;'>" + (i+1) + "</span> " + res.response.docs[i].headline.print_headline);
			 section = $("<p>").text(res.response.docs[i].section_name);
			 pub_date = $("<p>").text(res.response.docs[i].pub_date);
			 print_headline = res.response.docs[i].web_url;
			 print_headline = $("<a href=" + print_headline + ">").text(print_headline);


			 outter_div.append(conent_div);
			 conent_div.append(headline);
			 conent_div.append(section);
			 conent_div.append(pub_date);
			 conent_div.append(print_headline);


			 $("#content").append(outter_div);
			
			 

		}
		
	});

});