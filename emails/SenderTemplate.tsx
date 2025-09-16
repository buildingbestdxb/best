// components/EmailTemplate/AdminNotification.tsx

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

type AdminNotificationProps = {
  fullName: string;
  email: string;
  phone?: string;
  appliedFor: string;
};

export default function AdminNotification({
  fullName,
  email,
  phone,
  appliedFor,
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Job Application Received – {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>New Job Application</Text>

            <Text style={paragraph}>
              A new job application has been submitted on the Best website.
            </Text>

            <Text style={paragraph}>
              <strong>Applicant Name:</strong> {fullName} <br />
              <strong>Email:</strong> {email} <br />
              {phone && (
                <>
                  <strong>Phone:</strong> {phone} <br />
                </>
              )}
              <strong>Position Applied:</strong> {appliedFor}
            </Text>

            <Text style={paragraph}>
              Please log in to the admin dashboard to review the full application.
            </Text>

          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '40px 0',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
  maxWidth: '600px',
  margin: '0 auto',
};

const section = {
  width: '100%',
};

const heading = {
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};
