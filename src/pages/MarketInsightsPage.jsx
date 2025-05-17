
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

// Sample data for demonstration
const mockCoins = [
  { 
    id: 'bitcoin',
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: 38245.67, 
    change: 2.45, 
    sentiment: 0.78,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 37000 + Math.random() * 3000
    }))
  },
  { 
    id: 'ethereum',
    name: 'Ethereum', 
    symbol: 'ETH', 
    price: 2791.35, 
    change: -1.12, 
    sentiment: 0.62,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 2700 + Math.random() * 300
    }))
  },
  { 
    id: 'cardano',
    name: 'Cardano', 
    symbol: 'ADA', 
    price: 0.52, 
    change: 5.37, 
    sentiment: 0.83,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 0.48 + Math.random() * 0.1
    }))
  },
  { 
    id: 'solana',
    name: 'Solana', 
    symbol: 'SOL', 
    price: 102.78, 
    change: 3.89, 
    sentiment: 0.71,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 95 + Math.random() * 15
    }))
  },
  { 
    id: 'ripple',
    name: 'Ripple', 
    symbol: 'XRP', 
    price: 0.612, 
    change: -0.87, 
    sentiment: 0.56,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 0.60 + Math.random() * 0.05
    }))
  },
  { 
    id: 'polkadot',
    name: 'Polkadot', 
    symbol: 'DOT', 
    price: 7.24, 
    change: 1.23, 
    sentiment: 0.65,
    data: Array(24).fill(0).map((_, i) => ({ 
      time: i, 
      price: 7.0 + Math.random() * 0.5
    }))
  },
];

export default function MarketInsightsPage() {
  const [exchange, setExchange] = useState('all');
  const [timeframe, setTimeframe] = useState('24h');
  const [sentiment, setSentiment] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

  // Filter coins based on search and filters
  const filteredCoins = mockCoins.filter(coin => {
    const matchesSearch = !searchQuery || 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    const meetsSentiment = coin.sentiment >= sentiment;
    
    return matchesSearch && meetsSentiment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Market Insights</h1>
          
          <div className="flex flex-wrap gap-4">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Select value={exchange} onValueChange={setExchange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exchanges</SelectItem>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input 
                  type="text"
                  placeholder="Search coins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select 
                  value={sentiment.toString()} 
                  onValueChange={(value) => setSentiment(parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.3">Low Sentiment (30%+)</SelectItem>
                    <SelectItem value="0.5">Medium Sentiment (50%+)</SelectItem>
                    <SelectItem value="0.7">High Sentiment (70%+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid or Chart View */}
        <div className="grid grid-cols-1 gap-6">
          {selectedCoin ? (
            <Card className="col-span-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">
                    {selectedCoin.name} ({selectedCoin.symbol}) Performance
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Current price: ${selectedCoin.price.toLocaleString()}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedCoin(null)}>
                  Back to Grid
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedCoin.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]}
                        labelFormatter={() => ''}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }} 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredCoins.map((coin) => (
                <Card key={coin.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{coin.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                      </div>
                      <div className={`flex items-center px-2 py-1 rounded text-xs font-semibold ${
                        coin.change >= 0 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {coin.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {coin.change >= 0 ? '+' : ''}{coin.change}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold">${coin.price.toLocaleString()}</span>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        Sentiment: {(coin.sentiment * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={coin.data}>
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke={coin.change >= 0 ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)"}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedCoin(coin)}
                    >
                      View on Chart <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
