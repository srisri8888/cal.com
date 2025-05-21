import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Alert,
  Fade,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import SelectField from './SelectField';
import DatePickerField from './DatePickerField';
import { FormData } from '../types';

const departments = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'humanResources', label: 'Human Resources' },
  { value: 'operations', label: 'Operations' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const FormContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const methods = useForm<FormData>({
    defaultValues: {
      department: '',
      priority: '',
      dueDate: null,
    },
    mode: 'onChange',
  });

  const { handleSubmit, formState, watch } = methods;
  const { isValid } = formState;

  const formValues = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted with data:', data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Form submitted successfully!',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting the form.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (isValid && 
        formValues.department && 
        formValues.priority && 
        formValues.dueDate &&
        !isSubmitting) {
      handleSubmit(onSubmit)();
    }
  }, [formValues, isValid, isSubmitting, handleSubmit, onSubmit]);

  return (
    <Fade in timeout={500}>
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 600, 
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'medium' }}>
          Task Assignment
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Fill out the form to assign a new task
        </Typography>
        
        <Divider sx={{ mb: 3 }} />

        {submitStatus.type && (
          <Fade in timeout={500}>
            <Alert 
              severity={submitStatus.type} 
              sx={{ mb: 3, borderRadius: 1 }}
              onClose={() => setSubmitStatus({ type: null, message: '' })}
            >
              {submitStatus.message}
            </Alert>
          </Fade>
        )}

        <FormProvider {...methods}>
          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3 
            }}
          >
            <DatePickerField
              name="dueDate"
              label="Due Date"
              required
              helperText="Select the due date for the task"
            />
            
            <SelectField
              name="department"
              label="Department"
              options={departments}
              required
              helperText="Select the department to assign the task"
            />
            
            <SelectField
              name="priority"
              label="Priority"
              options={priorities}
              required
              helperText="Choose the priority level of the task"
            />

            <Box 
              component="pre" 
              sx={{ 
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}
            >
              {JSON.stringify(formValues, null, 2)}
            </Box>
          </Box>
        </FormProvider>
      </Paper>
    </Fade>
  );
};

export default FormContainer;