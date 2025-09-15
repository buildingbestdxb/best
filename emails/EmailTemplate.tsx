// components/EmailTemplate/EmailTemplate.tsx

import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
} from '@react-email/components';

type EmailTemplateProps = {
  name: string;
};

export default function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for applying to Best – We’ve received your application</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Thank You for Applying to Best</Text>

            <Text style={paragraph}>
              Dear {name},
            </Text>

            <Text style={paragraph}>
              Thank you for taking the time to apply for a position at <strong>Best</strong>. We’ve received your application and our hiring team will be reviewing it shortly.
            </Text>

            <Text style={paragraph}>
              If your qualifications match our requirements, we will contact you to discuss the next steps in the hiring process.
            </Text>

            <Text style={paragraph}>
              In the meantime, feel free to learn more about us:
            </Text>

            <Button
              href="https://bestbcc.com"
              style={button}
            >
              Visit Best
            </Button>

            <Text style={paragraph}>
              Thank you again for your interest in joining Best. We wish you the best of luck!
            </Text>

            <Text style={paragraph}>Best regards,<br />The Best Hiring Team</Text>
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

const button = {
  backgroundColor: '#0070f3',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  fontSize: '16px',
  textDecoration: 'none' as const,
  display: 'inline-block',
  marginTop: '16px',
};

