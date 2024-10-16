/*
generate a component that will take in SEO details for a course.
user will be able to add meta title, meta description, meta keywords, and open graph details.
*/

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TextField } from '@ek-components/index';
import { FormFieldLabels } from '@ek-components/constants';
import { SEOHead } from '@ek-types';
import { FormContainer } from './Container/index';

export const SeoForm: React.FC<{
  data: SEOHead;
  onChange: (data: SEOHead) => void;
}> = ({ data, onChange }) => {
  const [seo, setSeo] = useState<SEOHead>(data);
  return (
    <FormContainer>
      <TextField
        value={seo?.title}
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => {
          setSeo({ ...seo, title: e.target.value });
          //   onChange({ ...seo, title: e.target.value });
        }}
        label={FormFieldLabels.META_TITLE}
        fullWidth
      />
      <TextField
        value={seo?.description}
        onChange={(e) => {
          setSeo({ ...seo, description: e.target.value });
        }}
        label={FormFieldLabels.META_DESCRIPTION}
        fullWidth
        multiline
        rows={3}
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        value={seo?.keyword}
        onChange={(e) => {
          setSeo({ ...seo, keyword: e.target.value });
        }}
        label={FormFieldLabels.META_KEYWORDS}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />
    </FormContainer>
  );
};
