// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';

// assets
import {IconBuildingStore} from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

 
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="" src={User1} />
          </ListItemAvatar>
          <Typography variant="caption" display="block" gutterBottom>
                  دقایقی پیش
          </Typography>
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <ListItemText primary="علیرضا حسینخانی" />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid dir='rtl' item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">علی به رویداد اردوی شمال اضافه شد و لینک برای او ارسال گردید.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="خوانده نشده" sx={chipErrorSX} />
              </Grid>
              <Grid item>
                <Chip label="جدید" sx={chipWarningSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.success.dark,
                backgroundColor: theme.palette.success.light,
                border: 'none',
                borderColor: theme.palette.success.main
              }}
            >
              <IconBuildingStore stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <ListItemText primary={<Typography variant="subtitle1">مکان اردو هماهنگ شد</Typography>} />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid dir='rtl' item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">این تسک توسط مهدی موحدی از تیم اجرایی انجام شد </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="خوانده نشده" sx={chipErrorSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
     
      </List>
  );
};

export default NotificationList;
