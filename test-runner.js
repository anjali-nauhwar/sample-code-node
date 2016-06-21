'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var assert = require('chai').assert;

var PaymentTransactionsModule = require('./PaymentTransactions');
var RecurringBillingModule = require('./RecurringBilling');
var TransactionReportingModule = require('./TransactionReporting');
var VisaCheckoutModule = require('./VisaCheckout');
var PaypalExpressCheckoutModule = require('./PaypalExpressCheckout');
var ApplePayTransactionsModule = require('./ApplePayTransactions');
var CustomerProfilesModule = require('./CustomerProfiles');

class TestRunner {
	validateResponse(response){
		if(response == null){
			return false;
		}

		if(response.getMessages().getResultCode() != ApiContracts.MessageTypeEnum.OK){
			return false;
		}

		return true;
	}

	authorizeCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(validateFunctionCallback);
	}

	chargeCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.chargeCreditCard(validateFunctionCallback);
	}

	capturePreviouslyAuthorizedAmount(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.capturePreviouslyAuthorizedAmount(response.getTransactionResponse().getTransId(), 
					validateFunctionCallback);
		});
	}

	captureFundsAuthorizedThroughAnotherChannel(validateFunctionCallback){
		PaymentTransactionsModule.captureFundsAuthorizedThroughAnotherChannel(validateFunctionCallback);
	}

	refundTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.capturePreviouslyAuthorizedAmount(response.getTransactionResponse().getTransId(),
				function(captureResponse){
					PaymentTransactionsModule.refundTransaction(captureResponse.getTransactionResponse().getTransId(), validateFunctionCallback);
				});
		});
	}

	voidTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.voidTransaction(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	updateSplitTenderGroup(validateFunctionCallback){
		PaymentTransactionsModule.updateSplitTenderGroup(validateFunctionCallback);
	}

	debitBankAccount(validateFunctionCallback){
		PaymentTransactionsModule.debitBankAccount(validateFunctionCallback);
	}

	creditBankAccount(validateFunctionCallback){
		PaymentTransactionsModule.debitBankAccount(function(response){
			PaymentTransactionsModule.creditBankAccount(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	//TODO
	chargeCustomerProfile(validateFunctionCallback){
		PaymentTransactionsModule.chargeCustomerProfile(validateFunctionCallback);
	}

	chargeTokenizedCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.chargeTokenizedCreditCard(validateFunctionCallback);
	}

	cancelSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.cancelSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	//TODO
	createSubscriptionFromCustomerProfile(validateFunctionCallback){
		RecurringBillingModule.createSubscriptionFromCustomerProfile(validateFunctionCallback);
	}

	createSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(validateFunctionCallback);
	}

	getListOfSubscription(validateFunctionCallback){
		RecurringBillingModule.getListOfSubscription(validateFunctionCallback);
	}

	getSubscriptionStatus(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.getSubscriptionStatus(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	getSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.getSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	updateSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.updateSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	getBatchStatistics(validateFunctionCallback){
		TransactionReportingModule.getBatchStatistics('4594221', validateFunctionCallback);
	}

	getSettledBatchList(validateFunctionCallback){
		TransactionReportingModule.getSettledBatchList(validateFunctionCallback);
	}

	getTransactionDetails(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			TransactionReportingModule.getTransactionDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getTransactionList(validateFunctionCallback){
		TransactionReportingModule.getTransactionList('4594221', validateFunctionCallback);
	}

	getUnsettledTransactionList(validateFunctionCallback){
		TransactionReportingModule.getUnsettledTransactionList(validateFunctionCallback);
	}

	createVisaCheckoutTransaction(validateFunctionCallback){
		VisaCheckoutModule.createVisaCheckoutTransaction(validateFunctionCallback);
	}

	decryptVisaCheckoutData(validateFunctionCallback){
		VisaCheckoutModule.decryptVisaCheckoutData(validateFunctionCallback);
	}

	authorizationOnly(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationOnly(validateFunctionCallback);
	}

	authorizationAndCapture(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(validateFunctionCallback);
	}

	authorizationOnlyContinued(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationOnly(function(response){
			PaypalExpressCheckoutModule.authorizationOnlyContinued(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	authorizationAndCaptureContinue(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(function(response){
			PaypalExpressCheckoutModule.authorizationAndCaptureContinue(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	priorAuthorizationCapture(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(function(response){
			PaypalExpressCheckoutModule.priorAuthorizationCapture(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	paypalVoid(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(function(response){
			PaypalExpressCheckoutModule.paypalVoid(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getDetails(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(function(response){
			PaypalExpressCheckoutModule.getDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	credit(validateFunctionCallback){
		PaypalExpressCheckoutModule.authorizationAndCapture(function(response){
			PaypalExpressCheckoutModule.credit(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	createApplePayTransaction(validateFunctionCallback){
		ApplePayTransactionsModule.createApplePayTransaction(validateFunctionCallback);
	}

	createCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(validateFunctionCallback);
	}

	createCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	createCustomerProfileFromTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			CustomerProfilesModule.createCustomerProfileFromTransaction(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	getCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.getCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	createCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	deleteCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.deleteCustomerPaymentProfile(paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	deleteCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.deleteCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	deleteCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.deleteCustomerShippingAddress(shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}

	getCustomerProfileIds(validateFunctionCallback){
		CustomerProfilesModule.getCustomerProfileIds(validateFunctionCallback);
	}

	getCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.getCustomerShippingAddress(shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}

	getHostedProfilePage(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getHostedProfilePage(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	updateCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.updateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	updateCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.updateCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	updateCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.updateCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}

	validateCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.validateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	callTestMethod(testMethodName, validateFunctionCallback){
		return this[testMethodName](validateFunctionCallback);
	}

	testAllSamples(){
		var lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('./list_of_sample_codes.txt')
		});

		var testRunnerObject = this;

		lineReader.on('line', function (line) {
			var sample = line.split(',');
			var apiName = sample[0];
			var shouldApiRun = sample[1].trim()[0];

			if(shouldApiRun == '1'){
				console.log('Running : ' + apiName);
				testRunnerObject.callTestMethod(apiName, function(response) {
					assert.isTrue(testRunnerObject.validateResponse(response));
					/*
					if(!testRunnerObject.validateResponse(response)){
						console.log('Error in running ' + apiName + '. Stopped test runner.');
						return;
					}
					*/
				});
			}
		});
	}
}

var testRunner  = new TestRunner();
testRunner.testAllSamples();
