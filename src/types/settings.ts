export interface ServiceHours {
  enabled: boolean;
  start: string;
  end: string;
}

export interface DaySchedule {
  enabled: boolean;
  lunch: ServiceHours;
  dinner: ServiceHours;
}

export interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface Settings {
  opening_hours: WeekSchedule | null;
  logo_url: string | null;
  closure_note?: string | null;
  restaurant_name?: string;
}
