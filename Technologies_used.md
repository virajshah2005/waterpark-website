Technologies explain in this file are : * HTML * , * CSS * , * MONGO DB *,
                                        * JAVASCRIPT *, * NODE JS *, * EXPRESS JS *,
                                        * NODEMON *, * NODE MAILER *, * RAZORPAY * 

*________________________________________________________________________________HTML______________________________________________________________________________________*

HTML is the standard markup language for creating Web pages.

What is HTML?
HTML stands for Hyper Text Markup Language
HTML is the standard markup language for creating Web pages
HTML describes the structure of a Web page
HTML consists of a series of elements
HTML elements tell the browser how to display the content
HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.

Example Explained:
The <!DOCTYPE html> declaration defines that this document is an HTML5 document
The <html> element is the root element of an HTML page
The <head> element contains meta information about the HTML page
The <title> element specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab)
The <body> element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
The <h1> element defines a large heading
The <p> element defines a paragraph
  
What is an HTML Element?
An HTML element is defined by a start tag, some content, and an end tag:
<tagname> Content goes here... </tagname>
  
The HTML element is everything from the start tag to the end tag:
<h1>My First Heading</h1>
<p>My first paragraph.</p>
  
Web Browsers:
The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly.
A browser does not display the HTML tags, but uses them to determine how to display the document.

HTML History
Since the early days of the World Wide Web, there have been many versions of HTML:

Year	Version
1989	Tim Berners-Lee invented www
1991	Tim Berners-Lee invented HTML
1993	Dave Raggett drafted HTML+
1995	HTML Working Group defined HTML 2.0
1997	W3C Recommendation: HTML 3.2
1999	W3C Recommendation: HTML 4.01
2000	W3C Recommendation: XHTML 1.0
2008	WHATWG HTML5 First Public Draft
2012	WHATWG HTML5 Living Standard
2014	W3C Recommendation: HTML5
2016	W3C Candidate Recommendation: HTML 5.1
2017	W3C Recommendation: HTML5.1 2nd Edition
2017	W3C Recommendation: HTML5.2
  
 Reference link: https://www.w3schools.com/html/
  
  
*__________________________________________________________________________CSS_____________________________________________________________________________________________*
  
CSS Introduction:
CSS is the language we use to style a Web page.

What is CSS?
CSS stands for Cascading Style Sheets
CSS describes how HTML elements are to be displayed on screen, paper, or in other media
CSS saves a lot of work. It can control the layout of multiple web pages all at once
External stylesheets are stored in CSS files
  
Why Use CSS?
CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.

CSS Solved a Big Problem
HTML was NEVER intended to contain tags for formatting a web page!

HTML was created to describe the content of a web page, like:

<h1>This is a heading</h1>

<p>This is a paragraph.</p>

When tags like <font>, and color attributes were added to the HTML 3.2 specification, it started a nightmare for web developers.
Development of large websites, where fonts and color information were added to every single page, became a long and expensive process.
To solve this problem, the World Wide Web Consortium (W3C) created CSS.
CSS removed the style formatting from the HTML page!

CSS Saves a Lot of Work!
The style definitions are normally saved in external .css files.
With an external stylesheet file, you can change the look of an entire website by changing just one file!

 Reference link: https://www.w3schools.com/css/css_intro.asp

  
*_________________________________________________________________________MONGO DB_________________________________________________________________________________________*
  
MongoDB is a document database. It stores data in a type of JSON format called BSON.

If you are unfamiliar with JSON, check out our JSON tutorial.

A record in MongoDB is a document, which is a data structure composed of key value pairs similar to the structure of JSON objects.
  
A MongoDB Document
Records in a MongoDB database are called documents, and the field values may include numbers, strings, booleans, arrays, or even nested documents.

Learning by Examples
Our "Show MongoDB" tool makes it easy to demonstrate MongoDB. It shows both the code and the result.

Example
Find all documents that have a category of "news".

db.posts.find( {category: "News"} )

Reference link: https://www.w3schools.com/mongodb/
  
  
*_________________________________________________________________________JAVASCRIPT______________________________________________________________________________________*


