import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head'; // Correct import

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI Flash
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit"href="/sign-up">Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

<Box sx={{textAlign: 'center', my: 10}}     >

<Typography variant ="h2">Welcome to AI Flash </Typography>
<Typography variant ="h5">The easiest method to create your flashcards from your documents</Typography>
<Button variant="contained" color='primary' sx={{mt: 2}}>Get Started </Button>

</Box>


<Box>
<Typography variant="h4">
Features
</Typography>

<Grid container spacing = {4}>

<Grid item xs={12} md={4}>
<Typography variant="h6">Easy Input</Typography>
<Typography>


{'   '}

Simply input your document and let the software turn it into the ideal test flashcards for you!
</Typography>


</Grid>

<Grid item xs={12} md={4}>
<Typography variant="h6">Smart Flashcards</Typography>
<Typography>


{'   '}

Test your knowledge from the documents and powerpoints, with flashcards on any concept!
</Typography>


</Grid>


<Grid item xs={12} md={4}>
<Typography variant="h6">Accessible Anywhere</Typography>
<Typography>


{'   '}

Learn from anywhere, at anytime!
</Typography>


</Grid>

</Grid>

</Box>


<Box sx={{my: 6, textAlign:"center"}}>


<Typography variant="h4" gutterBottom>
Pricing
</Typography>

<Grid container spacing = {4}>

<Grid item xs={12} md={6}>


<Box sx={{

  p:3,
  border: '1px solid',
  borderColor: 'grey.300',
borderRadius: '2',
}}>


<Typography variant="h5" gutterBottom>Basic</Typography>
<Typography variant="h6" gutterBottom>$5 / month</Typography>
<Typography>


{'   '}

Access to basic card features and limited storage
</Typography>
<Button variant="contained" color="primary"> Choose Basic</Button>
</Box>
</Grid>

<Grid item xs={12} md={6}>


<Box sx={{

  p:3,
  border: '1px solid',
  borderColor: 'grey.300',
borderRadius: '2',
}}>


<Typography variant="h5" gutterBottom>Pro</Typography>
<Typography variant="h6" gutterBottom>$10 / month</Typography>
<Typography>


{'   '}

Unlimited flashcards and storage with priority support
</Typography>
<Button variant="contained" color="primary"> Choose Pro</Button>
</Box>
</Grid>



</Grid>


</Box>


    </Container>
  );
}
