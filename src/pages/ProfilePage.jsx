
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Shield, Key, Lock, UserCircle, LogOut, User, Mail } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleToggle2FA = (checked) => {
    setTwoFactorEnabled(checked);
    if (checked) {
      toast.success('Two-factor authentication enabled');
    } else {
      toast('Two-factor authentication disabled', {
        description: 'Your account is now less secure'
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading">Profile & Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar with user info */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" alt={formData.name} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mt-4 font-heading">{formData.name}</h2>
                  <p className="text-muted-foreground">{formData.email}</p>
                  
                  <div className="mt-4 flex flex-col w-full space-y-2">
                    <Button className="w-full" variant="outline">
                      <UserCircle className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Lock className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Key className="mr-2 h-4 w-4" /> Manage API Keys
                    </Button>
                    <Separator className="my-4" />
                    <Button className="w-full" variant="destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side tabs with settings */}
          <div className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Change Password</CardTitle>
                    <CardDescription>
                      Update your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center font-heading">
                      <Shield className="mr-2 h-5 w-5" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Protect your account with an authentication app
                        </p>
                      </div>
                      <Switch 
                        checked={twoFactorEnabled} 
                        onCheckedChange={handleToggle2FA}
                      />
                    </div>
                    
                    {twoFactorEnabled && (
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <p className="text-sm">Two-factor authentication is enabled for your account.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center font-heading">
                      <Key className="mr-2 h-5 w-5" />
                      API Keys
                    </CardTitle>
                    <CardDescription>
                      Manage your exchange API keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Binance API</p>
                        <p className="text-sm text-muted-foreground">
                          Connected on May 2, 2025
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Coinbase API</p>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <Separator />
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Key className="mr-2 h-4 w-4" /> Add New API Key
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
