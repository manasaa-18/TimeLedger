import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'update' | 'alert' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgent?: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationPanel({ notifications, onMarkAsRead, onDismiss }: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'update':
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string, urgent?: boolean) => {
    if (urgent) return 'border-l-destructive';
    switch (type) {
      case 'alert':
        return 'border-l-destructive';
      case 'success':
        return 'border-l-green-500';
      case 'update':
        return 'border-l-primary';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-glow-pulse">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          Mark All Read
        </Button>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "p-4 transition-all duration-200 hover:shadow-elevated border-l-4",
                getNotificationColor(notification.type, notification.urgent),
                !notification.read && "bg-primary/5",
                notification.urgent && "animate-glow-pulse"
              )}
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={cn(
                        "text-sm font-semibold",
                        !notification.read ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {notification.title}
                      </h4>
                      {notification.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm",
                      !notification.read ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs"
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(notification.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}