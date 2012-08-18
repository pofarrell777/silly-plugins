/* jQuery silly-grid plugin v 0.1
 * author: Wojtek Turyn
 * 
 * 
 */

(function( $ ) {
	var I = {
		current:{},
		data:{},
		
		localInit:function(context) {
			var id = $(context).data('tvgrid');
			if (!id)
				{
					$.error('tvGrid was not initialized on this element: '+$(context).attr('id'));
				} else {
					I.current = I.data['data'+id];
				}
			
		},
		select:function() {
			$("#"+I.current.id+" .tvGridElement-"+I.current.previous).removeClass(I.current.settings.selectClass);
			$("#"+I.current.id+" .tvGridElement-"+I.current.currentIndex).addClass(I.current.settings.selectClass);
			I.current.previous=I.current.currentIndex;
			I.current.settings.onSelected(I.current.currentIndex);
			
		},
		keyHandler:function() {
			switch(event.keyCode) {
			case tvKey.KEY_UP:
				if (I.current.currentIndex>I.current.settings.perRow-1) {
					I.current.currentIndex -= I.current.settings.perRow;
					I.select();					
				} else {
					I.current.settings.onMoveBeyondTop();
				}
			break;
			case tvKey.KEY_DOWN:
				var lastRow=Math.ceil(I.current.childrenCount / I.current.settings.perRow);
				var currentRow = Math.ceil((I.current.currentIndex+1) / I.current.settings.perRow);
				
				if (I.current.currentIndex<I.current.childrenCount-1 && (currentRow<lastRow)) {
					
					I.current.currentIndex += I.current.settings.perRow;
					if (I.current.currentIndex>=I.current.childrenCount)
						I.current.currentIndex = I.current.childrenCount-1;
					I.select();
				} else {
					I.current.settings.onMoveBeyondBottom();
				}
				
			break;
			case tvKey.KEY_LEFT:
				if (I.current.currentIndex > 0 ) {
					I.current.currentIndex--;
					I.select();
				} else {
					I.current.settings.onMoveBeyondLeft();
				}
			break;
			case tvKey.KEY_RIGHT:
				if (I.current.currentIndex < I.current.childrenCount-1 ) {
					I.current.currentIndex++;
					I.select();
				} else {
					I.current.settings.onMoveBeyondRight();
				}
			break;
			case tvKey.KEY_ENTER:
				I.current.settings.onEnter(I.current.currentIndex);
			break;
			case tvKey.KEY_RETURN:
				widgetAPI.blockNavigation(event);
				I.current.settings.onReturn();
			break;
			default:
				I.current.settings.onKey(event);
			break;
			}
		},
		onSelected:function(index) {
			
		},
		onEnter:function(index) {
			
		},
		onReturn:function(){
			
		},
		onKey:function(event) {
			
		},
		onMoveBeyondTop:function() {
			
		},
		onMoveBeyondBottom:function() {
			
		},
		onMoveBeyondLeft:function() {
			
		},
		onMoveBeyondRight:function() {
			
		}
	};
	
	
	var methods={
		init:function (options) {
			var settings = $.extend( {
		      perRow: 4,
		      selectClass:'selected',
		      index:0,
		      onSelected:I.onSelected,
		      onEnter:I.onEnter,
		      onReturn:I.onReturn,
		      onKey:I.onKey,
		      onMoveBeyondTop:I.onMoveBeyondTop,
		      onMoveBeyondBottom:I.onMoveBeyondBottom,
		      onMoveBeyondLeft:I.onMoveBeyondLeft,
		      onMoveBeyondRight:I.onMoveBeyondRight
		    }, options);
			
			
			
			var target = $(this[0]);
			var data = target.data('tvgrid');
			if (data)
				return target;
			var children = target.children('div');
			
			children.addClass('tvGridElement');
			var maxHeight=0;
			var maxWidth=0;
			
			var cnt=0;
			target.children('.tvGridElement').each(function(){
				maxHeight=Math.max(maxHeight, $(this).height());
				maxWidth=Math.max(maxWidth, $(this).width());
				$(this).addClass('tvGridElement-'+cnt);
				
				cnt++;
				if (cnt % settings.perRow==0) {
					$('<div style="clear:both"></div>').insertAfter($(this));
				}
			});
			if (cnt % settings.perRow!=0) {
				target.append($('<div style="clear:both"></div>'));
			}
			
			target.children('.tvGridElement').css({width:maxWidth, height:maxHeight, float:'left'});
			var id = target.attr('id');
			var anchor = $('<a href="javascript:void(0)" id="tvGridAnchor"></a>');
			anchor.keydown(I.keyHandler);
			target.append(anchor);
			target.data('tvgrid',id);
			I.data['data'+id]={
					currentIndex:settings.index,
					childrenCount:target.children('.tvGridElement').length,
					previous:settings.index,
					settings:settings,
					id:id,
			};
			
			return target;
		},
		focus:function() {
			$(this).children("#tvGridAnchor").focus();
			I.localInit(this);
			I.select();
			return this;
		},
		blur:function() {
			$(this).children(".tvGridElement").removeClass(I.current.settings.selectClass);
			$(this).children("#tvGridAnchor").blur();
			
			return this;
		},
		getIndex:function() {
			I.localInit(this);
			return I.current.currentIndex;
			
		},
		setIndex:function(index) {
			I.localInit(this);
			if (index<0 || index+1>I.current.childrenCount) {
				 $.error( 'tvGrid.setIndex('+index+') error: index out of bounds.');
			} else {
				I.current.currentIndex=index;
				I.select();
				
			}
			return this;
		},
		
	};
	
	$.fn.tvGrid = function(method) {
		 if ( methods[method] ) {
		      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      return methods.init.apply( this, arguments );
		    } else {
		    	
		      $.error( 'Method ' +  method + ' does not exist on jQuery.tvGrid' );
		    }
	
	};
})( jQuery );