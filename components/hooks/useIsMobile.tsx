import { useMediaQuery } from '@mui/material';
export const useIsMobile = () => {
    const media = useMediaQuery('(max-width:600px)');
    // ({ media });
    return media;
};
