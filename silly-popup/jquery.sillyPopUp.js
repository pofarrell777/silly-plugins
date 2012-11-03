/* jQuery sillyPopUp plugin v 0.1
 * author: Wojtek Turyn
 * 
 * 
 */

(function($){
	
	
	$.fn.sillyPopUp = function(text, callback, buttons) {
		
		var target = $(this);
		
		
		var data = target.data('sillyPopUp');
		
		target.children().remove();
	
		target.addClass('sillyPopUp');
		target.append('<p class="sillyPopUpText">'+text+'</p>');
		var selected=0;
		
		if (buttons) {
			var bholder=$('<div class="sillyPopUpButtons"></div>');
			for (var i=0; i<buttons.length; i++) {
				bholder.append('<div style="float:left" class="sillyPopUpButton" id="sillyPopUpButton'+i+'">'+buttons[i].text+'</div>');
			}
			
			bholder.append('<div style="clear:both"></div>');
			
			target.append(bholder);
			$('#sillyPopUpButton0').addClass('selected');
		}
			
		var a = $('<a class="sillyPopUpAnchor" href="javascript:void(0)"></a>');
		a.keydown(function() {
			switch(event.keyCode) {
			case tvKey.KEY_ENTER:
				target.hide();
				a.blur();
				if (buttons) {
					callback(buttons[selected].name);
				} else
					callback('enter');
			break;
			case tvKey.KEY_RETURN:
				widgetAPI.blockNavigation(event);
				target.hide();
				a.blur();
				callback('return');
			break;
			case tvKey.KEY_LEFT:
				if (buttons && selected>0) {
					selected--;
					$('.sillyPopUpButton').removeClass('selected');

					$('#sillyPopUpButton'+selected).addClass('selected');
				}
			break;
			case tvKey.KEY_RIGHT:
				if (buttons && selected<buttons.length-1) {
					selected++;
					$('.sillyPopUpButton').removeClass('selected');

					$('#sillyPopUpButton'+selected).addClass('selected');
				}
			break;
			case tvKey.KEY_EXIT:
				widgetAPI.blockNavigation(event);
				widgetAPI.sendExitEvent();
			break;
			}
		});
		target.append(a);
		target.data('sillyPopUp',1);
		target.show();
		a.focus();
	

	};
	
})(jQuery);