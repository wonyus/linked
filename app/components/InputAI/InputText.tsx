import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface IProps {
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({label,onChange}: IProps) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-static"
          label={label}
          multiline
          rows={4}
          variant="filled"
          onChange={onChange}
        />
      </div>
    </Box>
  );
}
