import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { ArrowRight, BarChart3, Shield, ArrowUpRight, Settings, Clock } from 'lucide-react';
export default function HomePage() {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-background py-20 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        
        {/* Animated spheres - for visual effect */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/20 filter blur-3xl animate-pulse-glow" style={{
        animationDelay: '1s'
      }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="gradient-text">Crypto Pilot</span>
              <span className="block mt-2">AI-Powered Crypto Trading</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Leverage AI agents to automate your crypto trading strategy, analyze market trends, 
              and optimize your portfolio for maximum returns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="animate-float" asChild>
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
            
            {/* Moving text animation - Powered by Blizon Technologies */}
            <div className="w-full overflow-hidden mt-8 py-2 bg-primary/5 rounded-lg">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4 text-primary font-medium">Powered By Blizon Technologies</span>
                <span className="mx-4">•</span>
                <span className="mx-4 text-primary font-medium">Powered By Blizon Technologies</span>
                <span className="mx-4">•</span>
                <span className="mx-4 text-primary font-medium">Powered By Blizon Technologies</span>
                <span className="mx-4">•</span>
              </div>
            </div>
            
            <div className="mt-12 backdrop-blur-sm bg-card/30 border border-border rounded-xl p-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">AI Trading Agents</h3>
                  <p className="text-muted-foreground text-sm">Configure AI agents to execute trades based on your strategy</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Risk Management</h3>
                  <p className="text-muted-foreground text-sm">Set custom risk parameters and stop-loss mechanisms</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Market Analysis</h3>
                  <p className="text-muted-foreground text-sm">Real-time market insights powered by advanced AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Reduced hover effect */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Trading Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            title: "Intelligent Agents",
            description: "Create and deploy AI agents with specific trading strategies and risk profiles",
            icon: <Settings className="h-8 w-8" />
          }, {
            title: "Real-Time Portfolio",
            description: "Track your portfolio performance with comprehensive analytics and visualizations",
            icon: <BarChart3 className="h-8 w-8" />
          }, {
            title: "Market Intelligence",
            description: "Leverage AI-powered market analysis to identify trading opportunities",
            icon: <ArrowUpRight className="h-8 w-8" />
          }, {
            title: "24/7 Monitoring",
            description: "Your agents work around the clock, even when you're not actively trading",
            icon: <Clock className="h-8 w-8" />
          }, {
            title: "Custom Strategies",
            description: "Define your own trading strategies or choose from pre-built templates",
            icon: <Settings className="h-8 w-8" />
          }, {
            title: "Secure Platform",
            description: "Enterprise-grade security keeps your assets and strategies safe",
            icon: <Shield className="h-8 w-8" />
          }].map((feature, index) => <div key={index} className="bg-card border border-border rounded-lg p-6 transition-all hover:-translate-y-[3px] hover:shadow-md group">
                <div className="mb-4 text-primary group-hover:text-accent transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the plan that fits your trading strategy and scale as your portfolio grows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">Perfect for new traders looking to explore AI trading</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 Active Agents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic Market Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Portfolio Tracking</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup?plan=starter">Get Started</Link>
                </Button>
              </div>
            </div>
            
            {/* Pro Plan - Most Popular */}
            <div className="border-2 border-primary rounded-lg overflow-hidden bg-card relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">For serious traders focused on optimizing their strategies</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10 Active Agents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced Trading Strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time Market Alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority Support</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" asChild>
                  <Link to="/signup?plan=professional">Get Started</Link>
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="font-bold text-3xl">Custom</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">For institutional traders and professional firms</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited Active Agents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom Strategy Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated Account Manager</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to automate your crypto trading?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders using Crypto Pilot to maximize returns and minimize risk.
          </p>
          <Button size="lg" className="animate-float" asChild>
            <Link to="/signup">Start Trading Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <h3 className="font-bold text-xl">Crypto Pilot</h3>
              </div>
              <p className="text-muted-foreground">
                AI-powered crypto trading platform for traders of all levels.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/demo" className="text-muted-foreground hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Crypto Pilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
}