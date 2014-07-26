/**
 * This file contains the main functionality that will be loaded for the theme
 * on many pages in the admin section. Author: Pexeto http://pexeto.com/
 */
(function($) {

	/**
	 * Getter and setter function for text values - checks the type of the element and if the element contains
	 * embedded text (such as a DIV element), gets/sets its inner text. If the element sets contains its value
	 * as a "value" attribute (such as an INPUT element), gets/sets its value.
	 */
	$.fn.pexval = function() {
		var elem = $(this),
		tagname=elem.get(0).tagName.toLowerCase(),
		value=arguments.length?arguments[0]:false;
		
		/**
		 * Gets the value.
		 */
		function pexGetValue(){
			if(tagname==='input'||tagname==='select'){
				return elem.val();
			}else{
				return elem.text();
			}
		}
		
		/**
		 * Sets the value.
		 */
		function pexSetValue(value){
			if(tagname==='input'||tagname==='select'){
				return elem.val(value)
			}else{
				return elem.text(value);
			}
		}
		
		if(value===false){
			//no arguments have been passed, call the getter function
			return pexGetValue();
		}else{
			//there is at least one argument passed, call the setter function
			return pexSetValue(value);
		}
	};

	pexetoPageOptions = {

		/**
		 * Inits all the functions needed.
		 */
		init : function() {
			this.setColorPickerFunc();
			this.loadUploadFunctionality();
		},

		/**
		 * Loads the color picker functionality to all the inputs with class
		 * "color".
		 */
		setColorPickerFunc : function() {
			// set the colorpciker to be opened when the input has been clicked
			var colorInputs = $('input.color');
			if (colorInputs.length) {
				colorInputs.ColorPicker( {
					onSubmit : function(hsb, hex, rgb, el) {
						$(el).val('#' + hex);
						$(el).ColorPickerHide();
					},
					onBeforeShow : function() {
						$(this).ColorPickerSetColor(this.value);
					}
				});
			}

		},

		/**
		 * Loads the Media Library functionality to an element when it is
		 * clicked.
		 */
		loadMediaImage : function($input) {
			window.send_to_editor = function(html) {
				imgurl = $("img", html).attr("src");
				$input.val(imgurl);
				tb_remove();
			}
			tb_show('Add image from Media Library',
					"media-upload.php?type=image&TB_iframe=1");
		},

		/**
		 * Calls the Upload functionality. Requirements: - button with class
		 * "pexeto-upload-btn" - input field sibling to the button with class
		 * "pexeto-upload"
		 */
		loadUploadFunctionality : function() {
			$('.pexeto-upload-btn').each(function() {
				pexetoPageOptions.loadUploader($(this));
			});
		},

		/**
		 * Loads the upload functionality to an element. Requirements: - input
		 * field sibling to the element with class "pexeto-upload"
		 * 
		 * @param element
		 *            the button element whose clicking event will trigger this
		 *            functionality
		 */
		loadUploader : function(element) {
			var button = element, interval, btntext, i, textContainer;
			new AjaxUpload(button, {
				action : PEXETO.uploadUrl,
				name : 'pexetofile',
				onSubmit : function(file, ext) {
					// change button text, when user selects file

					textContainer=element.find('span').length?element.find('span:first'):element;
					btntext = textContainer.pexval();
					
					// If you want to allow uploading only 1 file at time,
					// you can disable upload button
					this.disable();

					// Uploding -> Uploading. -> Uploading...
					interval = window.setInterval(function() {
						if (++i <= 3) {
							textContainer.pexval(textContainer.pexval() + '.');
						} else {
							textContainer.pexval(btntext);
							i = 0;
						}
					}, 200);
				},
				onComplete : function(file, response) {
					imgUrl = pexetoUploadsUrl + '/' + response;
					button.siblings('input.pexeto-upload:first').attr('value',
							imgUrl);

					textContainer.pexval(btntext);

					window.clearInterval(interval);

					// enable upload button
					this.enable();
				}
			});
		}
	};
})(jQuery);

jQuery(function() {
	pexetoPageOptions.init();
});
