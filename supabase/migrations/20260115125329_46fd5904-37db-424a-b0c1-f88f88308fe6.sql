-- Create scrap_prices table for dynamic pricing
CREATE TABLE public.scrap_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scrap_type TEXT NOT NULL UNIQUE,
  price_per_kg NUMERIC NOT NULL,
  icon TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scrap_prices ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read prices
CREATE POLICY "Anyone can read scrap_prices" 
ON public.scrap_prices 
FOR SELECT 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_scrap_prices_updated_at
BEFORE UPDATE ON public.scrap_prices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample pricing data
INSERT INTO public.scrap_prices (scrap_type, price_per_kg, icon, category) VALUES
('Newspaper', 14, 'Newspaper', 'Paper'),
('Cardboard', 12, 'Package', 'Paper'),
('Mixed Paper', 10, 'FileText', 'Paper'),
('Books & Magazines', 11, 'BookOpen', 'Paper'),
('PET Bottles', 18, 'Droplet', 'Plastic'),
('HDPE Plastic', 22, 'Container', 'Plastic'),
('Mixed Plastic', 8, 'Recycle', 'Plastic'),
('Iron/Steel', 28, 'Wrench', 'Metal'),
('Aluminium', 105, 'CircleDot', 'Metal'),
('Copper', 450, 'Zap', 'Metal'),
('Brass', 320, 'Coins', 'Metal'),
('E-Waste', 35, 'Cpu', 'Electronics'),
('Batteries', 45, 'Battery', 'Electronics'),
('Glass Bottles', 5, 'Wine', 'Glass');