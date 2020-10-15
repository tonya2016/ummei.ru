(function ($, window) {

    var blend = $.fn.blend = function (speed, callback) {
		var $this = this,
		background = 'background',
		padding = 'padding',
		properties = [
		    background + 'Color',
		    background + 'Image',
		    background + 'Repeat',
		    background + 'Attachment',
		    background + 'Position', // Standards browsers
		    background + 'PositionX', // IE only
		    background + 'PositionY', // IE only
			padding + 'Top',
			padding + 'Left',
			padding + 'Right',
			padding + 'Bottom',
			'width',
			'height'
		];
		
		speed = speed || $.fn.blend.speed;
		callback = callback || $.fn.blend.callback;
		
		// 1. Check to see if the jQuery object contains elements.
		// 2. Check to see if the effect has already been applied
		if ($this[0] && !$this.is('.jQblend')) {
            
			$this.each(function () {
                var
                layer = '<span style="position:absolute;top:0;left:0;display:block"/>',
                content = $(layer)[0],
                hover = $(layer)[0],
                base = this,
                style = base.currentStyle || window.getComputedStyle(base, null),
                property,
                i;
				
				if ($(base).css('position') !== 'absolute') {
					base.style.position = 'relative';
				}
				
				for(i = 0; property = properties[i]; i++){
                    if (property in style) {
						hover.style[property] = content.style[property] = style[property];
					}
				}
				
				content.style.backgroundImage = content.style.backgroundColor = '';
				
				$(base)
                .wrapInner(content)
                .addClass('hover jQblend')
                .prepend(hover)
                .hover(function (e) {
                    $(hover).stop().fadeTo(speed, 0, function () {
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    });
                }, function (e) {
                    $(hover).stop().fadeTo(speed, 1);
                });
			});
		}
		
		return $this;
	};
	
	blend.speed = 350;
	blend.callback = false;
	
}(jQuery, this));
