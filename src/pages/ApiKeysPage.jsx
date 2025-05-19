
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Key, Copy, Eye, EyeOff, Plus, RefreshCw, Clock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

export default function ApiKeysPage() {
  const [activeTab, setActiveTab] = useState('general');
  
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

  // Exchange API keys
  const [exchangeKeys, setExchangeKeys] = useState({
    binance: {
      apiKey: '',
      secretKey: '',
      enabled: false,
      isTestnet: false
    },
    kucoin: {
      apiKey: '',
      secretKey: '',
      passphrase: '',
      enabled: false,
      isTestnet: false
    },
    bybit: {
      apiKey: '',
      secretKey: '',
      enabled: false,
      isTestnet: false
    },
    mexc: {
      apiKey: '',
      secretKey: '',
      enabled: false,
      isTestnet: false
    }
  });

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

  const handleExchangeKeyChange = (exchange, field, value) => {
    setExchangeKeys({
      ...exchangeKeys,
      [exchange]: {
        ...exchangeKeys[exchange],
        [field]: value
      }
    });
  };

  const handleToggleExchange = (exchange) => {
    const currentState = exchangeKeys[exchange].enabled;
    
    if (!currentState && (!exchangeKeys[exchange].apiKey || !exchangeKeys[exchange].secretKey)) {
      toast.error(`Please enter both API key and Secret key for ${exchange.charAt(0).toUpperCase() + exchange.slice(1)}`);
      return;
    }
    
    setExchangeKeys({
      ...exchangeKeys,
      [exchange]: {
        ...exchangeKeys[exchange],
        enabled: !currentState
      }
    });
    
    toast.success(`${exchange.charAt(0).toUpperCase() + exchange.slice(1)} API ${!currentState ? 'enabled' : 'disabled'} successfully`);
  };

  const handleToggleTestnet = (exchange) => {
    setExchangeKeys({
      ...exchangeKeys,
      [exchange]: {
        ...exchangeKeys[exchange],
        isTestnet: !exchangeKeys[exchange].isTestnet
      }
    });
  };

  const handleSaveExchangeKeys = (exchange) => {
    if (!exchangeKeys[exchange].apiKey || !exchangeKeys[exchange].secretKey) {
      toast.error('Please enter both API key and Secret key');
      return;
    }

    // Here you would typically send the data to your backend
    toast.success(`${exchange.charAt(0).toUpperCase() + exchange.slice(1)} API keys saved successfully`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">Manage API keys and exchange connections</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="general">General API Keys</TabsTrigger>
            <TabsTrigger value="exchanges">Exchange Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
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
              <CardFooter>
                <Button onClick={handleCreateKey} className="gap-2">
                  <Plus className="h-4 w-4" /> Generate API Key
                </Button>
              </CardFooter>
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
                  <RadioGroup
                    defaultValue="test"
                    value={newKeyType}
                    onValueChange={(value) => setNewKeyType(value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="test" id="test" />
                      <Label htmlFor="test">Test Key</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="live" id="live" />
                      <Label htmlFor="live">Live Key</Label>
                    </div>
                  </RadioGroup>
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
          </TabsContent>
          
          <TabsContent value="exchanges" className="space-y-6">
            {/* Binance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Binance</CardTitle>
                    <CardDescription>Connect to Binance exchange API</CardDescription>
                  </div>
                  <Badge variant={exchangeKeys.binance.enabled ? "default" : "outline"}>
                    {exchangeKeys.binance.enabled ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="binance-api-key">API Key</Label>
                    <Input
                      id="binance-api-key"
                      type="password"
                      placeholder="Enter your Binance API key"
                      value={exchangeKeys.binance.apiKey}
                      onChange={(e) => handleExchangeKeyChange('binance', 'apiKey', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="binance-secret-key">Secret Key</Label>
                    <Input
                      id="binance-secret-key"
                      type="password"
                      placeholder="Enter your Binance Secret key"
                      value={exchangeKeys.binance.secretKey}
                      onChange={(e) => handleExchangeKeyChange('binance', 'secretKey', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="binance-testnet"
                      checked={exchangeKeys.binance.isTestnet}
                      onCheckedChange={() => handleToggleTestnet('binance')}
                    />
                    <Label htmlFor="binance-testnet" className="font-normal">Use Testnet</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleExchange('binance')}
                >
                  {exchangeKeys.binance.enabled ? 'Disconnect' : 'Connect'}
                </Button>
                <Button onClick={() => handleSaveExchangeKeys('binance')}>Save Keys</Button>
              </CardFooter>
            </Card>
            
            {/* KuCoin */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>KuCoin</CardTitle>
                    <CardDescription>Connect to KuCoin exchange API</CardDescription>
                  </div>
                  <Badge variant={exchangeKeys.kucoin.enabled ? "default" : "outline"}>
                    {exchangeKeys.kucoin.enabled ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="kucoin-api-key">API Key</Label>
                    <Input
                      id="kucoin-api-key"
                      type="password"
                      placeholder="Enter your KuCoin API key"
                      value={exchangeKeys.kucoin.apiKey}
                      onChange={(e) => handleExchangeKeyChange('kucoin', 'apiKey', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kucoin-secret-key">Secret Key</Label>
                    <Input
                      id="kucoin-secret-key"
                      type="password"
                      placeholder="Enter your KuCoin Secret key"
                      value={exchangeKeys.kucoin.secretKey}
                      onChange={(e) => handleExchangeKeyChange('kucoin', 'secretKey', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kucoin-passphrase">Passphrase</Label>
                    <Input
                      id="kucoin-passphrase"
                      type="password"
                      placeholder="Enter your KuCoin Passphrase"
                      value={exchangeKeys.kucoin.passphrase}
                      onChange={(e) => handleExchangeKeyChange('kucoin', 'passphrase', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kucoin-testnet"
                      checked={exchangeKeys.kucoin.isTestnet}
                      onCheckedChange={() => handleToggleTestnet('kucoin')}
                    />
                    <Label htmlFor="kucoin-testnet" className="font-normal">Use Testnet</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleExchange('kucoin')}
                >
                  {exchangeKeys.kucoin.enabled ? 'Disconnect' : 'Connect'}
                </Button>
                <Button onClick={() => handleSaveExchangeKeys('kucoin')}>Save Keys</Button>
              </CardFooter>
            </Card>
            
            {/* Bybit */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bybit</CardTitle>
                    <CardDescription>Connect to Bybit exchange API</CardDescription>
                  </div>
                  <Badge variant={exchangeKeys.bybit.enabled ? "default" : "outline"}>
                    {exchangeKeys.bybit.enabled ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bybit-api-key">API Key</Label>
                    <Input
                      id="bybit-api-key"
                      type="password"
                      placeholder="Enter your Bybit API key"
                      value={exchangeKeys.bybit.apiKey}
                      onChange={(e) => handleExchangeKeyChange('bybit', 'apiKey', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bybit-secret-key">Secret Key</Label>
                    <Input
                      id="bybit-secret-key"
                      type="password"
                      placeholder="Enter your Bybit Secret key"
                      value={exchangeKeys.bybit.secretKey}
                      onChange={(e) => handleExchangeKeyChange('bybit', 'secretKey', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bybit-testnet"
                      checked={exchangeKeys.bybit.isTestnet}
                      onCheckedChange={() => handleToggleTestnet('bybit')}
                    />
                    <Label htmlFor="bybit-testnet" className="font-normal">Use Testnet</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleExchange('bybit')}
                >
                  {exchangeKeys.bybit.enabled ? 'Disconnect' : 'Connect'}
                </Button>
                <Button onClick={() => handleSaveExchangeKeys('bybit')}>Save Keys</Button>
              </CardFooter>
            </Card>
            
            {/* MEXC */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>MEXC</CardTitle>
                    <CardDescription>Connect to MEXC exchange API</CardDescription>
                  </div>
                  <Badge variant={exchangeKeys.mexc.enabled ? "default" : "outline"}>
                    {exchangeKeys.mexc.enabled ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mexc-api-key">API Key</Label>
                    <Input
                      id="mexc-api-key"
                      type="password"
                      placeholder="Enter your MEXC API key"
                      value={exchangeKeys.mexc.apiKey}
                      onChange={(e) => handleExchangeKeyChange('mexc', 'apiKey', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mexc-secret-key">Secret Key</Label>
                    <Input
                      id="mexc-secret-key"
                      type="password"
                      placeholder="Enter your MEXC Secret key"
                      value={exchangeKeys.mexc.secretKey}
                      onChange={(e) => handleExchangeKeyChange('mexc', 'secretKey', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="mexc-testnet"
                      checked={exchangeKeys.mexc.isTestnet}
                      onCheckedChange={() => handleToggleTestnet('mexc')}
                    />
                    <Label htmlFor="mexc-testnet" className="font-normal">Use Testnet</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleExchange('mexc')}
                >
                  {exchangeKeys.mexc.enabled ? 'Disconnect' : 'Connect'}
                </Button>
                <Button onClick={() => handleSaveExchangeKeys('mexc')}>Save Keys</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
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
