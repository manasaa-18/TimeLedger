import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { TimetableGrid } from '@/components/TimetableGrid';
import { NotificationPanel } from '@/components/NotificationPanel';
import { FacultyAvailability } from '@/components/FacultyAvailability';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<'admin' | 'faculty' | 'student'>('admin');
  const [activeSection, setActiveSection] = useState('dashboard');
  const { toast } = useToast();

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'update' as const,
      title: 'Timetable Updated',
      message: 'Mathematics class for Monday 10:00 AM has been moved to Room 102',
      timestamp: '2 minutes ago',
      read: false,
      urgent: false,
    },
    {
      id: '2',
      type: 'alert' as const,
      title: 'Faculty Unavailable',
      message: 'Dr. Smith marked unavailable for Wednesday 2:00 PM slot',
      timestamp: '15 minutes ago',
      read: false,
      urgent: true,
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Schedule Conflict Resolved',
      message: 'Physics lab timing has been successfully adjusted',
      timestamp: '1 hour ago',
      read: true,
      urgent: false,
    },
    {
      id: '4',
      type: 'info' as const,
      title: 'New Faculty Added',
      message: 'Prof. Johnson has been added to Computer Science department',
      timestamp: '2 hours ago',
      read: true,
      urgent: false,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Notification marked as read",
      duration: 2000,
    });
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification dismissed",
      duration: 2000,
    });
  };

  const handleSlotEdit = (slot: any) => {
    toast({
      title: "Edit Slot",
      description: `Editing ${slot.subject} - ${slot.faculty}`,
      duration: 3000,
    });
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard currentRole={currentRole} />;
      case 'timetables':
        return <TimetableGrid currentRole={currentRole} onSlotEdit={handleSlotEdit} />;
      case 'faculty':
        return currentRole === 'admin' ? (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Faculty Management</h3>
            <p className="text-muted-foreground">Faculty management interface would be implemented here</p>
          </Card>
        ) : null;
      case 'availability':
        return currentRole === 'faculty' ? <FacultyAvailability /> : null;
      case 'notifications':
        return (
          <NotificationPanel 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismissNotification}
          />
        );
      case 'settings':
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p className="text-muted-foreground">Settings interface would be implemented here</p>
          </Card>
        );
      default:
        return <Dashboard currentRole={currentRole} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        currentRole={currentRole}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground capitalize">
              {activeSection === 'dashboard' ? 'Dashboard' : activeSection.replace(/([A-Z])/g, ' $1')}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Role Switcher (for demo purposes) */}
            <div className="flex space-x-2">
              {(['admin', 'faculty', 'student'] as const).map((role) => (
                <Button
                  key={role}
                  variant={currentRole === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentRole(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ))}
            </div>
            
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setActiveSection('notifications')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            
            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            
            {/* Profile/Logout */}
            <Button variant="ghost" size="sm">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
