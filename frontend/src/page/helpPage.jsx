import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FaqItem = ({ question, answer }) => (
  <div className="faq-item mb-6">
    <h3 className="font-semibold text-lg">{question}</h3>
    <p className="text-lg">{answer}</p>
  </div>
);

const HelpPage = () => {
  return (
    <div className="help-page p-4 md:p-6 lg:p-8 mt-24 md:mt-24 ml-0 md:ml-64 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6">
        <FaQuestionCircle className="inline mr-2" />
        Help & Support
      </h1>
      <p className="text-lg mb-6">
        Welcome to the Help & Support page. Here, you can find answers to frequently asked questions, as well as ways to contact support if you need further assistance.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="faq">
        <FaqItem
          question="How do I reset my password?"
          answer="If you've forgotten your password, click the 'Forgot Password' link on the login page. You will be asked to provide your registered email address to receive a reset link."
        />
        <FaqItem
          question="How can I contact prison management or security?"
          answer="To contact prison management or security staff, please send an email to security@wolkiteprison.com or call the direct emergency line at 123-456-789."
        />
        <FaqItem
          question="How do I add a visitor to the inmate’s visitation list?"
          answer="To add a visitor, please navigate to the inmate's profile under the 'Inmates' section and select 'Add Visitor.' Ensure that you have the necessary details for the visitor, such as their name, relationship to the inmate, and contact information."
        />
        <FaqItem
          question="How can I submit a complaint or incident report?"
          answer="To submit a complaint or report an incident, go to the 'Incident Reports' section under your dashboard. Provide all relevant details, including any evidence or witness statements, and submit it for review."
        />
        <FaqItem
          question="What should I do if I suspect security issues or emergencies?"
          answer="If you suspect a security issue or emergency, contact security immediately using the emergency contact number provided in your system or use the 'Report Incident' feature in the app for quick alerting."
        />
        <FaqItem
          question="How do I request parole information for an inmate?"
          answer="You can request parole information by accessing the 'Parole' section in the inmate's profile. If additional details are needed, please contact the parole board at parole@wolkiteprison.com."
        />
        <FaqItem
          question="How do I change my email address?"
          answer="To change your email address, navigate to the 'Account Settings' section under your profile. Click on 'Edit Profile,' update your email, and save the changes. A confirmation email will be sent to the new address."
        />
      </div>
    </div>
  );
};

export default HelpPage;
