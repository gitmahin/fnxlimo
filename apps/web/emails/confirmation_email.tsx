import { SendOrderConfirmationEmailDataType } from "@fnx/types";
import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Link,
  Column,
} from "@react-email/components";

interface ConfirmationEmail {
  name: string;
  email: string;
  data: SendOrderConfirmationEmailDataType;
}

export default function ConfirmationEmail({
  name,
  email,
  data,
}: ConfirmationEmail) {
  return (
    <Html>
      <Head>
        <title>Reservation Confirmed</title>
      </Head>
      <Preview>
        Hey {name} your reservation has been confirmed successfully. Here is
        your reservation details.
      </Preview>
      <Section>
        <Row>
          <Heading>Hello {name}</Heading>
        </Row>
        <Row>
          <Heading>Your Reservation Details</Heading>
          <Text>Your Email: {email}</Text>
        </Row>
        <Section>
          <Row>
            <Column>Pickup Date: {data.pickup_date}</Column>
          </Row>
          <Row>
            <Column>Pickup Time: {data.pickup_time}</Column>
          </Row>
          <Row>
            <Column>Pickup Location: {data.dropoff_location}</Column>
          </Row>
          <Row>
            <Column>DropOff Location: {data.pickup_location}</Column>
          </Row>
          <Row>
            <Column>Passenger: {data.passenger}</Column>
          </Row>
          <Row>
            <Column>Bags: {data.bags}</Column>
          </Row>
        </Section>
      </Section>
    </Html>
  );
}
