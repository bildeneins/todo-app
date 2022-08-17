/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Card, CardContent, Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

type TodoProps = {
  name: string;
  onChange: (checked: boolean) => void;
};

const Todo: React.FC<TodoProps> = props => {
  return (
    <Card>
      <CardContent
        css={css`
          user-select: none;
          -webkit-user-select: none;
        `}>
        <FormControlLabel
            control={
              <Checkbox onChange={(_, checked) => { props.onChange(checked); }} />
            }
            label={props.name}
        /> 
      </CardContent>
    </Card>
  )
};

export default Todo;