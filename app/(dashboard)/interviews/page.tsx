"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar React component
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/day views
import timeGridPlugin from "@fullcalendar/timegrid"; // For week/time views
import listPlugin from "@fullcalendar/list"; // For list view
import interactionPlugin from "@fullcalendar/interaction"; // For user interactions like dragging
import { mockInterviews } from "@/utils/data/mockInterviews";
import { IEvent } from "@/components/Interviews/IEvents";

const Interviews = () => {
  const events = mockInterviews;
  //const events = [{ title: "Meeting", start: new Date() }];

  const handleDateClick = (info: { dateStr: string }) => {
    // Handle click on a date
    console.log("Date clicked:", info.dateStr);
  };

  // Convert mockInterviews to FullCalendar events format
  // interface CalendarEvent {
  //   id: string;
  //   title: string;
  //   start: string;
  //   end: Date;
  //   description: string;
  // }

  // const convertToCalendarEvents = (interviews: IEvent[]): CalendarEvent[] => {
  //   return interviews.map((interview) => ({
  //     id: interview.id,
  //     title: `${interview.stageName}: ${interview.status}`,
  //     start: interview.scheduledDate,
  //     end: new Date(
  //       new Date(interview.scheduledDate).getTime() +
  //         interview.durationMinutes * 60000
  //     ), // Adds duration
  //     description: interview.interviewNotes,
  //   }));
  // };

  return (
    <section className="w-full py-8 md:py-10">
      <div className="w-full max-w-7xl mx-auto p-4 shadow-md rounded-lg">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={events}
          dateClick={handleDateClick}
          //eventClick={handleEventClick}
          editable={true} // Allow drag-and-drop events
          selectable={true} // Allow date selection
          height="auto" // Ensures the height adapts dynamically
          dayHeaderClassNames="bg-primary text-white" // Tailwind classes for day headers
          eventClassNames="bg-indigo-200 rounded-md text-gray-700" // Tailwind for events
        />
      </div>
    </section>
  );
};

export default Interviews;
