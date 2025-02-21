export interface Volunteer {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: string;
    address: string;
    city: string;
    experience: string;
    events: any[];
  }
  
  export interface Event {
    event_id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    status: string;
    lastDateToRegister: string;
    eventDate: string;
    host: any;
    volunteerRequestList: Volunteer[];
    eventVolunteer: Volunteer[];
  }
  
  export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }