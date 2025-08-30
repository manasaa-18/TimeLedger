import { Calendar, Users, Clock, Bell, Settings, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentRole: 'admin' | 'faculty' | 'student';
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ currentRole, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen, roles: ['admin', 'faculty', 'student'] },
    { id: 'timetables', label: 'Timetables', icon: Calendar, roles: ['admin', 'faculty', 'student'] },
    { id: 'faculty', label: 'Faculty Management', icon: Users, roles: ['admin'] },
    { id: 'availability', label: 'My Availability', icon: Clock, roles: ['faculty'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'faculty', 'student'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'faculty', 'student'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TimeFlux</h1>
            <p className="text-sm text-muted-foreground capitalize">{currentRole} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                isActive && "bg-gradient-primary text-primary-foreground shadow-glow"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 p-2">
          <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">John Doe</p>
            <p className="text-muted-foreground capitalize">{currentRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}