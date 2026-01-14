// src/api/event.api.js
import api from "./axios"

// User – browse events
export const getAllEvents = () => {
  return api.get("/events")
}

// User – register for event
export const registerForEvent = (eventId) => {
  return api.post(`/events/${eventId}/register`)
}

// Organizer – create event
export const createEvent = (data) => {
  return api.post("/events", data)
}

// Organizer – my events
export const getOrganizerEvents = () => {
  return api.get("/events/my")
}
