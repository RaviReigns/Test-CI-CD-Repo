trigger Accountemail on Account (after update) {
  /*  
    // Get the recipient email address
    String toAddress = 'tejareddy1456@gmail.com';
    
    String body = '<table>'
                +'<tr><td>Dear Supplier,</td></tr><br><br><br>'
                +'<tr><td>We are officially notifying you that we send you a new purchase order with the number  Attached you can find the PDF document.</td></tr><br>'
                +'<tr><td>Please notify us immediately if you are not able to read the attached PDF file.</td></tr><br>' 
                +'<tr><td>Mention our purchase order number in the subject line for all your communication related to this order.</td></tr><br>' 
                +'<tr><td>Delivery Expected: </td></tr>'
                +'<tr><td>Enduser: </td></tr><br>'
                +'<tr><td>We kindly ask you to send us </td></tr>'
                +'<tr><td>- Technical questions/information to sales.in@ipetronik.com </td></tr>'
                +'<tr><td>- order confirmation to sales.in@ipetronik.com and akshata.ramanathan@ipetronik.com </td></tr>'
                +'<tr><td>- Invoice to accounting.in@ipetronik.com and Mohan.Sreekantaiah@ipetronik.com </td></tr><br><br>'
                +'<tr><td>Thanks & Regards</td></tr>'
                +'<tr><td>Sales Team</td></tr>'
                +'<tr><td>IPETRONIK India Private Limited  </td></tr>'
                +'<tr><td>No. 20, 6th Floor, Unit No. 603 </td></tr>'
                +'<tr><td>Brigade Rubix Building, </td></tr>'
                +'<tr><td>Watch Factory Road </td></tr>'
                +'<tr><td>HMT Main Road, Yeshwanthpur  </td></tr>'
                +'<tr><td>Bangalore 560013 </td></tr>'
                +'<tr><td>Email: Sales.in@ipetronik.com  </td></tr>'
                +'<tr><td>Landline: +91 80 4122 2271  </td></tr>'
                +'<tr><td>Mobile: +91 88844 03481  </td></tr>'
                +'</table>';
    
    // Create the email object and set its properties
    Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
    email.setToAddresses(new String[] {toAddress});
    email.setSubject('New Account Created');
    email.setHtmlBody(body);
    
    // Send the email
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
    */
}