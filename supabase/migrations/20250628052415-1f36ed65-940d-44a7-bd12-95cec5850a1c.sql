
-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
  type TEXT NOT NULL CHECK (type IN ('video', 'phone', 'in-person')) DEFAULT 'video',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create consultations table to track active sessions
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  session_notes TEXT,
  prescription TEXT,
  diagnosis TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Patients can create appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their own appointments" 
  ON public.appointments 
  FOR UPDATE 
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Users can cancel their own appointments" 
  ON public.appointments 
  FOR DELETE 
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

-- RLS Policies for consultations
CREATE POLICY "Users can view their own consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id 
      AND (patient_id = auth.uid() OR doctor_id = auth.uid())
    )
  );

CREATE POLICY "Doctors can create consultations" 
  ON public.consultations 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id 
      AND doctor_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can update consultations" 
  ON public.consultations 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id 
      AND doctor_id = auth.uid()
    )
  );

-- Create function to automatically update appointment status when consultation starts
CREATE OR REPLACE FUNCTION public.handle_consultation_start()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  UPDATE public.appointments 
  SET status = 'in-progress', updated_at = now()
  WHERE id = NEW.appointment_id;
  RETURN NEW;
END;
$$;

-- Create trigger for consultation start
CREATE TRIGGER on_consultation_created
  AFTER INSERT ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_consultation_start();

-- Create function to update appointment status when consultation ends
CREATE OR REPLACE FUNCTION public.handle_consultation_end()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.appointments 
    SET status = 'completed', updated_at = now()
    WHERE id = NEW.appointment_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for consultation end
CREATE TRIGGER on_consultation_updated
  AFTER UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_consultation_end();
