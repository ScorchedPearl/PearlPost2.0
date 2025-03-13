import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/components/ui/tabs';

const data = [
  { name: 'Mon', likes: 4000, shares: 2400, comments: 2400 },
  { name: 'Tue', likes: 3000, shares: 1398, comments: 2210 },
  { name: 'Wed', likes: 2000, shares: 9800, comments: 2290 },
  { name: 'Thu', likes: 2780, shares: 3908, comments: 2000 },
  { name: 'Fri', likes: 1890, shares: 4800, comments: 2181 },
  { name: 'Sat', likes: 2390, shares: 3800, comments: 2500 },
  { name: 'Sun', likes: 3490, shares: 4300, comments: 2100 },
];

const weeklyData = data;
const monthlyData = [
  { name: 'Week 1', likes: 15000, shares: 9800, comments: 8400 },
  { name: 'Week 2', likes: 18000, shares: 11000, comments: 9200 },
  { name: 'Week 3', likes: 13000, shares: 8700, comments: 7500 },
  { name: 'Week 4', likes: 19000, shares: 12500, comments: 10300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm p-3 border border-border rounded-lg shadow-xl">
        <p className="text-xs font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p 
            key={`item-${index}`}
            className="text-xs" 
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export const EngagementChart = () => {
  const [mounted, setMounted] = useState(false);
  const [activeData, setActiveData] = useState(weeklyData);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  return (
    <Card className="glass-card border-border/50 col-span-3 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Engagement Overview</CardTitle>
          <Tabs defaultValue="weekly" className="w-[180px]" onValueChange={(value) => {
            setActiveData(value === 'weekly' ? weeklyData : monthlyData);
          }}>
            <TabsList className="h-12">
              <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="likes" 
                stackId="1"
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorLikes)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="shares" 
                stackId="2"
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#colorShares)" 
                animationDuration={1500}
                animationBegin={300}
              />
              <Area 
                type="monotone" 
                dataKey="comments" 
                stackId="3"
                stroke="#14b8a6" 
                fillOpacity={1} 
                fill="url(#colorComments)" 
                animationDuration={1500}
                animationBegin={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
