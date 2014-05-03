var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser(),
    fs = require("fs");

mailparser.on("end", function(mail_object){
    console.log("Subject:", mail_object.subject);
});

fs.createReadStream("../mail/0000009").pipe(mailparser);