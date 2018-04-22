import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demo-utils-calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn sidebtn"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <
          </div>
          <div
            class="btn centerBtn">
            {{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}
          </div>
          <div
            class="btn sidebtn"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            >
          </div>
        </div>
      </div>
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <div class="btn-group outline1">

            <div
            class="btntype2"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Today
          </div>
          <div
            class="btntype2"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'">
            Month
          </div>
          <div
            class="btntype2"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'">
            Week
          </div>
          <div
            class="btntype2"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'">
            Day
          </div>
        </div>
      </div>
    </div>
    <br>
  `
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
