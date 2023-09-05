/**
	Usage example:
	--------------
	var input_subst_1 = new window.__INPUT_SUBST(); // create new object
	input_subst_1.inputContainer = $('form_id'); // input id
	input_subst_1.inputForm = $('input_id'); // form id
	input_subst_1.defaultInputValue = 'default input text'; // default text
	input_subst_1.init();

	Styles
	-------
	.deftext {
		font-size: 1em !important;
		color: #999999 !important;
	}
 */

function __INPUT_SUBST() {

	var inputContainer = null;
	var inputForm = null;
	var defaultInputValue = null;

	var this_closure = this;

	this.init = function() {

		if(this_closure.is_object(this_closure.inputContainer)) {

			this_closure.inputContainer.addEvents({
				'focus' : function() {
					if (this_closure.defaultInputValue === $(this).value) {
						$(this).set('value', '');
						this_closure.colorize();
					}
				},
				'blur' : function() {
					if ('' === $(this).value) {
						$(this).set('value', this_closure.defaultInputValue);
						this_closure.colorize();
					}
				}
			});

			if(['', this_closure.defaultInputValue].contains(this_closure.inputContainer.get('value'))) {
				this_closure.inputContainer.set('value', this_closure.defaultInputValue);
				this_closure.colorize();
			}

			if(typeof(this_closure.inputForm)=='object') {
				this_closure.inputForm.addEvents({
					'submit' : function() {
						if (this_closure.defaultInputValue === this_closure.inputContainer.get('value')) {
							this_closure.inputContainer.set('value', '');
						}
					}
				});
				this_closure.inputContainer.setStyle('height', this_closure.inputContainer.getStyle('height'));
			}
		}
	},

	this.colorize = function() {

		if(this_closure.is_object(this_closure.inputContainer)) {

			var isDefLoginValue = this_closure.defaultInputValue==this_closure.inputContainer.get('value');

			if(isDefLoginValue) {
				this_closure.inputContainer.addClass('deftext');
				//this_closure.inputContainer.addClass('small');
				//this_closure.inputContainer.setStyle('color', '#999999');
			}
			else {
				this_closure.inputContainer.removeClass('deftext');
				//this_closure.inputContainer.removeClass('small');
				//this_closure.inputContainer.setStyle('color', '#333333');
			}
		}
	},

	this.is_object = function(object) {

		return typeof(object)=='object';
	}
}