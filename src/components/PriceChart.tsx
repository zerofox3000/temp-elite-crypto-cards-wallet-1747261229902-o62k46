
import { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";

interface PriceChartProps {
  symbol: string;
  timeframe?: "1D" | "1W" | "1M" | "1Y" | "ALL";
}

const PriceChart = ({ symbol, timeframe = "1W" }: PriceChartProps) => {
  // Generate demo data for the chart
  const generateChartData = (timeframe: string, trend: "up" | "down" | "volatile") => {
    const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : 365;
    const data = [];
    
    let baseValue = 100;
    const volatility = trend === "volatile" ? 15 : 5;
    const directionMultiplier = trend === "up" ? 1 : -1;
    
    for (let i = 0; i < points; i++) {
      const random = Math.random() * volatility - volatility / 2;
      const trendComponent = (directionMultiplier * i * (volatility / 4)) / points;
      
      baseValue = baseValue + random + trendComponent;
      if (baseValue < 10) baseValue = 10;
      
      data.push({
        time: i,
        price: baseValue
      });
    }
    
    return data;
  };
  
  const [activeTimeframe, setActiveTimeframe] = useState<"1D" | "1W" | "1M" | "1Y" | "ALL">(timeframe);
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    const trend = symbol === "BTC" || symbol === "ETH" ? "up" : symbol === "DOGE" ? "volatile" : "down";
    setData(generateChartData(activeTimeframe, trend));
  }, [symbol, activeTimeframe]);
  
  const chartColor = useMemo(() => {
    const lastPoint = data[data.length - 1]?.price || 0;
    const firstPoint = data[0]?.price || 0;
    return lastPoint >= firstPoint ? "#10B981" : "#EF4444";
  }, [data]);
  
  const formatXAxis = (value: number) => {
    if (activeTimeframe === "1D") {
      return `${value}h`;
    } else if (activeTimeframe === "1W") {
      return `Day ${value + 1}`;
    } else if (activeTimeframe === "1M") {
      return `Week ${Math.floor(value / 7) + 1}`;
    } else {
      return `Month ${Math.floor(value / 30) + 1}`;
    }
  };
  
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 rounded-lg border border-white/10 text-xs">
          <p className="font-medium">${payload[0].value?.toFixed(2)}</p>
          <p className="text-white/60">{formatXAxis(payload[0].payload.time)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{symbol} Price Chart</h2>
        <div className="flex space-x-2">
          {(["1D", "1W", "1M", "1Y", "ALL"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2 py-1 text-xs rounded-md ${
                activeTimeframe === tf
                  ? "bg-primary text-white"
                  : "bg-card/50 text-white/60 hover:bg-card"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: '#FFFFFE80' }}
              tickFormatter={formatXAxis}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={['dataMin - 5', 'dataMax + 5']} 
              hide 
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: chartColor }}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
