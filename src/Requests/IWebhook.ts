export interface IWebhook {
    Querystring: {
        topic: string;
        payload: string;
    },
    Body: {
        topic: string;
        payload: string;
    },
}