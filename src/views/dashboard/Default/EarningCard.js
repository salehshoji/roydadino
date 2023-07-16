import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeTwoTone';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hadel = () => {
    location.href = 'http://localhost:3000/free/utils/util-typography';
  };

  const handleDelClick = () => {
    console.log('delete this!');
    setIsSubmitted(false);
  };
  
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <>
          {isSubmitted ? (
            <CardWrapper border={false} content={false}>
              <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                  <Grid>
                    <Grid item>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.largeAvatar,
                              backgroundColor: theme.palette.secondary[800],
                              mt: 1
                            }}
                          >
                            <img src={EarningIcon} alt="Notification" />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.mediumAvatar,
                              backgroundColor: theme.palette.secondary.dark,
                              color: theme.palette.secondary[200],
                              zIndex: 1
                            }}
                            aria-controls="menu-earning-card"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreHorizIcon fontSize="inherit" />
                          </Avatar>
                          <Menu
                            id="menu-earning-card"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right'
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                            }}
                          >
                            <MenuItem onClick={handleClose}>
                              <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> افزودن کارت
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> کپی دیتا
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> خروجی با
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                            </MenuItem>
                          </Menu>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="top" dir="rtl">
                        <Grid item>
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 11, mt: 0.6, mb: 0.75 }}>
                            اردوی راهی برای چاره دیگر
                          </Typography>
                          <Typography sx={{ color: '#99D9EA', fontSize: '0.9rem', fontWeight: 300, mr: 11, mt: 0.9, mb: 0.75 }}>
                            این اردو، یک اردوی فرهنگی تفریحی برای برگزاری است و اکنون در وضعیت خوبی به سر می برد
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="start" spacing={2}>
                      <Grid id="sss" item dir="ltr">
                        <Button onClick={handleDelClick} color="error" variant="contained" startIcon={<DeleteIcon />}>
                          حذف
                        </Button>
                      </Grid>
                      <Grid item dir="ltr">
                        <Button onClick={hadel} color="inherit" variant="outlined" startIcon={<EyeIcon />}>
                          مشاهده
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardWrapper>
          ) : (
              <></>
          )}
        </>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
