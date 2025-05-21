import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
  FormControl, 
  FormHelperText
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface DatePickerFieldProps {
  name: string;
  label: string;
  required?: boolean;
  helperText?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  required = false,
  helperText,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormControl 
      fullWidth 
      error={!!errorMessage}
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'This field is required' : false,
        }}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: !!errorMessage,
                fullWidth: true,
                label,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      transition: 'border-color 0.2s ease-in-out',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }
              },
              day: {
                sx: {
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                  borderRadius: '50%',
                  transition: 'background-color 0.2s ease',
                }
              },
            }}
          />
        )}
      />
      <FormHelperText>
        {errorMessage || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default DatePickerField;