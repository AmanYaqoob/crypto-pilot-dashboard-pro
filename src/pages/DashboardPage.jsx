
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Plus, TrendingUp, TrendingDown, Cpu, AlertTriangle } from 'lucide-react';

// Mock data for the dashboard
const generateMockData = () => {
  // Portfolio value data (7 days)
  const portfolioData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Generate a somewhat realistic upward trend with some volatility
    const baseValue = 10000 + (i * 500); // Base increasing trend
    const randomVariation = Math.random() * 1000 - 500; // Random variation
    
    return {
      date: formattedDate,
      value: baseValue + randomVariation,
    };
  });
  
  // Calculate total portfolio value and 24h change
  const currentValue = portfolioData[portfolioData.length - 1].value;
  const previousValue = portfolioData[portfolioData.length - 2].value;
  const changePercent = ((currentValue - previousValue) / previousValue) * 100;
  
  // Generate recent PnL data (sparkline)
  const pnlData = Array.from({ length: 14 }, (_, i) => {
    return {
      day: i + 1,
      profit: Math.random() * 500 - 200, // Random profit/loss between -200 and 300
    };
  });
  
  // Trade opportunities
  const tradeOpportunities = [
    { id: 1, coin: 'BTC', action: 'Buy', price: '36,842.25', change: '+2.4%', signal: 'Strong Buy' },
    { id: 2, coin: 'ETH', action: 'Hold', price: '1,975.30', change: '-0.8%', signal: 'Neutral' },
    { id: 3, coin: 'SOL', action: 'Buy', price: '102.45', change: '+5.2%', signal: 'Buy' },
    { id: 4, coin: 'AVAX', action: 'Sell', price: '28.76', change: '-3.1%', signal: 'Sell' },
  ];
  
  // Recent actions
  const recentActions = [
    { id: 1, agent: 'BTC Trader', action: 'Bought 0.05 BTC', timestamp: '10 minutes ago' },
    { id: 2, agent: 'Portfolio Rebalancer', action: 'Sold 2.4 SOL', timestamp: '42 minutes ago' },
    { id: 3, agent: 'ETH DCA Bot', action: 'Bought 0.3 ETH', timestamp: '2 hours ago' },
    { id: 4, agent: 'Stop Loss Monitor', action: 'Updated stop loss for ADA', timestamp: '4 hours ago' },
  ];
  
  return {
    portfolioValue: currentValue.toFixed(2),
    portfolioChangePercent: changePercent.toFixed(2),
    activeAgents: 3,
    alertsCount: 2,
    portfolioData,
    pnlData,
    tradeOpportunities,
    recentActions,
  };
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  
  useEffect(() => {
    // In a real app, we'd fetch this data from an API
    setDashboardData(generateMockData());
  }, []);
  
  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </div>

        {/* Top widgets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Portfolio Value Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2">
                <div className="text-2xl font-bold">${dashboardData.portfolioValue}</div>
                <div className={`flex items-center ${Number(dashboardData.portfolioChangePercent) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Number(dashboardData.portfolioChangePercent) >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{dashboardData.portfolioChangePercent}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Agents Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold flex items-center">
                <Cpu className="h-5 w-5 mr-2 text-primary" />
                {dashboardData.activeAgents}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Create New Agent
              </Button>
            </CardContent>
          </Card>

          {/* Recent PnL Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={dashboardData.pnlData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#pnlGradient)" 
                    strokeWidth={2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alerts Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Alerts Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
                <span className="text-2xl font-bold">{dashboardData.alertsCount}</span>
                <span className="ml-2 text-muted-foreground">unread alerts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Chart (Larger) */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData.portfolioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#portfolioGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Left column: Trade Opportunities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Trade Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left pb-2 font-medium">Coin</th>
                      <th className="text-left pb-2 font-medium">Action</th>
                      <th className="text-left pb-2 font-medium">Price</th>
                      <th className="text-left pb-2 font-medium">24h</th>
                      <th className="text-left pb-2 font-medium">Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.tradeOpportunities.map((opportunity) => (
                      <tr key={opportunity.id} className="border-b border-border/50">
                        <td className="py-3 font-medium">{opportunity.coin}</td>
                        <td>
                          <span 
                            className={`px-2 py-0.5 rounded text-xs ${
                              opportunity.action === 'Buy' 
                                ? 'bg-green-500/20 text-green-500' 
                                : opportunity.action === 'Sell' 
                                ? 'bg-red-500/20 text-red-500' 
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {opportunity.action}
                          </span>
                        </td>
                        <td>${opportunity.price}</td>
                        <td className={opportunity.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {opportunity.change}
                        </td>
                        <td>
                          <span 
                            className={`px-2 py-0.5 rounded text-xs ${
                              opportunity.signal === 'Strong Buy' || opportunity.signal === 'Buy'
                                ? 'bg-green-500/20 text-green-500' 
                                : opportunity.signal === 'Sell' || opportunity.signal === 'Strong Sell'
                                ? 'bg-red-500/20 text-red-500' 
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {opportunity.signal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Right column: Agent Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Agent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {dashboardData.recentActions.map((action) => (
                  <li key={action.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Cpu className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{action.agent}</p>
                        <p className="text-muted-foreground text-sm">{action.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{action.timestamp}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Chat Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Input placeholder="Ask about your portfolio or market trends..." className="flex-1 mr-2" />
              <Button>Send</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Try asking: "What's the latest market trend for Bitcoin?" or "How is my portfolio performing?"
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
