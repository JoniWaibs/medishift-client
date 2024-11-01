import { NotificationClient, NotificationType } from "../enums";

interface Notification {
    message: string;
    client: NotificationClient;
    type: NotificationType;
}

export const useNotification = () => {
    const sendNotification = async () => {
        //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
        //    method: "POST",
        //    body: JSON.stringify({ message })
        //});
    }
}