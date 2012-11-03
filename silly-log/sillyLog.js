Log = {
		init:function() {
			$("body").append('<div id="sillyLog" style="z-index:99; display:none; width:200px; height:100px; color:black; background-color:white; font-size:14px; padding:3px 3px 3px 3px"></div>');
			
		},
		line:function(text) {
			alert("Log: "+text);
			var r = $("#sillyLog").html();
			$("#sillyLog").html("> "+text+"<br>"+r);
		},
		show:function() {
			$("#sillyLog").show();
			
		},
		hide:function() {
			$("#sillyLog").hide();
		}
};