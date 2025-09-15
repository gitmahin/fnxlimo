import { resend } from "@/lib/resend";
import ConfirmationEmail from "../../emails/confirmation_email";
import { SendOrderConfirmationEmailDataType } from "@fnx/types"

type UserEmailDetails = {
    name: string
    email: string
    subject: string
}
export class ResendService {

    async sendOrderConfirmationEmail(displayName: string, tag: string,
        {
            name,
            email,
            subject,
        }: UserEmailDetails,
        {
            pickup_date,
            pickup_time,
            pickup_location,
            dropoff_location,
            passenger,
            bags,
            order_id,
        }: SendOrderConfirmationEmailDataType

    ) {
        const data = {
            pickup_date,
            pickup_time,
            pickup_location,
            dropoff_location,
            passenger,
            bags,
            order_id,
        }
        await resend.emails.send({
            from: `${displayName} <${tag}@finixlimo.com>`,
            to: email,
            subject: `${subject}`,
            react: ConfirmationEmail({
                name,
                email,
                data
            }),
        });
    }
}