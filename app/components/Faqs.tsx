import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faqs() {
  return (
    <div className="text-sm font-light">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-sm font-light">How do I become a part of Learniix?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-sm font-light">
          You can join Learniix either as an affiliate or a vendor.

As an affiliate, you can earn up to 50% commission or more for each sale you successfully make on the platform. It&apos;s worthy to note that our products are in high demand in the digital market. Meaning that there is a hungry audience for our products.

You can also become part of Learniix by signing up as vendor. We know that as a vendor or course creator, there is high need to increase sales capacity and reach out to a more hungry audience which will culminate into increased sales and massive profits.
Learniix had the vendors in mind while creating this platform that makes it easier for them to connect with our high performing affiliates who are like evangelists of your products to that hungry audience willing to pay for your products. Thereby making commissions for themselves as well as skyrocketing the sales of your products. This is a win-win relationship!         </Typography>
        </AccordionDetails>
      </Accordion>
    

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">Why should I choose Learniix?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-sm font-light">
          Our customer support is top-notch and lives up to its responsibility. We know how it feels when affiliates are neglected  especially when attention is needed.

Automatic and instant access to products purchased on our platform.

Products listed on our platform are high in demand in the digital market.

We have a stress-free payment processor that saves you time.     </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">How do I get paid on Learniix?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         <p className="text-sm font-light">  We made provisions for weekly payments precisely on Sundays to both our affiliates and vendors which we  baptized to be &apos;HOLY ALERTZ&apos;. The payments will be made into the accurate account details bearing your name that you provided.

Note: Your bank account name must tally with the name you signed up with. This measure is to protect you from any form of fraud.</p>


          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}