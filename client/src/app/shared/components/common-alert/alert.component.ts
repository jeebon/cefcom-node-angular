import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonAlertService } from 'src/app/shared/services/common-alert.service';

/**
 * Uses in app.module.ts file declarations
 * Use shared\services\common-alert.service.ts
 */
@Component({
  selector: 'common-alert',
  templateUrl: './alert.component.html'
})
export class CommonAlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private commonAlertService: CommonAlertService) { }

  ngOnInit() {
    this.subscription = this.commonAlertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
