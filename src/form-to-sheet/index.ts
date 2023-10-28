export const doGet = (request) => {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

export const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

export const processForm = (formObject) => {
  const URL =
    "https://docs.google.com/spreadsheets/d/16WnQ9MEmcUzvDVn14BZY9om1Mw4hXkolbhFWuDMgTXE/edit";
  const ss = SpreadsheetApp.openByUrl(URL);
  const currentDate = new Date();
  const date = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  appendLeadsSheet(formObject, ss, "Master Leads", date);
  appendEmailSheet(formObject, ss, "1. Email Info", date);
};

const appendLeadsSheet = (formObject, ss, sheet, date) => {
  const ws = ss.getSheetByName(sheet);
  ws.appendRow([
    date,
    formObject.first_name,
    formObject.last_name,
    formObject.phone,
    formObject.email,
    formObject.street_address,
    formObject.city,
    formObject.state,
    formObject.zipcode,
    formObject.service,
  ]);
};

const appendEmailSheet = (formObject, ss, sheet, date) => {
  const sh = ss.getSheetByName(sheet);
  const name = `${formObject.first_name} ${formObject.last_name}`;
  const address = `${formObject.street_address} ${formObject.city} ${formObject.state} ${formObject.zipcode}`;
  const columnToCheck = sh.getRange("A:A").getValues();
  const lastRow = getLastRowSpecial(columnToCheck);
  console.log(lastRow + 1);
  sh.getRange(lastRow + 1, 1, 1, 5).setValues([
    [date, name, formObject.email, formObject.phone, address],
  ]);
};

const getLastRowSpecial = (range) => {
  let rowNum = 0;
  let blank = false;
  for (var row = 0; row < range.length; row++) {
    if (range[row][0] === "" && !blank) {
      rowNum = row;
      blank = true;
    } else if (range[row][0] !== "") {
      blank = false;
    }
  }
  return rowNum;
};
