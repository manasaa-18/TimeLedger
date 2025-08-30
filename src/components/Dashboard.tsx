import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  currentRole: 'admin' | 'faculty' | 'student';
}

export function Dashboard({ currentRole }: DashboardProps) {
  const getStatsCards = () => {
    if (currentRole === 'admin') {
      return [
        { title: 'Active Timetables', value: '3', icon: Calendar, color: 'text-blue-600', change: '+2 this week' },
        { title: 'Faculty Members', value: '24', icon: Users, color: 'text-green-600', change: '+1 new' },
        { title: 'Total Classes', value: '156', icon: Clock, color: 'text-purple-600', change: '+12 this week' },
        { title: 'Pending Changes', value: '5', icon: AlertCircle, color: 'text-orange-600', change: 'Requires attention' },
      ];
    } else if (currentRole === 'faculty') {
      return [
        { title: 'Today\'s Classes', value: '4', icon: Calendar, color: 'text-blue-600', change: '2 hours remaining' },
        { title: 'This Week', value: '18', icon: Clock, color: 'text-green-600', change: '22 hours total' },
        { title: 'Availability', value: '85%', icon: CheckCircle2, color: 'text-purple-600', change: 'Good coverage' },
        { title: 'Notifications', value: '3', icon: AlertCircle, color: 'text-orange-600', change: '1 urgent' },
      ];
    } else {
      return [
        { title: 'Today\'s Classes', value: '6', icon: Calendar, color: 'text-blue-600', change: 'Next: 2:00 PM' },
        { title: 'This Week', value: '24', icon: Clock, color: 'text-green-600', change: '30 hours total' },
        { title: 'Attendance', value: '92%', icon: TrendingUp, color: 'text-purple-600', change: '+3% this month' },
        { title: 'Updates', value: '2', icon: AlertCircle, color: 'text-orange-600', change: 'Schedule changes' },
      ];
    }
  };

  const getQuickActions = () => {
    if (currentRole === 'admin') {
      return [
        { label: 'Create New Timetable', variant: 'hero' as const },
        { label: 'Manage Faculty', variant: 'default' as const },
        { label: 'View Reports', variant: 'outline' as const },
      ];
    } else if (currentRole === 'faculty') {
      return [
        { label: 'Mark Availability', variant: 'hero' as const },
        { label: 'View Schedule', variant: 'default' as const },
        { label: 'Submit Request', variant: 'outline' as const },
      ];
    } else {
      return [
        { label: 'View Today\'s Schedule', variant: 'hero' as const },
        { label: 'Check Updates', variant: 'default' as const },
        { label: 'Download Timetable', variant: 'outline' as const },
      ];
    }
  };

  const statsCards = getStatsCards();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {currentRole === 'admin' ? 'Administrator' : currentRole === 'faculty' ? 'Professor' : 'Student'}!
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          {currentRole === 'admin' 
            ? 'Manage your institution\'s schedules and faculty assignments.' 
            : currentRole === 'faculty' 
            ? 'Your teaching schedule and availability management.' 
            : 'Stay updated with your class schedules and announcements.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-elevated transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-secondary ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="w-full justify-start"
                size="lg"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Timetable updated successfully</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New faculty member added</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Schedule conflict resolved</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Status */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Current Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-secondary rounded-lg">
            <Badge variant="outline" className="mb-2">Active</Badge>
            <p className="text-sm text-muted-foreground">System Status</p>
          </div>
          <div className="text-center p-4 bg-gradient-secondary rounded-lg">
            <Badge variant="outline" className="mb-2 bg-green-100 text-green-800">Online</Badge>
            <p className="text-sm text-muted-foreground">Faculty Availability</p>
          </div>
          <div className="text-center p-4 bg-gradient-secondary rounded-lg">
            <Badge variant="outline" className="mb-2 bg-blue-100 text-blue-800">Synced</Badge>
            <p className="text-sm text-muted-foreground">Data Synchronization</p>
          </div>
        </div>
      </Card>
    </div>
  );
}