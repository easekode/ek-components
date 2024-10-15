import * as React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useState } from 'react';

export const AccordionComponent = ({
  summary,
  children,
  expanded,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  expanded?: boolean;
}) => {
  const [expand, setExpand] = useState<boolean>(expanded || false);

  return (
    <Accordion
      expanded={expand}
      onChange={() => {
        setExpand(!expand);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>{summary}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
