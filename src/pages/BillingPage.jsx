
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, FileText, Calendar, Download, CreditCard, ArrowRight } from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('professional');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      billingPeriod: 'monthly',
      description: 'Perfect for new traders looking to explore AI trading',
      features: [
        '2 Active Agents',
        'Basic Market Analysis',
        'Portfolio Tracking',
        'Email Support',
      ],
      mostPopular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      billingPeriod: 'monthly',
      description: 'For serious traders focused on optimizing their strategies',
      features: [
        '10 Active Agents',
        'Advanced Trading Strategies',
        'Real-time Market Alerts',
        'Priority Support',
        'Team Collaboration',
      ],
      mostPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      billingPeriod: 'monthly',
      description: 'For institutional traders and professional firms',
      features: [
        'Unlimited Active Agents',
        'Custom Strategy Development',
        'API Access',
        'Dedicated Account Manager',
        'Exchange Integration',
        'Premium Data Sources',
      ],
      mostPopular: false,
    },
  ];

  const invoices = [
    {
      id: 'INV-001',
      date: 'May 1, 2025',
      amount: 79.00,
      status: 'Paid',
    },
    {
      id: 'INV-002',
      date: 'April 1, 2025',
      amount: 79.00,
      status: 'Paid',
    },
    {
      id: 'INV-003',
      date: 'March 1, 2025',
      amount: 79.00,
      status: 'Paid',
    },
    {
      id: 'INV-004',
      date: 'February 1, 2025',
      amount: 79.00,
      status: 'Paid',
    },
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);

  const handleSwitchPlan = (planId) => {
    setCurrentPlan(planId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Billing & Plans</h1>

        <Tabs defaultValue="plans">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6 pt-4">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Your current subscription details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">
                      {currentPlanData.name}
                      {currentPlanData.mostPopular && (
                        <Badge variant="secondary" className="ml-2">
                          Most Popular
                        </Badge>
                      )}
                    </h3>
                    <p className="text-muted-foreground">{currentPlanData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${currentPlanData.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{currentPlanData.billingPeriod}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Next billing cycle: June 1, 2025</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Plan Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPlanData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Invoice
                  </a>
                </Button>
                <Button variant="secondary">Manage Payment Methods</Button>
              </CardFooter>
            </Card>
            
            {/* Available Plans */}
            <div>
              <h2 className="text-xl font-bold mb-4">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`${
                      plan.id === currentPlan ? 'border-primary' : ''
                    } ${plan.mostPopular ? 'relative' : ''}`}
                  >
                    {plan.mostPopular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-1">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-sm text-muted-foreground">/{plan.billingPeriod}</span>
                      </div>
                      <CardDescription className="mt-1.5">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {plan.id === currentPlan ? (
                        <Button className="w-full" disabled>Current Plan</Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          variant={plan.id === "enterprise" ? "outline" : "default"}
                          onClick={() => handleSwitchPlan(plan.id)}
                        >
                          {plan.id === "enterprise" ? "Contact Sales" : "Switch Plan"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View and download your past invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Invoice</th>
                        <th className="text-left py-3 px-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Date
                          </div>
                        </th>
                        <th className="text-left py-3 px-4">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Amount
                          </div>
                        </th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              {invoice.id}
                            </div>
                          </td>
                          <td className="py-3 px-4">{invoice.date}</td>
                          <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
