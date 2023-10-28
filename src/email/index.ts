import { grabPaymentLink } from '../stripe';

const timeZone = Session.getScriptTimeZone();
const date = Utilities.formatDate(new Date(), timeZone, 'MM-dd-yyyy');

const estimateMessage = (
  { name, phone, address, total } = {
    name: '',
    phone: '',
    address: '',
    total: '',
  }
) => {
  return `<div
  style="font-family: Verdana, sans-serif; width: 50%; text-align; margin: auto"
>
  <div style="text-align: center">
    <img
      src="cid:banner"
      style="height: 84px; width: 400px; "
    />
  </div>
  <div style="text-align: center"><h4>Titan Tree Service Estimate</h4></div>

  <div style="text-align: center">CUSTOMER DETAILS</div>

  <h5 style="margin-bottom: 0.5rem">Date: ${date}</h5>

  <h5 style="margin-bottom: 0.5rem">Name: ${name}</h5>

  <h5 style="margin-bottom: 0.5rem">Phone: ${phone}</h5>

  <h5 style="margin-bottom: 0.5rem">Address: ${address}</h5>

  <h5 style="margin-bottom: 0.5rem">Service Pro: </h5>

  <div style="text-align: center">-------------------</div>
  <div style="text-align: center">ESTIMATE DETAILS</div>

  <h5 style="margin-bottom: 0.5rem;">1. Trimming</h5>
    <p style="font-size: .7rem;">Details: </p>
  <h5 style="margin-bottom: 0.5rem; margin-top: .5rem">2. Removal</h5>
    <p style="font-size: .7rem;">Details: </p> 
  <h5 style="margin-bottom: 0.5rem; margin-top: .5rem">3. Stump Removal</h5>
    <p style="font-size: .7rem;">Details: </p> 
  <h5 style="margin-bottom: 0.5rem; margin-top: .5rem">4. Repeat Services</h5>
    <p style="font-size: .7rem;">Details: </p> 
  <h5 style="margin-bottom: 0.2rem">Total Price: ${total}</h5>

  <h5 style="margin-bottom: 0.7rem; margin-top: 0">Unpaid:</h5>

  -Signature Hyperlink-

  <p style="font-size:.6rem; margin-top:.2rem"><i>Payment isn't due until after job completion for all jobs under $5000.</i></p>

  <p style="font-size:.6rem;"><i>**For safety, please keep all pets, children and yourself indoors at all times while the work listed above is being performed. To guarantee a complete clean up of   branches and twigs, please remove pet excrement and have tall 
  grass cut prior to our arrival. Please be aware that all stump grinding services may leave marks in the yard.**</i></p>

</div>`;
};

const invoiceMessage = ({
  name,
  phone,
  address,
  total,
  description,
}: {
  name: string;
  phone: string;
  address: string;
  total: number | string;
  description: string;
}) => {
  return `
<div
  style="font-family: Verdana, sans-serif; margin: auto"
>
  <div style="text-align: center">
    <img src="cid:banner" style="height: 84px; width: 400px" />
  </div>
  <div style="text-align: center"><h4>Your project is complete!</h4></div>

  <h5 style="margin-bottom: 3rem">Date: ${date}</h5>

  <div style="text-align: left; font-size: 1.1rem; "><u>Order Summary</u></div>

  <h5 style="margin-bottom: 0.2rem"><b>Customer</b></h5>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Name: ${name}</p>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Address: ${address}</p>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Phone: ${phone}</p>

  <h5 style="margin-bottom: 0.2rem"><b>Services</b></h5>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Trimming</p>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Removal</p>

  <p style="margin-bottom: 0.1rem; margin-top: .1rem; font-size: .8rem">Stump Removal</p>

  <h5 style="margin-bottom: 2rem; margin-top: 2rem;">Total Price: $${total}</h5>

  <h4 style="margin-bottom: 0.7rem; margin-top: 0">
    <u>Payment Types Accepted: </u>
  </h4>

  <div style="margin-bottom: 1.5rem">
    <p style="margin-bottom: .1rem; font-size: .8rem">1. Check.</p>
    <p style="margin-bottom: .1rem; margin-top: .1rem; font-size: .8rem">Pay to Order Of: <b>Titan Tree Service</b></p>
    <p style="margin-top: .1rem; font-size: .8rem">Address: <b>938 Mercury Cir., Lone Tree CO 80124</b></p>
  </div>

  <div style="margin-bottom: 1.5rem">
    <p style="margin-bottom: .5rem; font-size: .8rem">2. Venmo: <b>Caleb-Mackey</b></p>
  </div>

  <div style="margin-bottom: 1.5rem">
    <p style="margin-bottom: .5rem; font-size: .8rem">3. Cash.</p>
  </div>

  <div style="margin-bottom: 3rem">
    <p style="margin-bottom: .1rem; font-size: .8rem">4. Card.</h5>
    <p style="font-size: .8rem; margin-top: .1rem; margin-bottom: .1rem"><i>(We charge an additional 4% for card payments)</i></p>
    <p style="font-size: .8rem; margin-top: .1rem"><a href="${grabPaymentLink({
      description,
      price: Number(total),
    })}">Pay Here</a></p>
  </div>

  <p style="font-size: .8rem; margin-top: 0.5rem; text-align: center">
    Thank you for working with us! We look forward to working with you again in
    the future.
  </p>

  <p style="font-size: .8rem; text-align: left; margin-bottom: 0.5rem">
    If you would like to leave a review or recommendation, it helps us out
    greatly!
  </p>
  <p style="font-size: .8rem; text-align: left; margin-bottom: 0.5rem">
    <a href="https://g.page/r/Ccm6t2gEZvmVEB0/review"
      >Leave us a review on <b>Google</b></a
    >
  </p>

  <p style="font-size: .8rem; text-align: left; margin-bottom: 0.5rem">
    <a href="https://nextdoor.com/pages/titan-tree-service-lone-tree-co/"
      >Recommend us on <b>Nextdoor</b>
    </a>
  </p>
</div>
`;
};

