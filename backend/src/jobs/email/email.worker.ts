import {Worker, Job} from 'bullmq';
import {connection} from '../connection';

export const emailWorker = new Worker(
    'emailQueue',
    async (job: Job) => {
        const {email, subject, message} = job.data;
        console.log(`Processing email to ${email} with subject: ${subject}`);
        // Simulate sending email logic here...
    },
    {
        connection
    }
);
