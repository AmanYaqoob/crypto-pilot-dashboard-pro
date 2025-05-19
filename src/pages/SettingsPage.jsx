import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Laptop, Settings, BellRing, Eye, EyeOff, Key } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const { theme, changeTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [tradingAlerts, setTradingAlerts] = React.useState(true);
  const [marketUpdates, setMarketUpdates] = React.useState(false);
  const [language, setLanguage] = React.useState('english');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your platform experience</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="api" asChild>
              <Link to="/api-keys">API Keys</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your basic account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API access tokens</CardDescription>
                </div>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage API keys to integrate with our platform programmatically.
                </p>
                <Button asChild>
                  <Link to="/api-keys" className="gap-2">
                    <Key className="h-4 w-4" /> Manage API Keys
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trading-alerts">Trading Alerts</Label>
                    <p className="text-sm text-muted-foreground">Price movements and trade execution alerts</p>
                  </div>
                  <Switch 
                    id="trading-alerts" 
                    checked={tradingAlerts}
                    onCheckedChange={setTradingAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="market-updates">Market Updates</Label>
                    <p className="text-sm text-muted-foreground">Regular market analysis and news</p>
                  </div>
                  <Switch 
                    id="market-updates" 
                    checked={marketUpdates}
                    onCheckedChange={setMarketUpdates}
                  />
                </div>

                <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Dark Themes</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === 'dark-default' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('dark-default')}
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-500 mb-1"></div>
                      <span>Default Dark</span>
                    </Button>

                    <Button
                      variant={theme === 'dark-purple' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('dark-purple')}
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500 mb-1"></div>
                      <span>Purple Dark</span>
                    </Button>

                    <Button
                      variant={theme === 'dark-green' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('dark-green')}
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 mb-1"></div>
                      <span>Green Dark</span>
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Light Themes</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === 'light-default' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('light-default')}
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-300 mb-1"></div>
                      <span>Default Light</span>
                    </Button>

                    <Button
                      variant={theme === 'light-blue' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('light-blue')}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-300 mb-1"></div>
                      <span>Blue Light</span>
                    </Button>

                    <Button
                      variant={theme === 'light-warm' ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
                      onClick={() => changeTheme('light-warm')}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-300 mb-1"></div>
                      <span>Warm Light</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Anonymous usage data helps us improve the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your trading profile visible to others</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