// Scripts
const ui = SpreadsheetApp.getUi();

const EmailType = {
  ESTIMATE: 'ESTIMATE',
  INVOICE: 'INVOICE',
};

const EmailHeaderType = {
  [EmailType.ESTIMATE]: 'Tree Estimate',
  [EmailType.INVOICE]: 'Titan Tree Service Invoice',
};

const sendUser = ({ user, message, type }) => {
  // Id is in file url estimate:  https://drive.google.com/file/d/1f38L2YtW5ja0wQBdNhBe_dEDdgfxKXvY/view?usp=share_link,
  // invoice: https://drive.google.com/file/d/1fQVEJpxYj4Q1q1Fq2dUtBulNKvB7_1tS/view
  const img = DriveApp.getFileById(
    type === EmailType.INVOICE
      ? '1fQVEJpxYj4Q1q1Fq2dUtBulNKvB7_1tS'
      : '1f38L2YtW5ja0wQBdNhBe_dEDdgfxKXvY'
  )
    .getBlob()
    .setName('banner');

  GmailApp.createDraft(user.email, EmailHeaderType[type], 'message', {
    htmlBody: message,
    inlineImages: { banner: img },
  });
};

// Each button will be executed from different sheets with different data formats. Format user data here for message.
const userFormatter = ({
  data,
  type,
}): {
  name: string;
  phone: string;
  email: string;
  address: string;
  total: number | string;
  description?: string;
  row;
} => {
  switch (type) {
    case EmailType.INVOICE:
      const [row1, row2, row3, row4] = data;
      return {
        name: row1[1],
        phone: row3[1],
        email: row4[1],
        address: row2[1],
        total: row3[7],
        description: row3[5],
        row: row1,
      };
    case EmailType.ESTIMATE:
    default:
      const estimateRow = data[0];
      return {
        name: estimateRow[1],
        phone: estimateRow[3],
        email: estimateRow[2],
        address: estimateRow[4],
        total: estimateRow[10],
        row: estimateRow,
      };
  }
};

// Once draft is approved, the return function is called by the sheet button to draft an email.
const approvalGenerator =
  ({ type, message }) =>
  () => {
    const row = SpreadsheetApp.getActiveSheet().getActiveCell().getRow();
    const rowsToGrab = type === EmailType.ESTIMATE ? 1 : 4;
    const data = SpreadsheetApp.getActiveSheet()
      .getRange(row, 1, rowsToGrab, 11)
      .getValues();

    const user = userFormatter({ data, type });

    const Alert = {
      [EmailType.INVOICE]:
        'Create Invoice for' +
        user.name +
        ' (' +
        user.email +
        ')? Make sure you are on the Right Sheet! 3. CRM',
      [EmailType.ESTIMATE]:
        'Create Estimate for' +
        user.name +
        ' (' +
        user.email +
        ')? Make sure you are on the Right Sheet! 1. Email Info',
    };

    const res = ui.alert(Alert[type], ui.ButtonSet.YES_NO);

    if (res == ui.Button.YES) {
      switch (type) {
        case EmailType.INVOICE:
          sendUser({ user, message: message(user), type: EmailType.INVOICE });
          return;
        case EmailType.ESTIMATE:
          sendUser({ user, message: message(user), type: EmailType.ESTIMATE });
          return;
      }
    }
  };

export const estimateApprover = approvalGenerator({
  type: EmailType.ESTIMATE,
  message: estimateMessage,
});
export const invoiceApprover = approvalGenerator({
  type: EmailType.INVOICE,
  message: invoiceMessage,
});
