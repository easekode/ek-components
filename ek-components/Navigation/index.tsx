import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import SearchBox from '../../../ek-components/src/components/Searchbox';
import Container from '@mui/material/Container';
// import { Button } from '../Button';
import { NavigationLink } from './types';
import { Box, InputBase } from '@mui/material';
// import { Logo } from '../../../ek-components/src/components/BrandLogo';
// import ResponsiveDrawer from '../../features/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import {
  SearchIconContainer,
  StyledItemWrapper,
  StyledDesktopWrapper,
  StyledIconWrapper,
  StyledToolbar,
} from './styled';
// import { helps } from '../../../ek-components/src/constants/allCourses';
import { useRouter } from 'next/navigation';
// import CourseMenu from '../../../ek-components/src/components/CourseMenu';
// import { CategoryMenu } from '../../features/CategoryMenu';
// import { ApplyButtonNames } from '../../features/BookNowButton';
// import { ApplyNow } from '../../features/ApplyNowButton';
// import BootcampCategoryMenu from '../../features/BootcampCategoryMenu';
// const bootcampData: NavigationLink[] = bootCamps;
const helpData: NavigationLink[] = [];

const defaultProps = {
  signUpBtnLabel: 'SIGNUP',
};

const mobileMenuItems = [
  { name: 'Courses', url: '/courses' },
  { name: 'Bootcamps', url: '/bootcamps' },
  { name: 'Hire From Us', url: '/hire-from-us' },
  { name: 'Refer And Earn', url: '/refer-and-earn' },
  { name: 'Help', dropDownLinks: helpData },
];
const desktopMenuItems = [
  { name: 'Courses', url: '/courses' },
  { name: 'Bootcamps', url: '/bootcamps' },
  { name: 'Hire From Us', url: '/hire-from-us' },
  { name: 'Refer And Earn', url: '/refer-and-earn' },
  { name: 'Help', dropDownLinks: helpData },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const theme = useTheme();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearchIcon = () => {
    setSearchOpen(true);
  };

  const handleCloseSearchBar = () => {
    setSearchOpen(false);
  };

  const [mobileMenuOpenState, setMobileMenuOpenState] = React.useState(
    mobileMenuItems.map(() => false)
  );

  const toggleMobileMenuItem = (index: number) => {
    setMobileMenuOpenState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <AppBar
      position='static'
      sx={{
        borderBottom: `0.5px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth='xl'>
        <StyledToolbar disableGutters>
          {/* Mobile Devices */}
          <Box
            sx={{
              display: {
                md: searchOpen ? 'block' : 'flex',
                sm: searchOpen ? 'block' : 'flex',
                xs: searchOpen ? 'block' : 'flex',
                lg: 'none',
              },
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: searchOpen ? 'none' : 'flex',
                // gap: Space,
              }}
            >
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={() => {
                  debugger;
                  handleDrawerToggle();
                }}
                // sx={{ color: theme.palette.text.secondary }}
              >
                <MenuIcon />
              </IconButton>
              {/*  <Logo
                // variant='v2'
                sx={{ cursor: 'pointer' }}
                onClick={handleLogoClick}
              /> */}
            </Box>

            <Box>
              {searchOpen ? (
                <StyledIconWrapper
                  sx={{ background: theme.palette.text.secondary }}
                >
                  <InputBase
                    sx={{ width: 1 }}
                    placeholder='Search for courses'
                    endAdornment={
                      <InputAdornment
                        position='end'
                        onClick={handleCloseSearchBar}
                        sx={{ cursor: 'pointer' }}
                      >
                        <CloseIcon />
                      </InputAdornment>
                    }
                  />
                </StyledIconWrapper>
              ) : (
                <>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <SearchIconContainer onClick={handleSearchIcon}>
                      <SearchIcon sx={{ fill: theme.palette.text.secondary }} />
                    </SearchIconContainer>
                  </Box>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {/* <SearchBox
                      placeholder='Search for courses'
                      ariaLabel='search'
                      // redirectUrl='search-result/'
                      redirectUrl='/courses'
                    /> */}
                  </Box>
                </>
              )}
            </Box>

            {/* <ResponsiveDrawer
              open={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            >
              {/* <CategoryMenu menuName={'Courses'} /> */}
            {/* <BootcampCategoryMenu menuName={'Bootcamps'} /> */}
            {/* {mobileMenuItems.map((menuItem, index) => (
                <CourseMenu
                  key={index}
                  name={menuItem.name}
                  dropDownLinks={menuItem.dropDownLinks}
                  url={menuItem.url}
                  onClick={() => toggleMobileMenuItem(index)}
                  isOpen={mobileMenuOpenState[index]}
                />
              ))} */}
            {/* </ResponsiveDrawer> */}
          </Box>

          {/* Desktop Devices */}
          <StyledDesktopWrapper
            sx={{
              display: { lg: 'flex', md: 'none', sm: 'none', xs: 'none' },
              // height: Sizing.PX96,
            }}
          >
            <StyledItemWrapper>
              {/* <Logo
                sx={{
                  // ...minHeight,
                  cursor: 'pointer',
                  width: 1,
                  height: 1,
                  mb: 3,
                }}
                // variant='v2'
                onClick={handleLogoClick}
              /> */}
              {/* <BootcampCategoryMenu menuName={'Bootcamps'} /> */}
            </StyledItemWrapper>
            <StyledItemWrapper
            // sx={
            //   {
            //     // marginRight: 'auto',
            //     // marginLeft: '20px',
            //   }
            // }
            >
              {/* <CategoryMenu menuName={'Courses'} /> */}
              {/* <CourseMenu name='Courses' url='/courses' /> */}
              <Box>
                {/* <SearchBox
                  placeholder='Search for courses'
                  ariaLabel='search'
                  // redirectUrl='search-result/'
                  redirectUrl='/courses'
                /> */}
              </Box>
            </StyledItemWrapper>
            <StyledItemWrapper sx={{ flexDirection: 'start' }}>
              {/* <BootcampCategoryMenu menuName={'Bootcamps'} /> */}
              {/* desktopMenuItems.map((menuItem, index) => (
                <CourseMenu
                  key={index}
                  name={menuItem.name}
                  dropDownLinks={menuItem.dropDownLinks}
                  url={menuItem.url}
                />
              )) */}

              {/* <CartIcon sx={{ ...minHeight }} /> */}

              {/* TODO */}
              {/* <Button
                color='secondary'
                sx={{ ...minHeight }}
                onClick={handleSignUpClick}
              >
                <ApplyNow />
                {props.signUpBtnLabel}
              </Button> */}
              {/* <ApplyNow
                name={ApplyButtonNames.APPLY_NOW}
                sx={{ marginTop: theme.spacing(Spacing.LG) }}
              /> */}
            </StyledItemWrapper>
          </StyledDesktopWrapper>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
