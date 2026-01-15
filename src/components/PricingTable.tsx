import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Newspaper, Package, FileText, BookOpen, Droplet, Container, 
  Recycle, Wrench, CircleDot, Zap, Coins, Cpu, Battery, Wine,
  Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Newspaper,
  Package,
  FileText,
  BookOpen,
  Droplet,
  Container,
  Recycle,
  Wrench,
  CircleDot,
  Zap,
  Coins,
  Cpu,
  Battery,
  Wine,
};

const categoryColors: Record<string, string> = {
  Paper: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  Plastic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Metal: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  Electronics: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Glass: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
};

interface ScrapPrice {
  id: string;
  scrap_type: string;
  price_per_kg: number;
  icon: string | null;
  category: string | null;
}

export function PricingTable() {
  const { data: prices, isLoading, error } = useQuery({
    queryKey: ['scrap-prices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scrap_prices')
        .select('*')
        .order('category', { ascending: true })
        .order('price_per_kg', { ascending: false });
      
      if (error) throw error;
      return data as ScrapPrice[];
    },
  });

  // Group prices by category
  const groupedPrices = prices?.reduce((acc, price) => {
    const category = price.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(price);
    return acc;
  }, {} as Record<string, ScrapPrice[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load pricing. Please try again later.
      </div>
    );
  }

  return (
    <section id="pricing-section" className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Today's <span className="text-gradient">Scrap Rates</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for all types of scrap materials. Rates are updated daily based on market conditions.
          </p>
        </motion.div>

        {/* Desktop Table View */}
        <motion.div
          className="hidden md:block bg-card rounded-2xl shadow-card border border-border overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-semibold">Material</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="text-right font-semibold">Rate (₹/kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices?.map((price, index) => {
                const IconComponent = price.icon ? iconMap[price.icon] : Recycle;
                return (
                  <TableRow key={price.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
                        </div>
                        <span className="font-medium">{price.scrap_type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={categoryColors[price.category || 'Other'] || 'bg-muted'}>
                        {price.category || 'Other'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-lg font-bold text-primary">₹{price.price_per_kg}</span>
                      <span className="text-sm text-muted-foreground">/kg</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {Object.entries(groupedPrices || {}).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Badge className={categoryColors[category] || 'bg-muted'}>{category}</Badge>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {items.map((price) => {
                  const IconComponent = price.icon ? iconMap[price.icon] : Recycle;
                  return (
                    <div
                      key={price.id}
                      className="bg-card rounded-xl p-4 shadow-soft border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
                        </div>
                        <span className="text-sm font-medium text-foreground">{price.scrap_type}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-primary">₹{price.price_per_kg}</span>
                        <span className="text-xs text-muted-foreground">/kg</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          * Rates are subject to change based on market conditions. Final price may vary based on quality and quantity.
        </motion.p>
      </div>
    </section>
  );
}
