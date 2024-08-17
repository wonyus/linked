import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';

interface BasicButtonProps {
    label: string;
    onClick: () => void;
    }

export default function ButtonAI({label,onClick}: BasicButtonProps) {
    return(
        <Button variant="outlined" onClick={onClick}>{label}</Button>
    )
}