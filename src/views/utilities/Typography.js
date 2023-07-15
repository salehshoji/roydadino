import { Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
/////

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => (
  <MainCard dir="rtl" title="نام رویداد" secondary={<SecondaryAction title='بازگشت' link="http://localhost:3000/free/dashboard/default" />}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <SubCard >
          <Grid container direction="column" spacing={1}> 
            <Grid item >
              <MuiTypography  variant="h5" gutterBottom marginTop={1}>
              تاریخ 1401/12/3 
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
        <br></br>
        <SubCard sx={{backgroundColor: '#5E3AAE'}} >
          <Grid container justifyContent="start" spacing={3}>
            <Grid item>
              <MuiTypography color={'white'} variant="h5" marginTop={1} gutterBottom>
                تعداد ثبت نامی ها تا کنون 100 نفر
              </MuiTypography>
            </Grid>
            <Grid item marginRight={24}>
              <Button variant='outlined' color="warning">مشاهده لیست ثبت نامی ها</Button>
            </Grid>
          </Grid>
        </SubCard>
        <br></br>
    
      <SubCard title="توضیحات">
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <MuiTypography variant="body1" gutterBottom>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </MuiTypography>
          </Grid>
          <Grid item>
            <MuiTypography variant="body2" gutterBottom>
              
            </MuiTypography>
          </Grid>
        </Grid>
      </SubCard>


      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="برنامه روزانه">
          <Grid container direction="column" spacing={1} sm={13} alignItems={'center'}>
            <Grid item>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="left"
                    variant="body2"
                    color="text.secondary"
                  >
                    9:30 am
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <MuiTypography variant="h4" component="span">
                      ناهار
                    </MuiTypography>
                    <MuiTypography >محل غذا خوری تالار</MuiTypography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    10:00 am
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <MuiTypography variant="h4" component="span">
                      برنامه نویسی
                    </MuiTypography>
                    <MuiTypography>کارگاه در ابن سینا</MuiTypography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                      <HotelIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <MuiTypography variant="h4" component="span">
                      خواب
                    </MuiTypography>
                    <MuiTypography>استراحت در خوابگاه طرشت 3</MuiTypography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    <TimelineDot color="secondary">
                      <RepeatIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <MuiTypography variant="h4" component="span">
                      تکرار
                    </MuiTypography>
                    <MuiTypography>این گونه زندگی جریان دارد.</MuiTypography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
            <Grid item>
              <MuiTypography variant="subtitle2" gutterBottom>
                برنامه روزانه مطابق فوق میباشد
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Typography;
