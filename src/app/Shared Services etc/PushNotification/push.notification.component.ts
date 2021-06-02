import { Component, NgZone } from '@angular/core';
import { Message } from './message.model';
import { PushNotificationService } from './push.notification.service';

@Component({
    selector: 'app-push-notification',
    templateUrl: './push-notification.html'
})
export class PushNotificationComponent {
    unseenCount: number;
    txtMessage: string = '';
    uniqueID: string = new Date().getTime().toString();
    messages = new Array<Message>();
    newMessage: Message;
    isLoading: boolean;
    constructor(
        private pushNotificationService: PushNotificationService,
        private _ngZone: NgZone
    ) {
    }
    sendMessage(): void {
        if (this.txtMessage) {
            this.newMessage = new Message();
            this.newMessage.Module = "ELN";
            this.newMessage.NotificationText = this.txtMessage;
            this.newMessage.CreatedDate = new Date();
            this.txtMessage = '';
            this.pushNotificationService.sendMessage(this.newMessage);
        }
    }

    ViewNotifications(): void {
        this.pushNotificationService.viewNotifications();
    }

    private subscribeToEvents(): void {
        this.pushNotificationService.messageReceived.subscribe((msg: Message) => {
            this._ngZone.run(() => {
                this.messages.push(msg);
            });
        });
        this.pushNotificationService.NewNotification.subscribe((unseenCount: number) => {
            this._ngZone.run(() => {
                this.unseenCount = unseenCount;
            });

        });
        this.isLoading = true;
        this.pushNotificationService.ViewNotification.subscribe((list: Message[]) => {
            this._ngZone.run(() => {
                this.messages = list;
                this.isLoading =false;
                if (this.unseenCount > 0) {
                    setTimeout(timer => {
                        this.pushNotificationService.markAsSeen();
                    }, 1500);
                }
            });
        });
    }

    ngOnInit() {
        this.subscribeToEvents();
    }
}