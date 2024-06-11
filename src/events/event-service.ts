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

    async getEventsByCity(city: string, page: number, limit: number) {
        const events = await EventModel.find({location: city}).skip((page - 1) * limit).limit(limit);
        const totalEvents = await EventModel.countDocuments();
        return {events, totalEvents, totalPages: Math.ceil(totalEvents / limit), currentPage: page}
    }

    async getEvents(page: number, limit: number) {
        const events = await EventModel.find().skip((page - 1) * limit).limit(limit);
        const totalEvents = await EventModel.countDocuments();
        return {events, totalEvents, totalPages: Math.ceil(totalEvents / limit), currentPage: page};
    }

    async getEventById(id: string): Promise<IEvent | null> {
        const event = await EventModel.findById(id);
        return event;
    }

  }
  
  export default EventService;
  