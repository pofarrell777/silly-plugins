/* jQuery sillyInput plugin v 0.1
 * author: Wojtek Turyn
 * 
 * 
 */

(function($){
	
	var I={
			onEnter:function(value){
				alert('SillyInput: '+value);
			},
			onReturn:function(){
				alert('SillyInput canceled');
			},
			used:false,
			onChange:function(text) {
				alert(text);
			}
	};
	
	
	var methods={
		init:function(options) {
			var settings = $.extend({
				text:'Enter text:',
				width:300,
				height:100,
				length:20,
				left:200,
				top:50,
				keyPadLeft:570,
				keyPadTop:105,
				charKits:['_latin_small','_latin_big','_num'],
				defaultCharKit:'_latin_small',
				enableAutoComplete:false,
				autoCompleteRequest:null
				
			},options);
			
			var target = $(this);
			
			I.settings = settings;
			
			var data = target.data('sillyInput');
			if (data)
				return;
			
			if (target.length!=1 || I.used) {
				$.error( 'SillyInput can be initialized on one element only.');
				return;
			}
			
			I.used=true;
			target.data('sillyInput',1);
			target.addClass('sillyInput');
			target.css({
				display:'none',
				position:'absolute',
				width:I.settings.width,
				height:I.settings.height,
				left:I.settings.left,
				top:I.settings.top,
				'z-index':99
				
			});
			target.append('<p>'+I.settings.text+'</p>');
			target.append('<input type="text" maxlength="'+I.settings.length+'" id="sillyInputInput" />');
			
			
				var sillyIme = new IMEShell('sillyInputInput', function(){
					
					sillyIme.onFocusFunc=function(){
						sillyIme.modeArr=I.settings.charKits;
						sillyIme._updateModeList();
						sillyIme.core.ChangeInputMode(I.settings.defaultCharKit);
						sillyIme._refreshKeypad();
						sillyIme._refreshKeypadHelp();
						
					};
					
					sillyIme.setKeyFunc(tvKey.KEY_ENTER, function(){
						var value = $("#sillyInputInput").val();
						$("#sillyInputInput").blur();
						target.hide();
						I.onEnter(value);
					});
					sillyIme.setKeyFunc(tvKey.KEY_RETURN, function(){
						widgetAPI.blockNavigation(event);
						$("#sillyInputInput").blur();
						target.hide();
						I.onReturn();
					});
					sillyIme.setKeyFunc(tvKey.KEY_EXIT, function(){
						widgetAPI.blockNavigation(event);
						$("#sillyInputInput").blur();
						widgetAPI.sendExitEvent();
					});
					sillyIme.setOnComplete = function() {
						I.onChange($("#sillyInputInput").val());
					};
					sillyIme.setKeypadPos(I.settings.keyPadLeft, I.settings.keyPadTop);
					sillyIme.setWordBoxPos(18, 6);
					
				});
			
			
		},
		show:function(text, enterFunc, returnFunc, charset) {
			if (typeof charset!='undefined') {
				I.settings.defaultCharKit = charset;
			}
			
			var data = $(this).data('sillyInput');
			if (!data) {
				$.error( 'SillyInput was not initialized on this element.');
				return;
			}
			
			I.onEnter = enterFunc;
			I.onReturn = returnFunc;
			$('.sillyInput').show();
			$("#sillyInputInput").val(text);
			$("#sillyInputInput").focus();
		},
		autoComplete:function(list) {
			
		},
	};
	
	$.fn.sillyInput = function(method) {
		 if ( methods[method] ) {
		      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      return methods.init.apply( this, arguments );
		    } else {
		    	
		      $.error( 'Method ' +  method + ' does not exist on jQuery.sillyInput' );
		    }
	
	};
})(jQuery);