JavaScript Tutorial
JavaScript is the world's most popular programming language.

JavaScript is the programming language of the Web.

JavaScript is easy to learn.

This tutorial will teach you JavaScript from basic to advanced.
 
 Why Study JavaScript?
JavaScript is one of the 3 languages all web developers must learn:

   1. HTML to define the content of web pages

   2. CSS to specify the layout of web pages

   3. JavaScript to program the behavior of web pages

This tutorial covers every version of JavaScript:

The Original JavaScript ES1 ES2 ES3 (1997-1999)
The First Main Revision ES5 (2009)
The Second Revision ES6 (2015)
All Yearly Additions (2016, 2017, 2018, 2019, 2020)
  
Reference link: https://www.w3schools.com/js/DEFAULT.asp
  
*_________________________________________________________________________NODE JS______________________________________________________________________________________*
  
 
Node.js Tutorial
Node.js is an open source server environment.

Node.js allows you to run JavaScript on the server.

Learning by Examples
Our "Show Node.js" tool makes it easy to learn Node.js, it shows both the code and the result.

Example
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);

 Examples Running in the Command Line Interface
In this tutorial there will be some examples that are better explained by displaying the result in the command line interface.

When this happens, The "Show Node.js" tool will show the result in a black screen on the right:

Example
console.log('This example is different!');
console.log('The result is displayed in the Command Line Interface');
Click on the "Run example" button to see how it works.

My Learning
Track your progress with the free "My Learning" program here at W3Schools.

Log into your account, and start earning points!

This is an optional feature. You can study W3Schools without using My Learning.

Node.js Reference
Node.js has a set of built-in modules.

Built-in Modules

Reference link: https://www.w3schools.com/nodejs/
 
  
*_________________________________________________________________________EXPRESS JS______________________________________________________________________________________*
  

Express.js Tutorial
Express.js tutorial provides basic and advanced concepts of Express.js. Our Express.js tutorial is designed for beginners and professionals both.

Express.js is a web framework for Node.js. It is a fast, robust and asynchronous in nature.

Our Express.js tutorial includes all topics of Express.js such as Express.js installation on windows and linux, request object, response object, get method, post method, cookie management, scaffolding, file upload, template etc.

What is Express.js
Express is a fast, assertive, essential and moderate web framework of Node.js. You can assume express as a layer built on the top of the Node.js that helps manage a server and routes. It provides a robust set of features to develop web and mobile applications.
  
  Let's see some of the core features of Express framework:

It can be used to design single-page, multi-page and hybrid web applications.
It allows to setup middlewares to respond to HTTP Requests.
It defines a routing table which is used to perform different actions based on HTTP method and URL.
It allows to dynamically render HTML Pages based on passing arguments to templates.
Why use Express
Ultra fast I/O
Asynchronous and single threaded
MVC like structure
Robust API makes routing easy
  
Reference link: https://www.javatpoint.com/expressjs-tutorial
  
  
  
*_________________________________________________________________________NODEMON_________________________________________________________________________________________*
  nodemon
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.
 
Installation
Either through cloning with git or by using npm (the recommended way):

npm install -g nodemon # or using yarn: yarn global add nodemon
And nodemon will be installed globally to your system path.

You can also install nodemon as a development dependency:

npm install --save-dev nodemon # or using yarn: yarn add nodemon -D
With a local installation, nodemon will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of nodemon can be run by calling it from within an npm script (such as npm start) or using npx nodemon.

Usage
nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

nodemon [your node app]
For CLI options, use the -h (or --help) argument:

nodemon -h
Using nodemon is simple, if my application accepted a host and port as the arguments, I would start it as so:

nodemon ./server.js localhost 8080
Any output from this script is prefixed with [nodemon], otherwise all output from your application, errors included, will be echoed out as expected.

You can also pass the inspect flag to node through the command line as you would normally:

nodemon --inspect ./server.js 80
If you have a package.json file for your app, you can omit the main script entirely and nodemon will read the package.json for the main property and use that value as the app (ref).

