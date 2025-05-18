import { Injectable } from '@nestjs/common';
import {emailQueue} from "../../jobs/email/email.queue";

@Injectable()
export class EmailService {
    async sendEmail(email: string, subject: string, message: string) {
        await emailQueue.add('send', { email, subject, message });
        return { status: 'queued', email, subject };
    }
}