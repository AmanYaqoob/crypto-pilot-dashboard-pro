
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Mock portfolio data
const portfolioData = {
  totalValue: 38426.75,
  change24h: 2.4,
  changeValue24h: 914.25,
  allocation: [
    { name: 'BTC', value: 45, color: '#F7931A' },
    { name: 'ETH', value: 30, color: '#627EEA' },
    { name: 'SOL', value: 15, color: '#00FFA3' },
    { name: 'Other', value: 10, color: '#8247E5' },
  ],
  timeframeData: {
    '1W': [
      { date: 'Mon', value: 36500 },
      { date: 'Tue', value: 37200 },
      { date: 'Wed', value: 36800 },
      { date: 'Thu', value: 37500 },
      { date: 'Fri', value: 38100 },
      { date: 'Sat', value: 37900 },
      { date: 'Sun', value: 38426.75 },
    ],
    '1M': [
      // Mock data for 1 month view
      { date: 'Week 1', value: 34200 },
      { date: 'Week 2', value: 35800 },
      { date: 'Week 3', value: 37100 },
      { date: 'Week 4', value: 38426.75 },
    ],
    '3M': [
      // Mock data for 3 month view
      { date: 'Jan', value: 30500 },
      { date: 'Feb', value: 32700 },
      { date: 'Mar', value: 38426.75 },
    ],
    '1Y': [
      // Mock data for 1 year view
      { date: 'Jan', value: 22000 },
      { date: 'Mar', value: 25000 },
      { date: 'May', value: 28000 },
      { date: 'Jul', value: 26000 },
      { date: 'Sep', value: 30000 },
      { date: 'Nov', value: 34000 },
      { date: 'Jan', value: 38426.75 },
    ],
  },
  recentTrades: [
    { id: 1, date: '2023-03-17', coin: 'BTC', type: 'Buy', amount: '0.05 BTC', price: '37,245.50', pnl: '+2.1%' },
    { id: 2, date: '2023-03-15', coin: 'ETH', type: 'Buy', amount: '0.7 ETH', price: '1,950.25', pnl: '-0.8%' },
    { id: 3, date: '2023-03-14', coin: 'SOL', type: 'Sell', amount: '4 SOL', price: '103.78', pnl: '+8.3%' },
    { id: 4, date: '2023-03-10', coin: 'BTC', type: 'Buy', amount: '0.03 BTC', price: '35,892.45', pnl: '+4.7%' },
    { id: 5, date: '2023-03-08', coin: 'ETH', type: 'Sell', amount: '1.2 ETH', price: '1,845.30', pnl: '+3.2%' },
  ],
};

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Portfolio summary */}
          <div className="lg:w-1/3 space-y-6">
            {/* Total Value Card */}
            <Card>
              <CardHeader>
                <CardTitle>Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">${portfolioData.totalValue.toLocaleString()}</div>
                <div className="flex items-center">
                  {portfolioData.change24h >= 0 ? (
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+{portfolioData.change24h}%</span>
                      <span className="text-muted-foreground ml-2">
                        (+${portfolioData.changeValue24h.toLocaleString()}) 24h
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span>{portfolioData.change24h}%</span>
                      <span className="text-muted-foreground ml-2">
                        (-${Math.abs(portfolioData.changeValue24h).toLocaleString()}) 24h
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Allocation Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.allocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {portfolioData.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Performance charts */}
          <div className="lg:w-2/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="1W">
                  <TabsList className="mb-4">
                    <TabsTrigger value="1W">1W</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="3M">3M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                  </TabsList>
                  {Object.entries(portfolioData.timeframeData).map(([timeframe, data]) => (
                    <TabsContent key={timeframe} value={timeframe} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
                          <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                          <YAxis 
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip 
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--card-foreground))'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent trades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-2 font-medium">Date</th>
                    <th className="text-left pb-2 font-medium">Coin</th>
                    <th className="text-left pb-2 font-medium">Type</th>
                    <th className="text-left pb-2 font-medium">Amount</th>
                    <th className="text-left pb-2 font-medium">Price</th>
                    <th className="text-left pb-2 font-medium">PnL</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.recentTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-border/50">
                      <td className="py-3">{trade.date}</td>
                      <td className="py-3 font-medium">{trade.coin}</td>
                      <td className="py-3">
                        <span 
                          className={`px-2 py-0.5 rounded text-xs ${
                            trade.type === 'Buy' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3">{trade.amount}</td>
                      <td className="py-3">${trade.price}</td>
                      <td className={trade.pnl.startsWith('+') ? 'py-3 text-green-500' : 'py-3 text-red-500'}>
                        {trade.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
