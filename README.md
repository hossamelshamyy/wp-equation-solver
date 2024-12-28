# WhatsApp Equation Solver Bot

This README explains how I implemented a WhatsApp bot that solves equations for Alsun.AI 

## **List of Contents**

1. [Using Backend Service with 3rd Party API](#1-using-backend-service-with-3rd-party-api)
    - [Overview](#overview)
    - [Methodology](#methodology)
    - [Steps to use](#steps-to-use)
    - [Recoreded Demo](#recoreded-demo)
2. [Using Backend Service with WhatsApp Business API](#2-using-backend-service-with-whatsapp-business-api)
    - [Overview](#overview-1)
    - [Methodology](#methodology-1)
    - [Steps to use](#steps-to-use-1)
    - [Recoreded Demo](#recoreded-demo-1)
3. [Using WhatsApp Automation using simulation tools like Selenium](#3-using-whatsapp-automation-using-simulation-tools-like-selenium) (*Not Implemented*)
    - [Overview](#overview-2)
4. [Low-Code/No-Code Solution](#4-low-codeno-code-solution) (*Not Implemented*)
    - [Overview](#overview-3)
---

## **1. Using Backend Service with 3rd Party API**

### **Overview**
<!-- Twilio provides an API to send and receive WhatsApp messages. This method uses Python with Flask or Django to handle incoming messages and send replies. -->
Using a backend server to process incoming messages and solve equations. Twilio's API can be used to send and receive WhatsApp messages by integrating with a backend server using webhooks.

### **Methodology**
1. **Set up Twilio**:
    - Sign up for a [Twilio account](https://www.twilio.com/).
    - Activate the WhatsApp Sandbox.
2. **Create the Server**:
    - Used Flask to process incoming messages, as in the `server.py` file located in the `twilio-api` directory in this repository.
        - Parse the message **manually** to check if it’s an equation without using `eval()` because of its security risks.
3. **Export the Server**:
- Export the server to a public URL using [ngrok](https://ngrok.com/).
- Configure the Twilio webhook to point to this URL.

### **Steps to use**
1. **Send `join river-across` to this number `+14155238886` to join my sandbox**
2. **Now you can send an equation and it will reply with the answer**

### **Recoreded Demo**

https://github.com/user-attachments/assets/d5288cc9-4554-4902-9298-b1cacf0852f7

---

## **2. Using Backend Service with WhatsApp Business API**

### **Overview**
Using the WhatsApp Business API to build a bot that solves equations. This method involves setting up a server to handle incoming messages, parsing equations, and sending responses using the WhatsApp API.

### **Methodology**
1. **Set up Whatsapp Business API**:
    - Create Meta Developer Account.
    - Set up a WhatsApp Business Account and make a test number scince we are using it for testing without paying.
    - Create new App in Meta Developer Console.
    - Add WhatsApp product to the App.
    - Enable Whatsapp webhook and set the URL to the server we will configure later.
    - Connect the test number to the App.
    - Add the number you will use to send messages to the test number to the list of testers.

2. **Create the Server**:
    - Use `express` to create a server.
    - Use libraries like `mathjs` for parsing and solving equations.
    - Use the WhatsApp API to send and receive messages as in the `appFB.js` file located in the `wp-business` directory in this repository.
3. **Export the Server**:
    - Export the server to a public URL using [ngrok](https://ngrok.com/).
    - Configure the Whatapp webhook to point to this URL.

### **Steps to use**
1. **Send me the number you will use to test the chatbot to add it to list of testers since we are using a testing number, if we plan to use the production version we will need to wait for meta's approval for the business**
2. **After your number being added to the testers list you can start using the chatbot through this number `+1 555 190 5205`**

### **Recoreded Demo**

https://github.com/user-attachments/assets/21a739c0-854b-4ba9-ba36-60526afae4d8

---

## **3. Using WhatsApp Automation using simulation tools like Selenium**

### **Overview**
Tools like Selenium used to automate browser interactions can be used to simulate WhatsApp interactions. This method involves setting up a server to handle incoming messages, parsing equations, and sending responses using Selenium to interact with the WhatsApp Web interface.

*I did not implement this method since it's not recommended for production use, but it can be used for testing purposes, also may violate WhatsApp's terms of service, and it's
Less reliable than API-based solutions, and it may break if WhatsApp changes anything in its web interface.*

---

## **4. Low-Code/No-Code Solution**

### **Overview**
Platforms like Zapier, Make (Integromat), or Twilio Studio allow you to create a bot with minimal coding, also there are Bot frameworks like Rasa, Dialogflow, or Microsoft Bot Framework allow advanced bot development.

*I didn't implement any of these because most of them are paid and I'm trying to implement a free solution.*

---


