
import { useState } from 'react';
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
  Trash2,
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

  const deleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
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
          <Button>
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.75C8.12132 13.75 8.625 13.2513 8.625 12.63C8.625 12.0087 8.12132 11.51 7.5 11.51C6.87868 11.51 6.375 12.0087 6.375 12.63C6.375 13.2513 6.87868 13.75 7.5 13.75Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteAgent(agent.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create Agent Card */}
          <Card className="border-dashed border-2 flex flex-col items-center justify-center h-full min-h-[220px] hover:bg-muted/30 transition-colors cursor-pointer">
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