nodemon will also search for the scripts.start property in package.json (as of nodemon 1.1.x).
  
  
  Reference link: https://www.npmjs.com/package/nodemon
  
  
 *_______________________________________________________________________NODE MAILER______________________________________________________________________________________*
  
  The Nodemailer Module
The Nodemailer module makes it easy to send emails from your computer.

The Nodemailer module can be downloaded and installed using npm:

C:\Users\Your Name>npm install nodemailer
After you have downloaded the Nodemailer module, you can include the module in any application:

var nodemailer = require('nodemailer');
Send an Email
Now you are ready to send emails from your server.

Use the username and password from your selected email provider to send an email.
  
  Reference link: https://www.w3schools.com/nodejs/nodejs_email.asp
  
  
*_________________________________________________________________________RAZORPAY________________________________________________________________________________________*
 
  What is Razorpay?
Razorpay is the in-between mode of payment which transact the payments to the other banks which are connected and available in all kinds of banks, credit, debit, wallets (Netflix, Airtel, Swiggy, and others).

Razorpay subscription also brings with it the useful feature of UPI autopay, nowadays transactions via cards are decreasing day by day due to digital payments. It helps in registered business also where payments get easier for others from different apps. After the pandemic and big break from the direct interaction, people have started to get more comfortable in digital payments where all the business has got a lot of upstream.

This platform of digital payment makes a link between many other apps in which one of the levels is crossed by Razorpay. Apart from the payment gateway, it provides more other benefits to the customers like Razorpay provides where it provides the merchant to automate bank transfer, invoices, and the account for the payroll.

Razorpay capital provides a loan for the business to avoid your cash flow. It benefits all the small business and cashier flow for the people. It helps businesses to make their market place and make available working capital rolls. Now if we come how does it work?
  
  
How does Razorpay Work?
Razorpay makes payment convenient for others through different transaction mode if we discuss in normal terms as the Razorpay app first transact the money from the authorised bank with all details after that it provides that amount to the digital marketing app so when the user starts online payment the marketing app get the money from the Razorpay app this how digitally it makes flow. Now Razorpay provides service of loans also for small businesses to grow and lend money to avoid the cashier flow, they help in small business-like freelancers, entrepreneurs, enterprises and other businesses.

Mostly this Razorpay is freely used in India and companies like India Mart intermesh limited, Ample technologies, Brio technologies private limited, Savari car rentals Private limited. While using a Razorpay account a person can receive transactions from the customers online to activate your Razorpay account. Following are the processes that have to be followed to activate your account in Razorpay. It just takes a few minutes from your clock to enjoy your Hassle free transaction.
  
Standard Plan
Login into your Razorpay account to access your dashboard, click on the activate account option in the menu panel, for business purpose you have to fill in some details regarding it like your business type, full business name, billing label, your identification proof, website/app, etc. after providing all the details click on the activate account.

Another beneficiary plans are there for customers who plan for their business purpose. The first one is The Standard Plan. This plan mostly works for small business start-ups. It takes 2% transaction fee + GST on every transaction made by the consumer from its credit, debit, wallets like UPI, airtel app, etc. 3% transaction + GST on every transaction made using diners and AMEX cards, other international cards and business credits.

Enterprise Plan
The other plan is The Enterprise Plan this plan mostly available for the business those who are based on daily transaction bases for this type of plan the Razorpay pay provide little bit more facilities like it provide 24x7 priority support, plan activation in 24 hours and an account manager for a separate account who can give instant support to the individual account, besides the nominal charges it does not take any charges for setting up free or annual maintenance charges. Making it a widely used payment gateway in India.

There are many different reasons to use Razorpay because it lent capital for your start-ups without an exchange it or any collateral or personal guarantees according to your business only it provides you that kind of facilities like your own account manager for an individual account, time updated and help service according to your account needs, it does not require any type of arrears.
  
Bottom Line
Choosing Razorpay will not lend you any kind of disadvantage. Every type of generation can have a chance to stand in the market now and have back support with Razorpay to prove themselves. Apart from people, it has made each one of our lives easier in the digital world for payment support. After the big crises in the pandemic our nation has been more updated with such type of companies.
  
  
 Reference link: https://www.quora.com/What-is-Razorpay
 
