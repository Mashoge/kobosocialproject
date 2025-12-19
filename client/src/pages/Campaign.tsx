import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const Campaign = () => {
  // Dummy data for campaigns
  const campaigns = [
    {
      id: 1,
      title: 'Campaign 1',
      description: 'Description for Campaign 1',
      goal: 10000,
      raised: 5000,
    },
    {
      id: 2,
      title: 'Campaign 2',
      description: 'Description for Campaign 2',
      goal: 15000,
      raised: 7500,
    },
    {
      id: 3,
      title: 'Campaign 3',
      description: 'Description for Campaign 3',
      goal: 20000,
      raised: 12000,
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Campaigns
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {campaign.title}
                </Typography>
                <Typography color="textSecondary">
                  {campaign.description}
                </Typography>
                <Typography variant="body2" component="p">
                  Goal: ${campaign.goal}
                </Typography>
                <Typography variant="body2" component="p">
                  Raised: ${campaign.raised}
                </Typography>
                <Button variant="contained" color="primary">
                  Donate
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Campaign;