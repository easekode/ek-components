import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import { EventMode, EventPurpose, EventStatus, IEvent } from '@ek-types';
import { Box } from '@mui/material';

import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

export const EkCalendar = ({ events }: { events: any[] }) => {
  // Transform IEvent objects into Calendar events
  const transformedEvents = events.map((event) => ({
    title: event.title,
    start: new Date(event.startDateTime),
    end: new Date(event.endDateTime),
    allDay: event.allDay || false,
    // resource: event.resource || null,
  }));

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={transformedEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </Box>
  );
};
