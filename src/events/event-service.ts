import { ObjectId } from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const {name, description, date, location, duration} = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date,
            location,
            duration
        })

        await newEvent.save();
        return newEvent;
    }

    async getEventsByCity(city: string): Promise<IEvent[]> {
        const events = await EventModel.find({location: city});
        return events;
    }

    async getEvents(): Promise<IEvent[]> {
        const allEvents = await EventModel.find();
        return allEvents;
    }

    async getEventById(id: string): Promise<IEvent | null> {
        const event = await EventModel.findById(id);
        return event;
    }

  }
  
  export default EventService;
  