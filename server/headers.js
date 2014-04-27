module.exports = {
	unwanted : [
	  	"X-GM-THRID",
	  	"X-Gmail-Labels",
	  	"Return-Path",
	  	"X-Google-DKIM-Signature",
	  	"Received",
	  	"Received-SPF",
	  	"Authentication-Results",
	  	"X-Received",
	  	"DKIM-Signature",
	  	"X-Received",
	  	"X-BeenThere",
	  	"X-Gm-Message-State",
	  	"Mime-Version",
	  	"Content-Transfer-Encoding",
	  	"X-Mailer",
	  	"Message-Id",
	  	"X-Original-Authentication-Results",
	  	"Precedence",
	  	"X-Google-Group-Id",
	  	"List-Post",
	  	"List-Help",
	  	"List-Archive",
	  	"List-Unsubscribe",
	  	"Content-Type",
	  	"References",
	  	"In-Reply-To"



  	],
  	keep : [
  		"X-Original-Sender",
  		"Subject",
  		"From",
  		"Sender",
  		"Mailing-list",
  		"Delivered-To",
  		"Date",
  		"Cc",
  		"To"



  	]
  };
