'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCaseStore } from '@/store/caseStore';

const schema = z.object({
  patientName: z.string().min(1, 'Patient name is required'),
});

export default function NewCasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addCase } = useCaseStore();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const newCase = {
        id: Date.now(),
        patientName: data.patientName,
        status: 'Active',
        lastUpdated: new Date().toISOString(),
        comments: [],
      };
      addCase(newCase);
      toast({
        title: 'Case Created',
        description: 'New case has been successfully created',
      });
      router.push('/dashboard/cases');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create new case',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Case</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            placeholder="Patient Name"
            {...register('patientName')}
            className={errors.patientName ? 'border-red-500' : ''}
          />
          {errors.patientName && <p className="mt-1 text-sm text-red-500">{errors.patientName.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Case'}
        </Button>
      </form>
    </div>
  );
}