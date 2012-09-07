/* jQuery sillyPopUp plugin v 0.1
 * author: Wojtek Turyn
 * 
 * 
 */

(function($){
	
	
	$.fn.sillyPopUp = function(text, callback) {
		
		var target = $(this);
		
		
		var data = target.data('sillyPopUp');
		
		target.children().remove();
	
		target.addClass('sillyPopUp');
		target.append('<p class="sillyPopUpText">'+text+'</p>');
		target.append('<div class="sillyPopUpButton">OK</div>');
		var a = $('<a class="sillyPopUpAnchor" href="javascript:void(0)"></a>');
		a.keydown(function() {
			switch(event.keyCode) {
			case tvKey.KEY_ENTER:
			case tvKey.KEY_RETURN:
				widgetAPI.blockNavigation(event);
				target.hide();
				a.blur();
				callback();
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