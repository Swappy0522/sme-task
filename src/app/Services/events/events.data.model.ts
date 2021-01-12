export interface EventData {
  _id: string;
  EventName: string;
  EventDescription: string;
  IsActive: boolean;
  EnteredBy: string;
  WhenEntered: Date;
  ModifiedBy: string;
  WhenModified: Date;
}
