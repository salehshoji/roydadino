import { useEffect, useState } from 'react';

// material-ui
import {Button, Grid} from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const add_item = () => {
    var x = document.createElement("EarningCard");
    x.setAttribute("isLoading", {isLoading});
    document.querySelector(".variable").appendChild(x);
    console.log(x);
  };

    return (
    <Grid id = "test" container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>

          <Grid item lg={12} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={15} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={15} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={15} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={15} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid class="variable" item lg={15} md={6} sm={6} xs={12}>
          </Grid>
          <Grid item lg={15} md={6} sm={6} xs={12}>
            <Button onClick={add_item} color="success" variant="contained" size="large" fullWidth= "true" startIcon={<AddCircleOutlineIcon/>}>
              ایجاد رویداد جدید
            </Button>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  );
};

export default Dashboard;
