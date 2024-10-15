import * as React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '../index';
import { TitleSubSection } from '../TitleHeader/index';

interface StatProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}

export const Stat = ({ title, value, icon, href }: StatProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useIsMobile();

  return (
    <Box>
      <Paper
        sx={{
          width: `${isMobile ? 'none' : '100%'}`,
          borderRadius: '10px',
          border: `1px solid ${theme.palette.grey[500]}`,
          backgroundColor: theme.palette.grey[400],
        }}
      >
        <Grid
          container
          alignItems='center'
          sx={{
            padding: '20px',
            cursor: href ? 'pointer' : 'default',
            height: '100px',
            width: `${isMobile ? 'none' : '100%'}`,
          }}
          onClick={() => {
            if (href) {
              router.push(href);
            }
          }}
        >
          <Grid item xs={8}>
            <Box>
              <TitleSubSection variant='body1'>{title}</TitleSubSection>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: `${isMobile ? '1rem' : '1.5rem'}`,
                  paddingLeft: '10px',
                }}
              >
                {value}
              </Typography>
            </Box>
          </Grid>
          {!isMobile && (
            <Grid item xs={4}>
              <Box
                sx={{
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: '40%',
                  '& > *': {
                    fontSize: '2.5rem !important',
                  },
                  width: '66.35px',
                  height: '66.35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center  ',
                }}
              >
                {icon}
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};
