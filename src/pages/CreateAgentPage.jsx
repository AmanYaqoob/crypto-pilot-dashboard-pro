
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CreateAgentPage() {
  const navigate = useNavigate();
  
  // Form states
  const [agentType, setAgentType] = useState('trade');
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [symbol, setSymbol] = useState('');
  const [strategy, setStrategy] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [riskLevel, setRiskLevel] = useState([50]);
  const [advanced, setAdvanced] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!agentName) {
      toast.error('Please provide a name for your agent');
      return;
    }
    
    // Create agent logic would go here
    toast.success('Agent created successfully!');
    navigate('/agents');
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
        
        <div>
          <h1 className="text-3xl font-bold">Create New Agent</h1>
          <p className="text-muted-foreground">Set up an AI-powered trading or analysis agent</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Configure your new AI agent</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Agent Type</Label>
                  <RadioGroup
                    value={agentType}
                    onValueChange={setAgentType}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="trade" id="trade" className="peer sr-only" />
                      <Label
                        htmlFor="trade"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 p-2 rounded-full bg-primary/10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            <path d="M12 12v9"></path>
                            <path d="m8 17 4 4 4-4"></path>
                          </svg>
                        </div>
                        <div className="font-medium">Trader</div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Executes crypto trades based on strategy
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="portfolio" id="portfolio" className="peer sr-only" />
                      <Label
                        htmlFor="portfolio"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 p-2 rounded-full bg-primary/10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                            <line x1="2" x2="22" y1="10" y2="10"></line>
                          </svg>
                        </div>
                        <div className="font-medium">Portfolio</div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Manages asset allocation and rebalancing
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="intel" id="intel" className="peer sr-only" />
                      <Label
                        htmlFor="intel"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-2 p-2 rounded-full bg-primary/10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                            <line x1="2" x2="22" y1="10" y2="10"></line>
                          </svg>
                        </div>
                        <div className="font-medium">Intelligence</div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Analyzes market data and provides insights
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    placeholder="My Trading Bot"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What does this agent do?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              
              {agentType === 'trade' && (
                <>
                  <Separator />
                  <div className="grid gap-4">
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
                  </div>
                </>
              )}
              
              <Separator />
              
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
              
              <div className="flex items-center p-4 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-400">
                <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Ready to Create</p>
                  <p className="mt-1">
                    Your agent will be ready to start trading immediately after creation. You can pause it any time.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/agents')}>
                Cancel
              </Button>
              <Button type="submit">
                Create Agent
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
