const { setup, email, stripe, customerHistory, calendar } = e.exportedFunctions;

const { createProduct, createPrice, createPaymentLink } = stripe;
const { estimateApprover, invoiceApprover } = email;
const { saveEstimate, createTrigger, onEditTrigger, removeInitializeButton } =
  customerHistory;
const { createEstimateEvent, createServiceEvent } = calendar;

const onOpen = (e) => setup(false);

const myOwnOpen = (e) => {
  if (e.authMode === ScriptApp.AuthMode.FULL) {
    SpreadsheetApp.getActive().removeMenu('Scripts');
    setup(true);
  }
};

const saveEstimateButton = () => saveEstimate();
