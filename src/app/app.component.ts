import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';


@Component({
  selector: 'app-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../app/app.component.css'],
  templateUrl: '../app/app.component.html'
})
export class DemoComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view = 'month';
  viewDate: Date = new Date();
}
