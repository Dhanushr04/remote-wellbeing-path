
-- Add specialization column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN specialization text;

-- Add other doctor-specific fields that are commonly needed
ALTER TABLE public.profiles 
ADD COLUMN experience integer,
ADD COLUMN rating numeric(3,2) DEFAULT 0.0,
ADD COLUMN bio text,
ADD COLUMN consultation_fee numeric(10,2) DEFAULT 0.0;
