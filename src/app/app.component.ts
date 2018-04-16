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
    appointment = {
      meetingTitle : '',
      starttime : {
        hour: '00',
        minute: '00'
      },
      endtime : {
        hour: '23',
        minute: '59'
      }
    };
    addAppointmentPopu = true;
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    view = 'month';
    viewDate: Date = new Date();

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
    }
  ];

   modalData: {
    action: string;
    event: CalendarEvent;
  };

  public DemoComponent() {
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
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

 addApointment() {
  this.addAppointmentPopu = false;
  //  this.events.push({
  //     title: 'Random Title',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   this.refresh.next();
  }
  cancelPopu() {
    this.addAppointmentPopu = true;
  }
  submiApportment(data) {
  console.log(data);
  this.events.push({
    title: data.meetingTitle,
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
    draggable: false,
    resizable: {
      beforeStart: false,
      afterEnd: false
    }
  });
  this.refresh.next();
  this.addAppointmentPopu = true;
  }


}
