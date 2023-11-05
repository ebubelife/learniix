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
          <Typography className="text-sm font-light">What is Learniix all about</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-sm font-light">
          Learniix is an online digital marketplace that links customers with providers of digital products through our highly skilled and effective affiliates.

With the goal of assisting young people in acquiring various digital skills and thriving independently to earn a living at the comfort of their homes or wherever they are anywhere in the world.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">What do I need to do to be part of Learniix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p className="text-sm font-light">You can Sign up as an Affiliates and promote our High-quality digital products and earn commissions of up to 50%
</p>
<p className="text-sm font-light">You can earn up to 50% commission or more for each sale you made when you sign up as an affiliate and begin promoting any of our life-changing high in demand products.
</p>

<p className="text-sm font-light">You can also become a Vendor on our platform. We understand that as a course creator or vendor. There&apos;s the need to increase your capacity and reach out to more audience thereby increasing sales and overall profit
</p>
<p className="text-sm font-light">That is why we have built a platform that makes it easy for you to connect with our network of top-performing affiliates who preach the gospel of your products to a large number of hungry audience who are ready to buy, therefore making money for themselves as well as increase sales for your product. So, you can see it&apos;s a win-win relationship.
       </p>   </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">How effective are the products on Learniix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-sm font-light">
          Part of our duty is to make sure we validate the authenticity of any product before having it published on our platform, and any product that&apos;s going to be listed on our platform must go through a rigorous inspection by our quality control team before being listed. So you can be rest assured that you&apos;re getting the best.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">Why should I choose Learniix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         <p className="text-sm font-light">  We provide excellent customer support</p>

<p className="text-sm font-light">We have multiple payment methods to make sure you have a stress free payment on our website</p>

<p className="text-sm font-light">We only list High in Demand Quality products</p>

<p className="text-sm font-light">Instant access to products purchased</p>

          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-sm font-light">How do I get paid on Learniix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         <p className="text-sm font-light"> We have in place weekly payments to all our Affiliates and Vendors and all payments are made into the account details you provided that carries your name. </p>

<p className="text-sm font-light">Note: Your bank account name must tally with your name on Learniix platform</p>



          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}