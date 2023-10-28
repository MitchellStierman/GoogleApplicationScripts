//NPM Packages

//OUR EXPORTS
import { createProduct, createPrice, createPaymentLink } from './stripe';
import { doGet, include, processForm } from './form-to-sheet';
import { estimateApprover, invoiceApprover } from './email';
import { createEstimateEvent, createServiceEvent } from './calendar';
import {
  saveEstimate,
  createTrigger,
  onEditTrigger,
  removeInitializeButton,
} from './customer-history';

export const createMenuButtons = (noInitialize: boolean) => {
  if (!noInitialize) {
    SpreadsheetApp.getUi()
      .createMenu('Scripts')
      .addItem('Draft Estimate', 'estimateApprover')
      .addItem('Draft Invoice', 'invoiceApprover')
      .addItem('Create Estimate Event', 'createEstimateEvent')
      .addItem('Create Service Event', 'createServiceEvent')
      .addItem('Initialize', 'createTrigger')
      .addToUi();
  } else {
    SpreadsheetApp.getUi()
      .createMenu('Scripts')
      .addItem('Draft Estimate', 'estimateApprover')
      .addItem('Draft Invoice', 'invoiceApprover')
      .addItem('Create Estimate Event', 'createEstimateEvent')
      .addItem('Create Service Event', 'createServiceEvent')
      .addToUi();
  }
};
export const exportedFunctions = {
  setup: (noInitialize = false) => createMenuButtons(noInitialize),
  stripe: {
    createProduct,
    createPrice,
    createPaymentLink,
  },
  formToSheet: {
    doGet,
    include,
    processForm,
  },
  email: {
    estimateApprover,
    invoiceApprover,
  },
  customerHistory: {
    saveEstimate,
    createTrigger,
    onEditTrigger,
    removeInitializeButton,
  },
  calendar: {
    createEstimateEvent,
    createServiceEvent,
  },
};
