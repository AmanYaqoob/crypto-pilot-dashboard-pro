
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, ArrowUpRight, ArrowDownRight, AlertTriangle, XCircle } from 'lucide-react';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Price Alert',
    message: 'BTC has reached your target price of $38,500',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'trade',
    title: 'Trade Executed',
    message: 'Successfully bought 0.25 ETH at $2,780',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'error',
    title: 'API Connection Failed',
    message: 'Failed to connect to Binance API. Please check your API keys.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    type: 'alert',
    title: 'Whale Movement',
    message: 'Large transfer of 1,500 ETH detected from exchange to wallet',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: 5,
    type: 'trade',
    title: 'Trade Executed',
    message: 'Successfully sold 0.15 BTC at $38,100',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'error',
    title: 'Strategy Error',
    message: 'RSI Strategy failed to execute due to insufficient data',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 7,
    type: 'trade',
    title: 'Portfolio Rebalanced',
    message: 'Your portfolio has been automatically rebalanced',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: 8,
    type: 'alert',
    title: 'New Market Analysis',
    message: 'Market sentiment for BTC has changed from Neutral to Bullish',
    timestamp: '3 days ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const tradeCount = notifications.filter(n => n.type === 'trade' && !n.read).length;
  const alertCount = notifications.filter(n => n.type === 'alert' && !n.read).length;
  const errorCount = notifications.filter(n => n.type === 'error' && !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'trade':
        return <ArrowUpRight className="h-5 w-5 text-primary" />;
      case 'alert':
        return <Bell className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="trade">
              Trades
              {tradeCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {tradeCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="alert">
              Alerts
              {alertCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {alertCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="error">
              Errors
              {errorCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {errorCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardContent className="p-0">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredNotifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`flex items-start p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{notification.message}</p>
                        </div>
                        
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-muted rounded-full p-3 mb-4">
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === 'all' 
                        ? "You don't have any notifications yet"
                        : activeTab === 'unread'
                          ? "You've read all your notifications"
                          : `No ${activeTab} notifications`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
