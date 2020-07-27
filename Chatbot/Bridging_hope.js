'use strict';

// Import the Dialogflow module from Google client libraries.
const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');
const {
    dialogflow,
    SimpleResponse,
    BasicCard,
    Button,
    Image,
    BrowseCarousel,
    BrowseCarouselItem,
    Suggestions,
    LinkOutSuggestion,
    MediaObject,
    Table,
    List,
    Carousel,
  } = require('actions-on-google');

// Enter your calendar ID below and service account JSON below
const calendarId = "<your calendar id>";
const serviceAccount = {<your service account>};



// Starts with {"type": "service_account",...

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
 email: serviceAccount.client_email,
 key: serviceAccount.private_key,
 scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'Asia/Colombo';
const timeZoneOffset = '+05:30';

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
 const agent = new WebhookClient({ request, response });
 console.log("Parameters", agent.parameters);



 /* function welcomeCall(agent)
 {
     console.log("inside welcome call");
    agent.add("Hi. How are you doing today?");
   //  agent.add(new Suggestions(['Questions', 'Book an appoinment']));
 }
 */
 function makeAppointment (agent) {
   // Calculate appointment start and end datetimes (end = +1hr from start)
   const appointment_type = agent.parameters.AppointmentType;
   const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
   const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
//var startdate = agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1];
var startdate = agent.parameters.date.split('T')[0];
   var enddate = agent.parameters.date.split('T')[0];
  
   const appointmentTimeString = dateTimeStart.toLocaleString(
     'en-US',
     { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
   );
   
    // Check the availability of the time, and make an appointment if there is time on the calendar
   return createCalendarEvent(startdate, enddate, appointment_type).then(() => {
     agent.add(`Ok, let me see if we can fit you in. Yeah it is fine! Booking confirmed.`);
   }).catch(() => {
     agent.add(`I'm sorry, there are no slots available for this time.`);
   });
 }

// Handle the Dialogflow intent named 'Schedule Appointment'.
 

//Creates calendar event in Google Calendar
function createCalendarEvent (startdate, enddate, appointment_type) {
 return new Promise((resolve, reject) => {
    calendar.events.insert({ auth: serviceAccountAuth,
        calendarId: calendarId,
        resource: {summary: appointment_type +' Appointment', description: appointment_type,
          //start: {dateTime: dateTimeStart},
         // end: {dateTime: dateTimeEnd}
          start : {date: startdate},
          end: {date: enddate},
          }
      }, (err, event) => {
          console.log("insert error" +  err);
          console.log("insert event" + event);
        err ? reject(err) : resolve(event);
      }
      );
  /* calendar.events.list({
     auth: serviceAccountAuth, // List events for time period
     calendarId: calendarId,
    // timeMin: start_date.toISOString(),
     timeMin: "2020-08-20T10:00:00Z",
     timeMax: "2020-08-30T10:00:00Z"
   //  timeMax: dateTimeEnd.toISOString()
   }, (err, calendarResponse) => {
     // Check if there is a event already on the Calendar
     console.log(calendarResponse);
     if (err || calendarResponse.data.items.length > 0) {
         console.log("inside conflict area");
       reject(err || new Error('Requested time conflicts with another appointment'));
     } else {
       // Create event for the requested time period
       console.log("inserting");
       
     } 
   }); 
   */
 });
}

let intentMap = new Map();
 intentMap.set('Schedule Appointment', makeAppointment);
 intentMap.set('schedule', makeAppointment);
 //intentMap.set('Default Welcome Intent', welcomeCall);
 agent.handleRequest(intentMap);
});
