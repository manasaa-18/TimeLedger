import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilitySlot {
  id: string;
  day: string;
  time: string;
  available: boolean;
  reason?: string;
}

export function FacultyAvailability() {
  const [availabilityData, setAvailabilityData] = useState<AvailabilitySlot[]>([
    { id: '1', day: 'Monday', time: '9:00 AM - 10:00 AM', available: true },
    { id: '2', day: 'Monday', time: '10:00 AM - 11:00 AM', available: true },
    { id: '3', day: 'Monday', time: '11:00 AM - 12:00 PM', available: false, reason: 'Meeting' },
    { id: '4', day: 'Monday', time: '2:00 PM - 3:00 PM', available: true },
    { id: '5', day: 'Tuesday', time: '9:00 AM - 10:00 AM', available: true },
    { id: '6', day: 'Tuesday', time: '10:00 AM - 11:00 AM', available: false, reason: 'Research' },
    { id: '7', day: 'Tuesday', time: '2:00 PM - 3:00 PM', available: true },
    { id: '8', day: 'Wednesday', time: '9:00 AM - 10:00 AM', available: true },
  ]);

  const toggleAvailability = (id: string) => {
    setAvailabilityData(prev => 
      prev.map(slot => 
        slot.id === id 
          ? { ...slot, available: !slot.available, reason: slot.available ? 'Not Available' : undefined }
          : slot
      )
    );
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM'];

  const getSlotForDayAndTime = (day: string, time: string) => {
    return availabilityData.find(slot => slot.day === day && slot.time === time);
  };

  const availableCount = availabilityData.filter(slot => slot.available).length;
  const totalSlots = availabilityData.length;
  const availabilityPercentage = Math.round((availableCount / totalSlots) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Availability</h2>
          <p className="text-muted-foreground">Manage your teaching schedule availability</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={cn(
            "text-sm",
            availabilityPercentage >= 80 ? "bg-green-100 text-green-800" :
            availabilityPercentage >= 60 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          )}>
            {availabilityPercentage}% Available
          </Badge>
          <Button variant="premium">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Available Slots</p>
              <p className="text-3xl font-bold text-green-600">{availableCount}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unavailable Slots</p>
              <p className="text-3xl font-bold text-red-600">{totalSlots - availableCount}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly Hours</p>
              <p className="text-3xl font-bold text-blue-600">{availableCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Availability Grid */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Weekly Availability</h3>
        
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 min-w-[800px]">
            {/* Header */}
            <div className="text-center text-sm font-medium text-muted-foreground py-2">
              Time Slots
            </div>
            {days.map(day => (
              <div key={day} className="text-center text-sm font-medium text-foreground py-2 border-b border-border">
                {day}
              </div>
            ))}

            {/* Time slots and availability */}
            {timeSlots.map(time => (
              <div key={time} className="contents">
                <div className="text-center text-sm text-muted-foreground py-4 font-medium">
                  {time}
                </div>
                {days.map(day => {
                  const slot = getSlotForDayAndTime(day, time);
                  return (
                    <div key={`${day}-${time}`} className="p-2">
                      {slot ? (
                        <Card className={cn(
                          "p-4 transition-all duration-200 hover:shadow-elevated",
                          slot.available 
                            ? "bg-green-50 border-green-200 hover:bg-green-100" 
                            : "bg-red-50 border-red-200 hover:bg-red-100"
                        )}>
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                slot.available 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              )}
                            >
                              {slot.available ? 'Available' : 'Unavailable'}
                            </Badge>
                            <Switch
                              checked={slot.available}
                              onCheckedChange={() => toggleAvailability(slot.id)}
                            />
                          </div>
                          {slot.reason && !slot.available && (
                            <div className="flex items-center text-xs text-red-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{slot.reason}</span>
                            </div>
                          )}
                        </Card>
                      ) : (
                        <div className="h-20 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-xs text-gray-400">Not Scheduled</span>
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

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            Mark All Available This Week
          </Button>
          <Button variant="outline" className="w-full">
            Copy Previous Week
          </Button>
          <Button variant="outline" className="w-full">
            Request Schedule Change
          </Button>
        </div>
      </Card>
    </div>
  );
}