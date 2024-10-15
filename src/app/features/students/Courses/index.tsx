import { theme } from '@ek-components';
import { AccessTime } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';

const Course = ({ courses }) => {
  const handleSeeAllCourses = () => {
    //  router.push(AppRoutes.ALL_COURSES)
  };
  return (
    <Box mt={10}>
      <Card>
        <CardContent>
          <Box sx={{ position: 'relative' }}>
            <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
              <strong>My Courses</strong>
            </Typography>{' '}
            <Link
              onClick={handleSeeAllCourses}
              sx={{
                position: 'absolute',
                top: 8,
                right: 10,
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <strong>See all</strong>
            </Link>
            <Grid container spacing={2} mt={2}>
              {courses.map((course, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <Card
                    sx={{
                      marginRight: '20px',
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: 0,
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        style={{ width: '100%', maxWidth: 450 }}
                      />
                      <Typography
                        variant='body1'
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {course.title}
                      </Typography>
                      <Box
                        mt={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '2',
                        }}
                      >
                        <Typography
                          variant='body2'
                          sx={{
                            border: `1px solid ${theme.palette.grey[600]}`,
                            padding: '5px 10px',
                            borderRadius: '5px',
                            marginLeft: '10px',
                          }}
                        >
                          {course.type}
                        </Typography>

                        <Typography
                          variant='body2'
                          sx={{
                            color: theme.palette.grey[600],
                            padding: '5px 10px',
                            borderRadius: '5px',
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <AccessTime sx={{ marginRight: '5px' }} />
                          {course.duration}+ Hrs
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant='determinate'
                        value={course.progress}
                        color='success'
                        sx={{
                          mt: 2,
                          mb: 1,

                          backgroundColor: theme.palette.grey[300],
                        }}
                      />
                      <Typography
                        variant='body2'
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 5,
                        }}
                      >
                        Completed : {course.progress}%
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          variant='contained'
                          sx={{ mt: 5 }}
                          // onClick={() => window.open(course.sessionLink)}
                        >
                          {course.progress === 0
                            ? 'Start Session'
                            : course.progress < 100
                            ? 'Continue Session'
                            : 'View Session'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Course;
