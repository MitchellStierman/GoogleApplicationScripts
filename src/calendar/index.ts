enum CalendarType {
  ESTIMATE,
  SERVICE,
}

const createEvent = (type: CalendarType) => () => {
  const row = SpreadsheetApp.getActiveSheet().getActiveCell().getRow();

  const [
    date,
    name,
    email,
    phone,
    address,
    estimateSent,
    EstimateSignature,
    serviceComplete,
    invoiceSent,
    review,
    price,
    jobDescription,
    estimateDate1,
    estimateDate2,
    serviceDate1,
    serviceDate2,
  ] = SpreadsheetApp.getActiveSheet().getRange(row, 1, 1, 17).getValues()[0];

  console.log(serviceDate1, serviceDate2);

  const eventTitle = `Service for ${name} at ${address}.`;
  const eventDescription = `Services: ${jobDescription}. `;

  let duration: Date;

  const date1 = type === CalendarType.ESTIMATE ? estimateDate1 : serviceDate1;
  const date2 = type === CalendarType.ESTIMATE ? estimateDate2 : serviceDate2;

  if (!!date2) {
    duration = date2;
  } else {
    duration = new Date(date1);
    duration.setHours((duration.getHours() + 1) % 23);
  }

  CalendarApp.getDefaultCalendar().createEvent(
    name,
    new Date(date1),
    new Date(duration),
    { location: address, description: eventDescription }
  );

  // event.setDescription(eventDescription);
};

export const createEstimateEvent = createEvent(CalendarType.ESTIMATE);
export const createServiceEvent = createEvent(CalendarType.SERVICE);
