export interface Notification {
  id: number;
  title: string;
  desc: string;
  updated_at: string;
}

export interface NotificationStream {
  id: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  Title: string;
  Description: string;
}
