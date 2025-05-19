
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key, Copy, Eye, EyeOff, Plus, RefreshCw, Clock, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key_live_1',
      name: 'Production API Key',
      key: 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      lastUsed: '2 days ago',
      createdAt: 'May 15, 2025',
      permissions: ['read', 'write'],
      type: 'live',
      hidden: true,
    },
    {
      id: 'key_test_1',
      name: 'Development API Key',
      key: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      lastUsed: '5 hours ago',
      createdAt: 'May 10, 2025',
      permissions: ['read', 'write'],
      type: 'test',
      hidden: true,
    }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState('test');
  const [newKeyPermissions, setNewKeyPermissions] = useState({
    read: true,
    write: true,
  });
  const [showNewKey, setShowNewKey] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const toggleKeyVisibility = (keyId) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === keyId ? { ...key, hidden: !key.hidden } : key
      )
    );
  };

  const handleCreateKey = () => {
    if (!newKeyName) {
      toast.error('Please provide a name for your API key');
      return;
    }

    const permissions = Object.keys(newKeyPermissions).filter(
      (perm) => newKeyPermissions[perm]
    );
    
    // Generate a mock key
    const generatedKey = newKeyType === 'live' 
      ? `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      : `sk_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    setGeneratedKey(generatedKey);
    setShowNewKey(true);
    
    const newKey = {
      id: `key_${newKeyType}_${apiKeys.length + 1}`,
      name: newKeyName,
      key: generatedKey,
      lastUsed: 'Never',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      permissions,
      type: newKeyType,
      hidden: false,
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleFinishCreation = () => {
    setShowNewKey(false);
    setGeneratedKey('');
  };

  const handleRevokeKey = (keyId) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId));
    toast.success('API key revoked successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">Manage API keys to interact with our services programmatically</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              API keys grant programmatic access to your account. Treat them like passwords and never share them publicly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <Badge variant={apiKey.type === 'live' ? "destructive" : "secondary"}>
                          {apiKey.type === 'live' ? 'Live' : 'Test'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Created on {apiKey.createdAt}</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleRevokeKey(apiKey.id)}>
                      Revoke
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono flex-1">
                      {apiKey.hidden ? apiKey.key.replace(/./g, '•') : apiKey.key}
                    </code>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleKeyVisibility(apiKey.id)}>
                      {apiKey.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCopyKey(apiKey.key)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>Permissions: {apiKey.permissions.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}

              {apiKeys.length === 0 && (
                <div className="text-center py-8">
                  <Key className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 font-medium">No API Keys</h3>
                  <p className="text-sm text-muted-foreground mt-1">Create an API key to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create New API Key</CardTitle>
            <CardDescription>
              Generate a new API key for programmatic access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="keyName">API Key Name</Label>
              <Input 
                id="keyName"
                placeholder="e.g., Production Backend" 
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Key Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="test" 
                    name="keyType" 
                    value="test" 
                    checked={newKeyType === 'test'}
                    onChange={() => setNewKeyType('test')} 
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="test" className="font-normal">Test Key</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="live" 
                    name="keyType" 
                    value="live" 
                    checked={newKeyType === 'live'}
                    onChange={() => setNewKeyType('live')} 
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="live" className="font-normal">Live Key</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="read-permission"
                    checked={newKeyPermissions.read}
                    onCheckedChange={(checked) => setNewKeyPermissions({ ...newKeyPermissions, read: checked })}
                  />
                  <Label htmlFor="read-permission" className="font-normal">Read Access</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="write-permission"
                    checked={newKeyPermissions.write}
                    onCheckedChange={(checked) => setNewKeyPermissions({ ...newKeyPermissions, write: checked })}
                  />
                  <Label htmlFor="write-permission" className="font-normal">Write Access</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateKey} className="gap-2">
              <Plus className="h-4 w-4" /> Generate API Key
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showNewKey} onOpenChange={setShowNewKey}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              This is your new API key. Make sure to copy it now as you won't be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 bg-muted p-3 rounded-md">
            <code className="text-sm font-mono flex-1 break-all">{generatedKey}</code>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCopyKey(generatedKey)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button onClick={handleFinishCreation}>
              I've copied my key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
