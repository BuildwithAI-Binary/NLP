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
const calendarId = "nqgijgjsqk6emrge21csdckhp0@group.calendar.google.com";
const serviceAccount = {
  "type": "service_account",
  "project_id": "binary-dnmgpb",
  "private_key_id": "77b157ea0fe5fa8e8a84ae173859043d06c6ca29",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCw8er36GD5PrkJ\nwIPQqgkzommzoZG/FBwaMf3qEnHkOJ8mGzDaKkJs4Osg9er9FxQQVmGuW+VJ3pcn\nQz11T2qwfvogW8jkXMSYhjhediJ6KalfPUiNQ3C0r7tPO2NXeIY8oGGawB7XUs8W\nb+QWhUlaKwpu9SPJhAktePF5GisFXuTD/FmaFNVHIAZQx7x+wLJWU4lBTl/eV2yv\n4rLskaKzyEifcknCqrlEZu90trUaUkNP0RV3eIFneU208I2VITpH2H30pg9WMOxT\ncX92MqjHPFeXI7cF8pC3NYRUcbffIKOUmOcf12WNLqA5vJfJhDD4tLGZuW155t2K\nkxIdH5EVAgMBAAECggEAKRYLUsQlHErZqW+HzABngZNRSvIVxxIS0mxQQrVEt9MD\n9VOz/Lx6TxDM2AryJRFiScbdCKDy9TuXynidASvPIKtjRfc6BviZd7cWyKxSph4d\nY2119sM1nOb/Lc8i6pEkTliJQWch4iqqxlF121rYpPTAh/Io/KZJgUMHgvC2E5lJ\nguWbGYGZlHw+P11NLerflwZZ7aVM3maUZI1pzdKgDMVrBgexAaTaP+gFRK3ep9aN\nwhmFeJgOa2+E4AI+AZ0MaMH1sVtvreYLCvFYDSnnFv/1ypP2xkat0msGPMT38MUB\nlZu/M3n++FlQq5qy+HP/3WZKhxP4HlGLFnHOfoFgowKBgQDnYZOjDgB/j6kJ/eBS\n0a55n66Eus8TDSm40EGDCVaFnxC4aJlLkRJi8cnajzjg6ypDHL+Xh83fpuc51+R7\nKBqSgQdiA4irWonyLOQAj6NBCn04ykP+pZgxs/+rs2O0t6iuefmiSmh7trly8FsW\nG61hM8809eTwYRWdnjwZZXtrrwKBgQDDxZgLPUdDo6I9y87ibzRllNcd1/lu0iWO\nNImJZb4ugtKInHqEDhWrGt3uKspbtozvgj1l6VDDudNi+vbkU1qELteplX76iE/T\n9G5oSm3bPmx9lDXsIsp+N5Lday0sQ9L/Arpw2L54E5qDv5rYeTFfF5YCUvRsXswY\nWREdvStsewKBgQDb68fa3E0m8ZIWuCKGNVxjp53F9JUro4A7dF5AQRjmyminDmxe\nAdZ7Cxvzy9uhFIRH48RLL75DTK1MMmKtmFGhXFh7FabKT7T75SUVT3E5OdIJr15v\nZE/DNjXVqh0jwMjohXD7i0PCCsw7bi71VXs2/3p7+RgQTgawmJzA+s8TawKBgQCU\nSlXzHYWfnJFGUdzx894ym92eQ3wzD4dXAkC0DJdUT8/9ntnGsYyEQSOeRldlxQ9Y\nVMUBLwv4Vgfiz8q4BNNpkLnXQOAgEaS2Hk6LPOWdztkK/nsh1PChTqM2iPp8rxti\nAsUKuYL9HYxLA5XdJ1/Ycds1A3UVqXDbeIvYhPQhhQKBgFbhR9iMNiSp6SSM+tHI\nxL1y7xuz0KbMzpbV2vB29INGG/4KFlxKUQ4yvKvwXh4H0XImGDetIyGtQxtadEEo\nLmg2pZKat9HN7nzVnPV9JLQi1IZ/pChaCQeMmRSOudIwrDff9VZ4aPIOKKediJi3\nVheSfBu5tRaS05VPnJ1boYvg\n-----END PRIVATE KEY-----\n",
  "client_email": "binary-dnmgpb@appspot.gserviceaccount.com",
  "client_id": "102905007311213350179",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/binary-dnmgpb%40appspot.gserviceaccount.com"
}



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