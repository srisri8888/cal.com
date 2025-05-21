import React from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  FormHelperText,
  SelectChangeEvent,
  InputLabel
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  helperText?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  required = false,
  helperText,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'This field is required' : false,
      }}
      render={({ field }) => (
        <FormControl 
          fullWidth 
          error={!!errorMessage}
          variant="outlined"
          sx={{ 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                transition: 'border-color 0.2s ease-in-out',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            }
          }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={field.value}
            onChange={(e: SelectChangeEvent<string>) => {
              field.onChange(e.target.value);
            }}
            MenuProps={{
              PaperProps: {
                elevation: 2,
                sx: { 
                  maxHeight: 300,
                  borderRadius: 1,
                  mt: 0.5
                }
              }
            }}
          >
            {options.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                sx={{ 
                  py: 1,
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.lighter',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  }
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errorMessage || helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};


export default SelectField;