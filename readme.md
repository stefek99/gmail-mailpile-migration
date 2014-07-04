# Current state

[![youtube](http://i.imgur.com/yxXOJ4P.png)](https://www.youtube.com/watch?v=UfeBVd12-SM)

# Gmail to mailpile migration

Exporting data form Gmail is officially supported:
* http://gmailblog.blogspot.in/2013/12/download-copy-of-your-gmail-and-google.html
* https://www.google.com/settings/takeout/
* https://www.google.com/settings/takeout/custom/gmail

### Inbox can weight 10+ GB

![mbox](http://i.imgur.com/0A5B83v.png)


### Inbox can contain 100k+ messages

![splited](http://i.imgur.com/PKIZLJE.png)

Simple ruby script **script1.rb** to parse ```mbox``` format and dump messages to individual files:
* https://support.google.com/accounts/answer/3024195?hl=en-GB#gmail
* http://en.wikipedia.org/wiki/Mbox
* http://tools.ietf.org/html/rfc4155
* *The exact character sequence of "From";*
* *a single Space character (0x20);*

### Mmost of the content is simply crap

![crap](http://i.imgur.com/cxtBEag.png)

(various headers and totally unused fields)

----

### When migrating to mailpile I would like to:
* keep history of most relevant contacts
* remove (archive) not relevant items
* inform all contacts about my new address
* keep gmail alive with autoresponder / redirect / forwarder
* [grey hat] use extracted addresses for marketing (aka spam) purposes

### How to determine 'most relevant' contact?
* emails sent / received (volume, ratio, frequency)
* lenght of relationship 
* keywords: unsubscribe, no-reply, 
* keywords 'call to action': buy, purchase, learn more
* [minor / noise] time to answer
* [minor / noise] time of the day

### There is a product that supposedly offers some stats:
* https://www.google.co.uk/search?q=gmail+stats
* http://gmailmeter.com/
* Mentioned on the official blog: http://gmailblog.blogspot.co.uk/2012/04/know-your-gmail-stats-using-gmail-meter.html
* *To clear up some confusion, Gmail Meter is not developed by Google.  Although we're highlighting it here, as with any third-party scripts, we can't guarantee security.*
* I don't like excessive permissions

![permissions](http://i.imgur.com/WEWfla2.png)

### My feeling:
* current laptops are sold with SSD, many of them have as little as 128GB of storage (take for instance MacBookAir)
* 10GB of .mbox download plus 10GB of individual messages can be a 'no-go' (fleaky connection)
* it can be done on Digital Ocean / Amazon EC2 (1 year grace period)
* but then logging to Google Account can require 2-step auth, not really feasible on a command line (cannot wget the 10GB .mbox)
* not worrying about the downloading workflow for now, I have messaged sitting on my computer, now it's my job to implement some clever rules
* inspiration: http://sblam.com/ by https://github.com/pornel **"Large black list of words and links based on auto-learning bayesian filter"**
* I'd really love to learn how to employ machines to do the heavy lifting rather than me tweaking list of keywords.

----
I tried using http://gmvault.org/ in parallel but never finished:
* issues with crashing
* issues with auth
* issues with 

![gmvault](http://i.imgur.com/8LV7fPb.png)

Since there is official and supported method of downloading inbox there is no need to use gmvault.

---

**So yes, I think it would be fun to know more about my inbox. Since 2006: 10GB, 100k+, forwards, accounts, imports, filters, labels.**
