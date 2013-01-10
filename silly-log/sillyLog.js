SillyLog = {
		init:function(enabled) {
			$("body").append('<div id="sillyLog" style="overflow:hidden;position:absolute;border:solid 1px #A0A0A0; z-index:99; display:none; width:200px; height:200px; color:#A0A0A0; background:rgba(0,0,0,0.9); font-size:14px; padding:3px 3px 3px 3px"></div>');
			if (enabled) {
				document.body.onkeydown = function() {
					if (event.keyCode==tvKey.KEY_1) {
						if (SillyLog.actVis<5) {
							SillyLog.actVis++;
						} else {
							SillyLog.actVis=0;
						}
						$("#sillyLog").css(SillyLog.vis[SillyLog.actVis]);
					}
				};
				window.onerror = function(errorMsg, url, lineNumber) {
					SillyLog.line('<span style="color:red">'+errorMsg+'<br>'+lineNumber+'</span>');
				};
			}
			$("#sillyLog").css(SillyLog.vis[SillyLog.actVis]);
		},
		actVis:0,
		vis:[
		     {'display':'none'},
		     {'display':'block','left':'0px','top':'0px','width':'200px','height':'200px'},
		     {'display':'block','left':'759px','top':'0px','width':'200px','height':'200px'},
		     {'display':'block','left':'0px','top':'329px','width':'200px','height':'200px'},
		     {'display':'block','left':'759px','top':'329px','width':'200px','height':'200px'},
		     {'display':'block','left':'0px','top':'0px','width':'960px','height':'532px'},
		     ],
		line:function(text) {
			alert("Log: "+text);
			var r = $("#sillyLog").html();
			widgetAPI.putInnerHTML(document.getElementById('sillyLog'),"> "+text+"<br>"+r );
			
		},
		show:function() {
			$("#sillyLog").show();
			
		},
		hide:function() {
			$("#sillyLog").hide();
		}
};

window.log = SillyLog.line;