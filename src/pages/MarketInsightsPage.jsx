
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Mock market data
const marketData = {
  topGainers: [
    { id: 1, name: 'SOL', price: '$102.45', change: '+12.8%' },
    { id: 2, name: 'ATOM', price: '$15.12', change: '+8.5%' },
    { id: 3, name: 'AVAX', price: '$28.76', change: '+6.3%' },
  ],
  topLosers: [
    { id: 1, name: 'DOGE', price: '$0.082', change: '-5.2%' },
    { id: 2, name: 'XRP', price: '$0.54', change: '-3.7%' },
    { id: 3, name: 'ADA', price: '$0.48', change: '-2.1%' },
  ],
  marketSentiment: 'Neutral',
  sentimentValue: 52,
  marketTrends: [
    { date: 'Jan', BTC: 28000, ETH: 1600 },
    { date: 'Feb', BTC: 32000, ETH: 1800 },
    { date: 'Mar', BTC: 37000, ETH: 1950 },
    { date: 'Apr', BTC: 35000, ETH: 1850 },
    { date: 'May', BTC: 38000, ETH: 2100 },
  ],
  volumeData: [
    { date: 'Jan', BTC: 15, ETH: 12 },
    { date: 'Feb', BTC: 18, ETH: 14 },
    { date: 'Mar', BTC: 25, ETH: 21 },
    { date: 'Apr', BTC: 22, ETH: 18 },
    { date: 'May', BTC: 28, ETH: 23 },
  ],
  tradingSignals: [
    { 
      id: 1, 
      coin: 'BTC', 
      signal: 'Buy', 
      strength: 'Strong',
      reason: 'Price above 50-day moving average, bullish momentum',
      timestamp: '15 minutes ago'
    },
    { 
      id: 2, 
      coin: 'ETH', 
      signal: 'Hold', 
      strength: 'Neutral',
      reason: 'Consolidating in range, wait for breakout',
      timestamp: '30 minutes ago'
    },
    { 
      id: 3, 
      coin: 'DOT', 
      signal: 'Sell', 
      strength: 'Medium',
      reason: 'Bearish divergence on RSI, losing support',
      timestamp: '1 hour ago'
    },
    { 
      id: 4, 
      coin: 'SOL', 
      signal: 'Buy', 
      strength: 'Medium',
      reason: 'Breaking out of resistance with increasing volume',
      timestamp: '2 hours ago'
    },
  ],
  marketNews: [
    {
      id: 1,
      title: 'Central Bank Hints at Digital Currency Framework',
      source: 'CryptoNews',
      timestamp: '45 minutes ago',
      relevance: 'High'
    },
    {
      id: 2,
      title: 'Major Exchange Adds Support for Layer 2 Solutions',
      source: 'BlockchainTimes',
      timestamp: '2 hours ago',
      relevance: 'Medium'
    },
    {
      id: 3,
      title: 'New Regulatory Guidelines Impact DeFi Protocols',
      source: 'CoinDesk',
      timestamp: '3 hours ago',
      relevance: 'High'
    },
  ]
};

export default function MarketInsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Market Insights</h1>
        </div>

        {/* Market overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bitcoin Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$38,426.75</div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+2.4% (24h)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ethereum Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,105.30</div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+3.8% (24h)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Market Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.marketSentiment}</div>
              <div className="w-full h-2 bg-muted rounded-full mt-2">
                <div 
                  className={`h-full rounded-full ${
                    marketData.sentimentValue < 40 ? 'bg-red-500' : 
                    marketData.sentimentValue > 60 ? 'bg-green-500' : 
                    'bg-amber-500'
                  }`}
                  style={{ width: `${marketData.sentimentValue}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Bearish</span>
                <span>Neutral</span>
                <span>Bullish</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Price movement of major assets</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="price">
              <TabsList className="mb-4">
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
              </TabsList>
              <TabsContent value="price" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={marketData.marketTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      yAxisId="left"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--card-foreground))'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="BTC" 
                      stroke="#F7931A" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                      name="Bitcoin"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="ETH" 
                      stroke="#627EEA" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                      name="Ethereum"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="volume" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketData.volumeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      tickFormatter={(value) => `${value}B`}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}B`, '']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--card-foreground))'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="BTC" fill="#F7931A" name="Bitcoin" />
                    <Bar dataKey="ETH" fill="#627EEA" name="Ethereum" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Top movers and signals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top gainers & losers */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Movers (24h)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium flex items-center mb-3">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" /> Top Gainers
                </h3>
                <ul className="space-y-2">
                  {marketData.topGainers.map((coin) => (
                    <li key={coin.id} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="font-medium">{coin.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{coin.price}</span>
                        <span className="text-green-500">{coin.change}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center mb-3">
                  <TrendingDown className="h-4 w-4 mr-1 text-red-500" /> Top Losers
                </h3>
                <ul className="space-y-2">
                  {marketData.topLosers.map((coin) => (
                    <li key={coin.id} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="font-medium">{coin.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{coin.price}</span>
                        <span className="text-red-500">{coin.change}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Trading signals */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>AI Trading Signals</CardTitle>
              <CardDescription>Signals generated by our machine learning algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {marketData.tradingSignals.map((signal) => (
                  <li key={signal.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Badge variant="outline" className={`
                          ${signal.signal === 'Buy' ? 'bg-green-500/20 text-green-500 border-green-500/30' : 
                            signal.signal === 'Sell' ? 'bg-red-500/20 text-red-500 border-red-500/30' : 
                            'bg-amber-500/20 text-amber-500 border-amber-500/30'}
                        `}>
                          {signal.signal}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{signal.coin}</p>
                          <p className="text-xs text-muted-foreground">{signal.timestamp}</p>
                        </div>
                        <p className="text-sm mt-1">{signal.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Signal Strength: <span className="font-medium">{signal.strength}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Market news */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Market News</CardTitle>
              <CardDescription>Latest news affecting the crypto market</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {marketData.marketNews.map((news) => (
                <li key={news.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{news.title}</p>
                        <Badge variant={news.relevance === 'High' ? 'default' : 'outline'}>
                          {news.relevance}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{news.source}</span>
                        <span className="mx-2">•</span>
                        <span>{news.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
