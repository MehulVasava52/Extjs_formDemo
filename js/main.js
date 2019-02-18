Ext.onReady(function () {
	/**
	 * Variable loginWindow contains window component with three forms.
	 */
	var loginWindow = new Ext.Window({
		renderTo: Ext.getBody(),
		autoheight: true,
		closeAction: 'hide',
		items: [{
			layout: 'card',
			xtype: 'container',
			ref: 'cardContainer',
			activeItem: 0,
			items: [getLoginForm(), getRegPanel()]
		}]
	}).show();

	/**
	 * Function getLoginForm will return login form component.
	 * @returns {Object} returns form component.
	 */
	function getLoginForm() {
		return {
			title: 'Login Form',
			xtype: 'form',
			ref: '../loginForm',
			monitorValid: true,
			height: 200,
			width: 350,
			defaults: {
				width: 200,
				anchor: '90%',
				msgTarget: 'under',
				allowBlank: false,
			},
			padding: 10,
			defaultType: 'textfield',
			items: [{
					fieldLabel: 'User Name',
					name: 'name'
				}, {
					fieldLabel: 'Password',
					name: 'password',
					inputType: 'password'
				}
			],
			buttons: [{
					text: 'sign up',
					handler: signupHandler,
					scope: this
				}, {
					text: 'Login',
					formBind: true,
					handler: function () {
						alert("successfully LoggedIn!");
						loginWindow.loginForm.getForm().reset(true);
					}
				}
			],
			labelWidth: 85,
			labelPad: 8,
		};
	}

	/**
	 * Function getRegPanel will return registration signup panel with card layout
	 * @returns {Object} returns panel component with card layout.
	 */
	function getRegPanel() {
		return {
			title: 'Registration',
			layout: 'card',
			ref: '../signUpCard',
			activeItem: 0,
			height: 450,
			width: 500,
			deferredRender: true,
			items: [getPersonalForm(), getProffesionalForm()],
			bbar: [{
					ref: '../movePrv',
					text: 'Back',
					formBind: true,
					scope: this,
					disabled: true,
					handler: prvHandler
				},
				'->',
				{
					ref: '../moveNxt',
					text: 'Next',
					formBind: true,
					scope: this,
					disabled: false,
					handler: nextHandler
				}
			],
		};
	}

	/**
	 * Function getPersonalForm will returns Personal details form component
	 * @returns {Object} returns form component
	 */
	function getPersonalForm() {
		return {
			xtype: 'form',
			layout: 'fit',
			ref: 'signUpStpOne',
			monitorValid: true,
			autoheight: true,
			defaults: {anchor: '100%'},
			padding: 10,
			items: [{
				xtype: 'fieldset',
				title: 'Personal',
				defaults: {msgTarget: 'under'},
				defaultType: 'textfield',
				autoheight: true,
				items: [{
					fieldLabel: 'Fname',
					allowBlank: false
				}, {
					fieldLabel: 'Lname',
					allowBlank: false
				}, {
					xtype: 'textarea',
					fieldLabel: 'Address',
					anchor: '90%',
					maxLength: 250,
					maxLengthText: 'Max 250 characters allowed',
				}, {
					xtype: 'numberfield',
					fieldLabel: 'Mobile no',
					minLength: 10,
					maxLength: 10,
					allowBlank: false,
					maxLengthText: 'Enter 10 digit mobile no.',
				}, {
					xtype: 'textfield',
					vtype: 'email',
					fieldLabel: 'Email',
					allowBlank: false,
					vtypeText: 'Enter valid email address',
				}, {
					xtype: 'radiogroup',
					fieldLabel: 'Gender',
					allowBlank: false,
					defaults: {
						xtype: 'radio',
						name: 'gender'
					},
					items: [{
						boxLabel: 'male',
						name: 'gender',
						checked: true
					}, {
						boxLabel: 'female',
					}, {
						xtype: 'radio',
						boxLabel: 'other'
					}]
				}, {
					xtype: 'datefield',
					allowBlank: false,
					fieldLabel: 'DOB'
				}]
			}]
		};
	}

	/**
	 * Function getProffesionalForm will return Professional details form component.
	 * @returns {Object} returns form component.
	 */
	function getProffesionalForm() {
		return {
			xtype: 'form',
			layout: 'fit',
			ref: 'signUpStpTwo',
			monitorValid: true,
			autoheight: true,
			padding: 10,
			items: [{
				xtype: 'fieldset',
				title: 'Professional',
				defaultType: 'textfield',
				defaults: { msgTarget: 'under' },
				autoheight: true,
				layout: 'form',
				items: [{
						xtype: 'checkboxgroup',
						fieldLabel: 'Skills',
						defaults: {
							xtype: 'checkbox'
						},
						items: [{
								boxLabel: 'Oops'
							},
							{
								boxLabel: 'data structure'
							},
							{
								boxLabel: 'Algorithms'
							}
						]
					},{
						fieldLabel: 'Occupation',
						allowBlank: false
					},{
						fieldLabel: 'Company',
						allowBlank: false
					},{
						fieldLabel: 'Work Email',
						vtype: 'email',
						allowBlank: false,
						vtypeText: 'Enter valid email address'
					},{
						fieldLabel: 'Office No',
						xtype: 'numberfield',
						allowBlank: false,
						maxLength: 10,
						minLength: 10,
						maxLengthText: 'Enter 10 digit mobile no.'
					},{
						xtype: 'textarea',
						fieldLabel: 'Work Address',
						anchor: '90%',
						maxLength: 250,
						maxLengthText: 'Max 250 characters allowed'
					}
				]
			}],
			buttons: [{
				formBind: true,
				text: 'submit',
				handler: submitHandler
			}]
		};
	}

	/**
	 * Function signupHandler is to show signup registration form. 
	 */
	function signupHandler() {
		var mainCardContainer = loginWindow.cardContainer.getLayout();
		mainCardContainer.setActiveItem(1);
		loginWindow.center();
	}

	/**
	 * Function prvHandler is handler for Back button on click.
	 * This will set active item as previous form in registration card panel in window and disable Back button.
	 * @param {Object} button : Back button object.
	 */
	function prvHandler(button) {
		var regCardPanel = button.findParentByType('panel').getLayout();
		var currntActive = regCardPanel.getActiveIndex();
		button.setDisabled(true);
		regCardPanel.setActiveItem(currntActive - 1);
	}

	/**
	 * Function nextHandler is handler for Next button on click.
	 *This will add form validation listener for stp1 form and enable/ disable next Button according to it. 
	 *Also it will set step2 form as active in card panel if step1 form is valid in signup forms.
	 *@param {Object} button : Next button object.
	 */
	function nextHandler(button) {
		var regCardPanel = button.findParentByType('panel').getLayout();
		var currActiveInd = regCardPanel.getActiveIndex();
		var prvBtn = loginWindow.signUpCard.movePrv;
		var stpOneLayout = loginWindow.signUpCard.signUpStpOne;
		var stpOneForm = stpOneLayout.getForm();

		stpOneLayout.on('clientvalidation', checkValidation, stpOneLayout);
		if (stpOneForm.isValid()) {
			regCardPanel.setActiveItem(currActiveInd + 1);
			prvBtn.setDisabled(false);
			button.setDisabled(true);
		}
	}

	/**
	 * Function checkValidation is handler for clientvalidation event.
	 * Which will enable or disable next and prev buttons by checking validations in signup step1 form in card layout.
	 */
	function checkValidation() {
		var stpOneForm = loginWindow.signUpCard.signUpStpOne.getForm();
		var nxtBtn = loginWindow.signUpCard.moveNxt;
		var prvBtn = loginWindow.signUpCard.movePrv;
		var formCardPanel = loginWindow.signUpCard.getLayout();
		var activeIndex = formCardPanel.getActiveIndex();
		var isFormOneActive = (activeIndex === 0);

		if (stpOneForm.isValid()) {
			if (isFormOneActive) {
				nxtBtn.setDisabled(false);
			}
		} else {
			nxtBtn.setDisabled(true);
			prvBtn.setDisabled(true);
		}
	}

	/**
	 * Function submitHandler is handler for on click of submit button.
	 * This will alert submit message, sync shadow of window on resize, center the window and call resetApp function. 
	 * And unregister form validation event from registration step1 form component.
	 */
	function submitHandler() {
		alert("Submit successfully!");
		var stpOneLayout = loginWindow.signUpCard.signUpStpOne;

		stpOneLayout.un('clientvalidation', checkValidation, stpOneLayout);
		resetApp();
		loginWindow.syncShadow(true);
		loginWindow.center();
	}

	/**
	 * Function resetApp contains function calls for resetting all forms and set cards to initial.
	 */
	function resetApp() {
		setCardToDefault();
		resetForms();
	}

	/**
	 * Function setCardToDefault will set all cards to its initial condition.
	 */
	function setCardToDefault() {
		var signUpCard = loginWindow.signUpCard.getLayout();
		var containerCard = loginWindow.cardContainer.getLayout();
		var nxtBtn = loginWindow.signUpCard.moveNxt;
		var prvBtn = loginWindow.signUpCard.movePrv;

		nxtBtn.setDisabled(false);
		prvBtn.setDisabled(true);
		containerCard.setActiveItem(0);
		signUpCard.setActiveItem(0);
	}

	/**
	 * Function resetForms will reset all forms. 
	 */
	function resetForms() {
		var loginForm = loginWindow.loginForm.getForm();
		var registerStpOne = loginWindow.signUpCard.signUpStpOne.getForm();
		var registerStpTwo = loginWindow.signUpCard.signUpStpTwo.getForm();

		loginForm.reset(true);
		registerStpOne.reset(true);
		registerStpTwo.reset(true);
	}

	/**
	 * Adding custom method getActiveIndex for card layout.
	 * @returns {Number} Currently active index in card.
	 */
	Ext.override(Ext.layout.CardLayout, {
		getActiveIndex: function () {
			return this.container.items.indexOf(this.activeItem);
		}
	});

});