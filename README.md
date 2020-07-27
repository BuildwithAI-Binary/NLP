
# Team Binary

# Problem:

According to the CDC, suicide rates have increased by 30% since 1999. Nearly 45,000 lives were lost to suicide in 2016 alone. Comments or thoughts about suicide — also known as suicidal ideation — can begin small like, “I wish I wasn’t here” or “Nothing matters.” But over time, they can become more explicit and dangerous.
Here are a few other warning signs of suicide:
Increased alcohol and drug use
Aggressive behavior
Withdrawal from friends, family and community
Dramatic mood swings
Impulsive or reckless behavior

# What it does:

A solution that helps detect the human lives at risk of mental illness, classify them in to the severity levels of risk and act accordingly to provide them the path to get help, leveraging AI and NLP techniques.Once we classify level of risk,we will redirect person via targeted Ads to our chatbot which will help them to know about mental health issues.If require we will call nearby helpline number.


* EDA

  For EDA purpose we have extracted past 1 yeat tweets based on following #hashtag keywords using TwitterAPI:-
  fear,alone,meditation,panic,suicide,sadness,smile,stayhome,positive,mentalhealth etc for US.

* Modelling
  There is no dataset available with labelling tweet/post as per mental health condition.After lot of research we identified this method for collecting dataset:-

  a. Collect data from Twitter based on keywords like Anxiety , Depression , mentalillness, mentalhealth, endthestigma, bellletstalk, alcoholism, alcoholic,      insomnia,stressed,alcohol,gun,drug. Now to further make sure ,we did sentiment analysis on each tweet and included neagtive sentiment tweets only in our train data because depression and suicide are negative sentiments.
For positive sentiments we collected Twitter data from Kaggle.


  b. We crawled information from Reddits based on  r/Depression, r/SuicideWatch, r/CasualConversation, and r/social subreddits.

  After merging Twitter,Reddit data we trained our model to predict person's mental health condition into 4 category
  NOT_SUICIDAL,Early sign,Mid risk,High risk category

  First we trained classification model on NB,LR.NB was better compare to LR for classification.After that we trained on LSTM which outperformed othe models.

* Chatbot

We have created an AI Chatbot named Bridging-Hope, that will provide assistance to people about mental health issues. 

Our bot can be found at:
https://bot.dialogflow.com/f6f61cf3-e6c4-422b-904e-40e4b36fbdd3

Our chatbot is built using Google Dialogflow bot engine.
Dialogflow is a natural language understanding platform used to design and integrate a conversational user interface into mobile apps, web applications, devices, bots, interactive voice response systems.

Functionalities:
1.    Accepts text and voice input.
2.    Can answer mental health related questions specific to covid-19 phase.
3.    Can help to schedule appointments with professionals/counselors for mental health support – Google Calendar integrated. 
4.    Collect information from users regarding their mental health condition to help therapists to understand their state.
5.    Can switch to telephone gateway to connect with helpline number. 
6.     Can be integrated with many platforms Eg: Slack, Skype, Telegram, Twitter, Facebook Messenger, Line, Spark, Viber etc. 

Sample Conversations:
Questions:
•    Can you prevent mental health problems?
•    Are there cures for mental health problems?
•    What causes mental health problems?
•    How do I know if I'm unwell?
•    What should I do if I’m worried about a friend or relative?
•    How can I assess my mental health?
•    Why am I struggling with my mental health during covid-19?
•    How can we take care of our mental health during covid-19 quarantine?
•    How do you prioritize mental health during the covid-19 outbreak?
•    How does isolation affect my mental health? 
•    Will complete isolation during the pandemic affect your mental health?
•    How do you protect employee mental health during covid-19?
•    How can your religion affect your mental health during covid-19?
•    Will nurses get PTSD from corona related work?
•    How do I take care of my child's mental health during this outbreak?
•    With the stress and anxiety due to the outbreak, I feel as if I can't get hold of my emotions. What should I do?


Book an appointment.
•    Book an appointment for therapist for tomorrow by 8 am.
•    Set a doctor appointment for 8th August

# Challenges we ran into:-
Most challenging part was to extract data .For Twitter API we have certain limitations based on number of tweets we can extract in a day.Second issue was to get proper training data for classification model training.

# What's Next

We are planning to do more research on getting labelled data from other platform .Also we will enhance our model by constructing useful ngram,and applying some SOA NLP models to understand context in more better way which in turn will make our model more accurate.


