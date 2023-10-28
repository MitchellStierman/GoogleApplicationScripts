import { SHEET_CONST } from './constants';
import { createMenuButtons } from '../app';
const ui = SpreadsheetApp.getUi();
const createUiAlert = () => {
  const alert =
    'Save estimate data in CRM Residential. Note that all cells here will be cleared.';
  return ui.alert(alert, ui.ButtonSet.YES_NO);
};

const searchCustomerInfo = (custEmail, searchCRM) => {
  const custData: string[] = [];
  let inCRM: boolean = false;
  let foundIndex: number = 0;
  let inInfo: boolean = false;

  if (searchCRM) {
    const searchSheet = SpreadsheetApp.openByUrl(
      SHEET_CONST.URL
    ).getSheetByName(SHEET_CONST.CRM);
    const numCustomers = new Array((searchSheet.getLastRow() - 1) / 4).fill(0);
    const data = searchSheet.getDataRange().getValues();
    numCustomers.forEach((value, customer) => {
      const index = (customer + 1) * 4;
      if (data[index][1] === custEmail) {
        inCRM = true;
        custData.push(data[index - 3][1]);
        custData.push(data[index - 2][1]);
        custData.push(data[index - 1][1]);
        foundIndex = index;
      }
    });
    return { inCRM, custData, index: foundIndex };
  } else {
    const searchSheet = SpreadsheetApp.openByUrl(
      SHEET_CONST.URL
    ).getSheetByName(SHEET_CONST.EMAIL_INFO);
    const numCustomers = new Array(searchSheet.getLastRow()).fill(0);
    const data = searchSheet.getDataRange().getValues();
    numCustomers.forEach((value, index) => {
      if (data[index][2] === custEmail) {
        inInfo = true;
        custData.push(data[index][1]);
        custData.push(data[index][4]);
        custData.push(data[index][3]);
      }
    });
    return { inInfo, custData };
  }
};

const searchCustomers = (custEmail) => {
  const emailSheetSearch = searchCustomerInfo(custEmail, false);
  if (emailSheetSearch.inInfo) {
    return emailSheetSearch.custData;
  }
};

export const createTrigger = () => {
  editTrigger();
  openTrigger();
  SpreadsheetApp.getActive().removeMenu('Scripts');
  createMenuButtons(true);
};

const openTrigger = () => {
  ScriptApp.newTrigger('myOwnOpen')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onOpen()
    .create();
};

const editTrigger = () => {
  ScriptApp.newTrigger('onEditTrigger')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
};

export const onEditTrigger = (data) => {
  if (
    data.range.getColumn() === 3 &&
    data.range.getRow() === 2 &&
    !(data.value === undefined)
  ) {
    const custData = searchCustomers(data.value);
    if (custData !== undefined) {
      const updateSheet = SpreadsheetApp.openByUrl(
        SHEET_CONST.URL
      ).getSheetByName(SHEET_CONST.ESTIMATE);
      updateSheet
        .getRange(3, 3, 3, 1)
        .setValues([[custData[0]], [custData[1]], [custData[2]]]);
    }
  }
};

export const removeInitializeButton = () => {
  SpreadsheetApp.getActiveSpreadsheet().removeMenu('Initialize');
};

const getData = (sheet) => {
  const rowCustomer = [3, 4, 5, 6];
  const rowPrice = [10, 14, 18, 22, 24, 25];
  const rowService = [8, 12, 16, 20];
  let data = [];

  rowCustomer.forEach((row, index) =>
    data.push(sheet.getRange(rowCustomer[index], 3).getValue())
  );

  rowPrice.forEach((row, index) =>
    data.push(sheet.getRange(rowPrice[index], 2).getValue())
  );

  rowService.forEach((row, index) =>
    data.push(sheet.getRange(rowService[index], 3).getValue())
  );

  return data;
};

const getDate = () => {
  const currentDate = new Date();
  `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  return currentDate;
};

const formatServices = (data) => {
  const services = `${getDate()} $${data[4]} ${data[10]} / $${data[5]} ${
    data[11]
  } / $${data[6]} ${data[12]} / $${data[7]} ${data[13]}`;
  return services;
};

const formatPrice = (data) => {
  const price = `${getDate()} Total: $${data[8]} Discount: $${data[9]}`;
  return price;
};

const saveNewCustomer = (data) => {
  const saveSheet = SpreadsheetApp.openByUrl(SHEET_CONST.URL).getSheetByName(
    SHEET_CONST.CRM
  );
  const email = SpreadsheetApp.getActiveSheet().getRange(2, 3).getValue();
  const date = getDate();
  const boilerPlate = [
    'Name',
    'Date Acquired',
    'Date',
    'Receipt',
    'Address',
    'Lead Gen Source',
    'Salesman',
    'Services Performed',
    'Review',
    'Phone',
    'Services Quoted',
    'Unpaid Total',
    'Referral',
    'Email',
    'Res/Com',
    'Price',
    'Paid Total',
  ];

  const services = formatServices(data);
  const price = formatPrice(data);

  saveSheet.appendRow([
    boilerPlate[0],
    data[0],
    boilerPlate[1],
    '',
    boilerPlate[2],
    date,
    boilerPlate[2],
    '',
    boilerPlate[3],
    '',
  ]);

  const lastRow = saveSheet.getLastRow();
  saveSheet
    .getRange(lastRow + 1, 1, 3, 26)
    .activate()
    .shiftRowGroupDepth(1);

  saveSheet.appendRow([
    boilerPlate[4],
    data[1],
    boilerPlate[5],
    '',
    boilerPlate[6],
    data[3],
    boilerPlate[7],
    '',
    boilerPlate[8],
    '',
  ]);

  saveSheet.appendRow([
    boilerPlate[9],
    data[2],
    boilerPlate[6],
    '',
    boilerPlate[10],
    services,
    boilerPlate[11],
    data[8],
    boilerPlate[12],
    '',
  ]);

  saveSheet.appendRow([
    boilerPlate[13],
    email,
    boilerPlate[14],
    '',
    boilerPlate[15],
    price,
    boilerPlate[16],
    '',
    boilerPlate[17],
    '',
  ]);

  saveSheet.getRange(lastRow + 1, 1, 3, 26).collapseGroups();
};

const updateCustomer = (data, index) => {
  const saveSheet = SpreadsheetApp.openByUrl(SHEET_CONST.URL).getSheetByName(
    SHEET_CONST.CRM
  );
  const date = getDate();
  const row = index - 2;
  const services = formatServices(data);
  const price = formatPrice(data);
  const oldData = saveSheet.getRange(row, 2, 4, 7).getValues();
  oldData[1][4] = data[3];
  oldData[2][4] += '\n' + services;
  oldData[3][4] += '\n' + price;
  oldData[2][6] += data[8];
  saveSheet.getRange(row, 2, 4, 7).setValues(oldData).collapseGroups();
};

const saveDataThenClear = (sheet) => {
  const email = SpreadsheetApp.getActiveSheet().getRange(2, 3).getValue();
  const crm = searchCustomerInfo(email, true);
  console.log(searchCustomerInfo(email, true));
  if (crm.inCRM) {
    updateCustomer(getData(sheet), crm.index);
  } else {
    saveNewCustomer(getData(sheet));
  }
  // row, column, num rows, num columns
  sheet.getRange(2, 2, 25, 3).clearContent();
};
export const saveEstimate = () => {
  const sheet = SpreadsheetApp.getActiveSheet();
  const res = createUiAlert();

  if (res == ui.Button.YES) {
    saveDataThenClear(sheet);
  }
};
