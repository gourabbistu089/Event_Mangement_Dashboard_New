// src/api/event.api.js
import api from "./axios"

// User – browse events
export const getAllEvents = () => {
  try {
    const res =api.get("/events")
    return res;
  } catch (error) {
    console.log("Error in getAllEvents ",error)
  }
}

// User – register for event
export const registerForEvent = (eventId) => {
  try {
  const res = api.post(`/registrations`, { eventId })
  return res; 
    
  } catch (error) {
    console.log("Error in registerForEvent ",error)
    
  }
}

// Organizer – create event
export const createEvent = (data) => {
  try {
   const res =  api.post("/events", data)
   return res
  } catch (error) {
    console.log("Error : ",error)
  }
}

// Organizer – my events
export const getOrganizerEvents = () => {
  return api.get("/events/my-events")
}

// get my registrations
export const getMyRegistrations = () => {
   try {
    const res = api.get("/registrations/my-registrations")
   return res;
   } catch (e) {
    console.log("Error in getMyRegistration ",e)
    
   }
}