
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plus,
  Cpu,
  Play,
  Pause,
  Edit,
  BarChart3,
  Brain,
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const mockAgents = [
  {
    id: 1,
    name: 'BTC Swing Trader',
    type: 'trade',
    symbol: 'BTC',
    status: 'running',
    lastRun: '10 min ago',
    profitLoss: '+2.4%',
    description: 'Trades BTC on 4hr timeframes using momentum strategy'
  },
  {
    id: 2,
    name: 'Portfolio Rebalancer',
    type: 'portfolio',
    status: 'running',
    lastRun: '2 hours ago',
    profitLoss: '-0.3%',
    description: 'Automatically rebalances portfolio to target allocations'
  },
  {
    id: 3,
    name: 'ETH DCA Bot',
    type: 'trade',
    symbol: 'ETH',
    status: 'paused',
    lastRun: '1 day ago',
    profitLoss: '+5.2%',
    description: 'Dollar cost averaging strategy for ETH'
  },
  {
    id: 4,
    name: 'Market Intelligence',
    type: 'intel',
    status: 'running',
    lastRun: '35 min ago',
    description: 'Analyzes market trends and generates trading signals'
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockAgents);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredAgents = agents.filter(agent => {
    if (filter === 'all') return true;
    if (filter === 'running') return agent.status === 'running';
    if (filter === 'paused') return agent.status === 'paused';
    if (filter === 'trade') return agent.type === 'trade';
    if (filter === 'portfolio') return agent.type === 'portfolio';
    if (filter === 'intel') return agent.type === 'intel';
    return true;
  });

  const toggleAgentStatus = (id) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        return {
          ...agent,
          status: agent.status === 'running' ? 'paused' : 'running'
        };
      }
      return agent;
    }));
  };

  const handleCreateAgent = () => {
    navigate('/agents/create');
  };

  const handleEditAgent = (id) => {
    navigate(`/agents/edit/${id}`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trade':
        return <Cpu className="h-5 w-5" />;
      case 'portfolio':
        return <BarChart3 className="h-5 w-5" />;
      case 'intel':
        return <Brain className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'paused':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Agents</h1>
          <Button onClick={handleCreateAgent}>
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-[400px]" onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="running">Running</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="trade">Trade</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="intel">Intel</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map(agent => (
            <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      {getTypeIcon(agent.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{agent.name}</CardTitle>
                      {agent.symbol && (
                        <Badge variant="outline" className="mt-1">
                          {agent.symbol}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                <div className="flex justify-between items-center text-xs mb-4">
                  <span className="text-muted-foreground">Last run: {agent.lastRun}</span>
                  {agent.profitLoss && (
                    <span className={agent.profitLoss.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {agent.profitLoss}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => toggleAgentStatus(agent.id)}>
                    {agent.status === 'running' ? (
                      <>
                        <Pause className="h-3.5 w-3.5 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditAgent(agent.id)}>
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create Agent Card */}
          <Card 
            className="border-dashed border-2 flex flex-col items-center justify-center h-full min-h-[220px] hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={handleCreateAgent}
          >
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Create New Agent</h3>
              <p className="text-sm text-muted-foreground">
                Set up a new AI agent for trading, portfolio management or market intelligence
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
