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
  addHours,
  format,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  isDate
} from 'date-fns';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../app/app.component.css'],
  templateUrl: '../app/app.component.html'
})

export class DemoComponent {
  appointment = {
    meetingTitle : '',
    starttime: this.getDateFromDateWithoutSecond(new Date()),
    endtime:  this.getDateFromDateWithoutSecond(new Date())
  };

    isPopUpRequiredForAddAppointment = true;
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    view = 'month';
    viewDate: Date = new Date();
    activeDayIsOpen = true;

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Syncup Team Meeting',
      color: colors.red,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Scrum Call for Project',
      color: colors.yellow,

      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

   modalData: {
    action: string;
    event: CalendarEvent;
  };

  public DemoComponent() {
  }

  getDateFromDateWithoutSecond(dateValue: Date) {
    return new Date(
      getYear(dateValue),
      getMonth(dateValue),
      getDate(dateValue),
      getHours(dateValue),
      getMinutes(dateValue));
  }

  // constructor(private modal: NgbModal) {}
   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

   addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

 addApointment() {
  this.isPopUpRequiredForAddAppointment = false;
  }
  cancelPopu() {
    this.isPopUpRequiredForAddAppointment = true;
  }
  submitAppointment(data) {
    console.log(data);
    // alert(this.getDateFromDateString(data.starttime));
    // alert(new Date(format(data.starttime, 'DD/MM/YYYY HH:mm:ss')));
    // alert(format(data.endtime, 'DD/MM/YYYY HH:mm:ss'));
    if (data.meetingTitle.length <= 0) {
      alert('Error: title cannot be empty.');
      this.isPopUpRequiredForAddAppointment = false;
    } else if (data.endtime <= data.starttime) {
      alert('Error: end time cannot be less than start time.');
      this.isPopUpRequiredForAddAppointment = false;
    } else {
    this.events.push({
      title: data.meetingTitle,
      start: new Date(data.starttime),
      // start: startOfDay(new Date()),
      end: new Date(data.endtime),
      color: colors.red,
      draggable: false,
      resizable: { beforeStart: false, afterEnd: false}
    });
    this.isPopUpRequiredForAddAppointment = true;
    this.refresh.next();
    }

  }
}
