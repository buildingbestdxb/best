// components/EmailTemplate/ContactFormNotification.tsx

import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
} from '@react-email/components';

type ContactFormNotificationProps = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export default function ContactFormNotification({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission Received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>New Contact Request Received</Text>

            <Text style={paragraph}>
              You have received a new inquiry through the contact form on your website. Below are the details submitted:
            </Text>

            <Text style={infoBlock}>
              <strong>Name:</strong> {name}<br />
              <strong>Email:</strong> {email}<br />
              {subject && (
                <>
                  <strong>Subject:</strong> {subject} <br />
                </>
              )}
              {phone && (
                <>
                  <strong>Phone:</strong> {phone} <br />
                </>
              )}
            </Text>

            <Text style={paragraph}>
              <strong>Message:</strong>
            </Text>

            <Text style={messageBlock}>
              {message}
            </Text>

            <Text style={paragraph}>
              Please follow up with the sender at your earliest convenience.
            </Text>

          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styling

const main = {
  backgroundColor: '#f4f4f7',
  padding: '40px 0',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const section = {
  width: '100%',
};

const heading = {
  fontSize: '20px',
  fontWeight: 700,
  marginBottom: '20px',
  color: '#333333',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '22px',
  margin: '16px 0',
  color: '#444444',
};

const infoBlock = {
  ...paragraph,
  backgroundColor: '#f0f4f8',
  padding: '16px',
  borderRadius: '6px',
  fontSize: '14px',
};

const messageBlock = {
  ...paragraph,
  fontStyle: 'italic',
  padding: '12px 16px',
  backgroundColor: '#f9fafb',
  borderLeft: '4px solid #0070f3',
  borderRadius: '4px',
  color: '#333333',
};


