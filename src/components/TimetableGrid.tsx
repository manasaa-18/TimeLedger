import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimetableSlot {
  id: string;
  subject: string;
  faculty: string;
  room: string;
  duration: string;
  color: string;
}

interface TimetableGridProps {
  currentRole: 'admin' | 'faculty' | 'student';
  onSlotEdit?: (slot: TimetableSlot) => void;
}

export function TimetableGrid({ currentRole, onSlotEdit }: TimetableGridProps) {
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Sample timetable data
  const timetableData: Record<string, Record<string, TimetableSlot | null>> = {
    'Monday': {
      '9:00 AM': { id: '1', subject: 'Mathematics', faculty: 'Dr. Smith', room: 'Room 101', duration: '1h', color: 'bg-blue-100 border-blue-300' },
      '10:00 AM': { id: '2', subject: 'Physics', faculty: 'Prof. Johnson', room: 'Lab 201', duration: '1h', color: 'bg-green-100 border-green-300' },
      '11:00 AM': null,
      '12:00 PM': { id: '3', subject: 'Chemistry', faculty: 'Dr. Wilson', room: 'Lab 301', duration: '2h', color: 'bg-purple-100 border-purple-300' },
      '1:00 PM': null,
      '2:00 PM': { id: '4', subject: 'English', faculty: 'Ms. Davis', room: 'Room 102', duration: '1h', color: 'bg-orange-100 border-orange-300' },
      '3:00 PM': null,
      '4:00 PM': null,
      '5:00 PM': null,
    },
    'Tuesday': {
      '9:00 AM': { id: '5', subject: 'Computer Science', faculty: 'Mr. Brown', room: 'Lab 401', duration: '2h', color: 'bg-red-100 border-red-300' },
      '10:00 AM': null,
      '11:00 AM': { id: '6', subject: 'Biology', faculty: 'Dr. Miller', room: 'Lab 501', duration: '1h', color: 'bg-teal-100 border-teal-300' },
      '12:00 PM': null,
      '1:00 PM': { id: '7', subject: 'History', faculty: 'Prof. Taylor', room: 'Room 103', duration: '1h', color: 'bg-yellow-100 border-yellow-300' },
      '2:00 PM': null,
      '3:00 PM': { id: '8', subject: 'Art', faculty: 'Ms. Anderson', room: 'Studio 1', duration: '2h', color: 'bg-pink-100 border-pink-300' },
      '4:00 PM': null,
      '5:00 PM': null,
    },
    // Add more days with similar structure
    'Wednesday': {},
    'Thursday': {},
    'Friday': {},
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Class Schedule</h2>
          <p className="text-muted-foreground">Current Week - Computer Science Dept.</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            Active Timetable
          </Badge>
          {currentRole === 'admin' && (
            <Button variant="outline" size="sm">
              Switch Timetable
            </Button>
          )}
        </div>
      </div>

      <Card className="p-6 shadow-elevated">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 min-w-[800px]">
            {/* Header */}
            <div className="text-center text-sm font-medium text-muted-foreground py-2">
              Time
            </div>
            {days.map(day => (
              <div key={day} className="text-center text-sm font-medium text-foreground py-2 border-b border-border">
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map(time => (
              <div key={time} className="contents">
                <div className="text-center text-sm text-muted-foreground py-4 font-medium">
                  {time}
                </div>
                {days.map(day => {
                  const slot = timetableData[day]?.[time];
                  return (
                    <div key={`${day}-${time}`} className="min-h-[80px] p-1">
                      {slot ? (
                        <Card 
                          className={cn(
                            "p-3 h-full cursor-pointer transition-all duration-200 hover:shadow-elevated",
                            slot.color,
                            currentRole === 'admin' && "hover:scale-105"
                          )}
                          onClick={() => currentRole === 'admin' && onSlotEdit?.(slot)}
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-foreground truncate">
                              {slot.subject}
                            </h4>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="w-3 h-3 mr-1" />
                              <span className="truncate">{slot.faculty}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{slot.room}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{slot.duration}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <div 
                          className={cn(
                            "h-full border-2 border-dashed border-border rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                            currentRole === 'admin' && "hover:bg-primary/5"
                          )}
                          onClick={() => currentRole === 'admin' && console.log('Add new slot')}
                        >
                          {currentRole === 'admin' && (
                            <span className="text-xs text-muted-foreground">+ Add</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}