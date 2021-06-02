import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { environment } from 'src/environments/environment';
import { ISignalRConnection, SignalR } from 'ng2-signalr';
import { LoginService } from 'src/app/login/Service/login.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  messageReceived = new EventEmitter<Message>();
  NewNotification = new EventEmitter<number>();
  ViewNotification = new EventEmitter<object>();
  connectionEstablished = new EventEmitter<Boolean>();
  connection: ISignalRConnection;
  private connectionIsEstablished = false;
  constructor(private hubConnection: SignalR,
    private loginUser: LoginService
  ) {
    this.createConnection();
  }

  private createConnection() {
    let loginUser = this.loginUser.getLoginUser();
    if (loginUser != null) {
      this.hubConnection.connect({ jsonp: true, hubName: "messageHub", url: environment.apiUrl, qs: "UserId=" + loginUser['UserID'] }).then((conn) => {
        this.connection = conn;
        this.registerOnServerEvents();
        this.startConnection();
      });
    }
  }

  sendMessage(message: Message) {
    this.connection.invoke('NewMessage', message);
  }

  viewNotifications() {
    this.connection.invoke('ViewNotification');
  }

  markAsSeen() {
    this.connection.invoke('MarkAsSeen');
  }

  private startConnection(): void {
    this.connection.start().then((resp) => {
      this.connectionIsEstablished = true;
      console.log('Hub connection started');
      this.connectionEstablished.emit(true);
    }).catch(err => {
      console.log('Error while establishing connection, retrying...');
      setTimeout(obj => { this.startConnection(); }, 5000);
    });
  }

  private registerOnServerEvents(): void {
    this.connection.listenForRaw('MessageReceived').subscribe((data: any[]) => {
      this.messageReceived.emit(data[0]);
    });
    this.connection.listenForRaw('NewNotification').subscribe((data: any[]) => {
      this.NewNotification.emit(data[0]);
    });
    this.connection.listenForRaw('ViewNotification').subscribe((data: any[]) => {
      this.ViewNotification.emit(data[0]);
    });
    let loginUser = this.loginUser.getLoginUser();
    this.connection.invoke('GetUnseenCount', loginUser['UserID']);
  }
}