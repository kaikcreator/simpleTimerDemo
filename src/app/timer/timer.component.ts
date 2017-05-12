import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TimerService } from "app/timer/timer.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndRef: Subscription = null;

  constructor(public timer:TimerService){}

  ngOnInit(){
    this.timer.restartCountdown(this.init);
    this.countdownEndRef = this.timer.countdownEnd$.subscribe(()=>{
      this.onComplete.emit();
    });
  }

  ngOnDestroy(){
    this.timer.destroy();
    this.countdownEndRef.unsubscribe();  
  }

}
