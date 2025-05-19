
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, Cpu, BarChart3, Brain, Check, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CreateAgentPage() {
  const navigate = useNavigate();
  const [agentType, setAgentType] = useState('trade');
  const [agentName, setAgentName] = useState('');
  const [symbol, setSymbol] = useState('BTC');
  const [description, setDescription] = useState('');
  const [strategy, setStrategy] = useState('momentum');
  const [timeframe, setTimeframe] = useState('4h');
  const [riskLevel, setRiskLevel] = useState([50]);
  const [advanced, setAdvanced] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Agent created successfully!');
    navigate('/agents');
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/agents')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold font-heading">Create New Agent</h1>
        <p className="text-muted-foreground">Configure your AI-powered trading or analysis agent</p>
        
        <div className="relative">
          {/* Progress Steps */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted bg-background'}`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs mt-2">Type</span>
              </div>
              <div className="flex-1 h-px bg-border mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted bg-background'}`}>
                  {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <span className="text-xs mt-2">Configure</span>
              </div>
              <div className="flex-1 h-px bg-border mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${step >= 3 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted bg-background'}`}>
                  3
                </div>
                <span className="text-xs mt-2">Review</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="font-heading">Select Agent Type</CardTitle>
                <CardDescription>Choose what kind of agent you want to create</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={agentType} onValueChange={setAgentType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem
                      value="trade"
                      id="trade"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="trade"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Cpu className="mb-3 h-6 w-6" />
                      <div className="font-medium">Trading Agent</div>
                      <p className="text-sm text-center text-muted-foreground">
                        Automates buying and selling based on rules and signals
                      </p>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="portfolio"
                      id="portfolio"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="portfolio"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <BarChart3 className="mb-3 h-6 w-6" />
                      <div className="font-medium">Portfolio Manager</div>
                      <p className="text-sm text-center text-muted-foreground">
                        Monitors and rebalances your holdings
                      </p>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="intel"
                      id="intel"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="intel"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Brain className="mb-3 h-6 w-6" />
                      <div className="font-medium">Market Intelligence</div>
                      <p className="text-sm text-center text-muted-foreground">
                        Analyzes trends and provides insights
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={nextStep}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="font-heading">Configure Your Agent</CardTitle>
                <CardDescription>Set up the parameters for your {agentType} agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      placeholder={agentType === 'trade' ? "BTC Momentum Trader" : agentType === 'portfolio' ? "Daily Rebalancer" : "Trend Analyzer"}
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this agent does..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                
                {agentType === 'trade' && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Select value={symbol} onValueChange={setSymbol}>
                        <SelectTrigger id="symbol">
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                          <SelectItem value="SOL">Solana (SOL)</SelectItem>
                          <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="strategy">Strategy</Label>
                      <Select value={strategy} onValueChange={setStrategy}>
                        <SelectTrigger id="strategy">
                          <SelectValue placeholder="Select trading strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="momentum">Momentum</SelectItem>
                          <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                          <SelectItem value="breakout">Breakout</SelectItem>
                          <SelectItem value="dca">Dollar Cost Averaging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5m">5 minutes</SelectItem>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                          <SelectItem value="1d">1 day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {agentType === 'portfolio' && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="rebalance-frequency">Rebalancing Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="rebalance-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {agentType === 'intel' && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="data-sources">Data Sources</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="data-sources">
                          <SelectValue placeholder="Select data sources" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sources</SelectItem>
                          <SelectItem value="price">Price Data Only</SelectItem>
                          <SelectItem value="sentiment">Social Sentiment</SelectItem>
                          <SelectItem value="news">News Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <span className="text-sm">{riskLevel}%</span>
                  </div>
                  <Slider
                    id="risk-level"
                    min={0}
                    max={100}
                    step={1}
                    value={riskLevel}
                    onValueChange={setRiskLevel}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="advanced" checked={advanced} onCheckedChange={setAdvanced} />
                  <Label htmlFor="advanced">Advanced Configuration</Label>
                </div>
                
                {advanced && (
                  <div className="rounded-md border p-4 space-y-4">
                    <div className="text-sm font-medium">Advanced Settings</div>
                    <div className="grid gap-2">
                      <Label>Custom Parameters</Label>
                      <Textarea placeholder="Enter JSON configuration..." />
                      <p className="text-xs text-muted-foreground">
                        For advanced users. Enter custom JSON parameters for fine-tuning.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="font-heading">Review & Create</CardTitle>
                <CardDescription>Review your agent configuration before creating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Agent Type</p>
                      <p className="text-sm text-muted-foreground capitalize">{agentType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{agentName || "Unnamed Agent"}</p>
                    </div>
                    
                    {agentType === 'trade' && (
                      <>
                        <div>
                          <p className="text-sm font-medium">Symbol</p>
                          <p className="text-sm text-muted-foreground">{symbol}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Strategy</p>
                          <p className="text-sm text-muted-foreground capitalize">{strategy}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Timeframe</p>
                          <p className="text-sm text-muted-foreground">{timeframe}</p>
                        </div>
                      </>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium">Risk Level</p>
                      <p className="text-sm text-muted-foreground">{riskLevel}%</p>
                    </div>
                  </div>
                  
                  {description && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center p-4 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Important Notice</p>
                    <p className="mt-1">
                      This agent will operate based on the parameters you've set. Please ensure your account has sufficient funds and API access if applicable.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleSubmit}>
                  Create Agent <Check className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
