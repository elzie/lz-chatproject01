import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger } from '@angular/animations';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: Boolean = false;

  constructor(private alertService: AlertService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      }));
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe properly to avoid memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
