
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { ArrowLeft, Cpu, BarChart3, Brain, Check, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data - in a real app, this would come from an API
const mockAgents = [
  {
    id: 1,
    name: 'BTC Swing Trader',
    type: 'trade',
    symbol: 'BTC',
    status: 'running',
    lastRun: '10 min ago',
    profitLoss: '+2.4%',
    description: 'Trades BTC on 4hr timeframes using momentum strategy',
    strategy: 'momentum',
    timeframe: '4h',
    riskLevel: 50,
    advanced: false
  },
  {
    id: 2,
    name: 'Portfolio Rebalancer',
    type: 'portfolio',
    status: 'running',
    lastRun: '2 hours ago',
    profitLoss: '-0.3%',
    description: 'Automatically rebalances portfolio to target allocations',
    riskLevel: 30,
    advanced: false
  },
  {
    id: 3,
    name: 'ETH DCA Bot',
    type: 'trade',
    symbol: 'ETH',
    status: 'paused',
    lastRun: '1 day ago',
    profitLoss: '+5.2%',
    description: 'Dollar cost averaging strategy for ETH',
    strategy: 'dca',
    timeframe: '1d',
    riskLevel: 20,
    advanced: false
  },
  {
    id: 4,
    name: 'Market Intelligence',
    type: 'intel',
    status: 'running',
    lastRun: '35 min ago',
    description: 'Analyzes market trends and generates trading signals',
    riskLevel: 40,
    advanced: false
  },
];

export default function EditAgentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState(null);
  
  // Form states
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [symbol, setSymbol] = useState('');
  const [strategy, setStrategy] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [riskLevel, setRiskLevel] = useState([50]);
  const [advanced, setAdvanced] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchAgent = () => {
      setLoading(true);
      setTimeout(() => {
        const foundAgent = mockAgents.find(a => a.id === parseInt(id));
        if (foundAgent) {
          setAgent(foundAgent);
          // Initialize form fields
          setAgentName(foundAgent.name);
          setDescription(foundAgent.description);
          setSymbol(foundAgent.symbol || '');
          setStrategy(foundAgent.strategy || '');
          setTimeframe(foundAgent.timeframe || '');
          setRiskLevel([foundAgent.riskLevel]);
          setAdvanced(foundAgent.advanced);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchAgent();
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update agent logic would go here
    toast.success('Agent updated successfully!');
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
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
            <Card className="mt-6">
              <CardHeader>
                <Skeleton className="h-7 w-1/4 mb-2" />
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : agent ? (
          <>
            <div>
              <h1 className="text-3xl font-bold">Edit Agent: {agent.name}</h1>
              <p className="text-muted-foreground">Update your AI-powered trading or analysis agent</p>
            </div>
            
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Agent Configuration</CardTitle>
                  <CardDescription>Modify settings for your {agent.type} agent</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input
                        id="agent-name"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {agent.type === 'trade' && (
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
                  
                  <div className="flex items-center p-4 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Important Notice</p>
                      <p className="mt-1">
                        Updating this agent will reset its current running state. You may need to restart it after saving changes.
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => navigate('/agents')}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes <Check className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">Agent Not Found</h3>
            <p className="text-muted-foreground">The requested agent could not be found.</p>
            <Button className="mt-4" onClick={() => navigate('/agents')}>
              Return to Agents
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
