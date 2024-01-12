import { Grid, Icon } from "@mui/material";
import Link from "next/link";


export default function Footer() {


    return (


        <>
        <div className='md:h-32'></div>


        <div className="grid md:grid-cols-3 grid-cols-1 md:h-[300px] bg-black mt-auto">
  {/* First Section with Right Border */}
  <div className="border-r border-zinc-500 p-4 text-center  text-slate-300">
   <img src="/images/home/79DFB8E8-E625-4406-8B37-A6572D695310_4_5005_c.jpeg" className="h-20 w-80" alt="alt-logo-learniix"/>

   <p className="text-white mt-4 text-sm text-left">
   Learniix stands as a digital marketplace dedicated to assisting digital product creators in boosting their sales and expanding their customer base through our platform and a network of top-performing affiliates.
   </p>
  </div>

  {/* Second Section */}
  <div className="p-4 text-center  text-slate-300">
   <p className="text-white mt-4">Quick Links</p>

   <Link href="/about">
  <p className="text-white mt-4 hover:text-green-500">About Us</p>
</Link>

<Link href="/affiliates/signin">
  <p className="text-white mt-4 hover:text-green-500">Affiliates</p>
</Link>

<Link href="/vendors/signin">
  <p className="text-white mt-4 hover:text-green-500">Vendors</p>
</Link>

<Link href="/terms">
  <p className="text-white mt-4 hover:text-green-500">Terms</p>
</Link>

<Link href="/privacy-policy">
  <p className="text-white mt-4 hover:text-green-500">Privacy Policy</p>
</Link>
  </div>

  {/* Last Section with Left Border */}
  <div className="border-l border-zinc-500 p-4 text-center  text-slate-300">
   <p>Contact Us</p>

   <p className="mt-2 text-green-500">Send us an email - admin@learniix.com</p>

   <div className="grid grid-cols-3 gap-4 mt-4 place-content-center md:px-0 px-10">

    <img src="/images/home/facebook-svgrepo-com (2).svg" className="md:h-16 md:w-16 h-8 w-8" alt=" "/>

    <img src="/images/home/twitter-social-logotype-svgrepo-com.svg" className="md:h-16 md:w-16 h-8 w-8" alt=" "/>

    <img src="/images/home/youtube-svgrepo-com (2).svg" className="md:h-16 md:w-16 h-8 w-8" alt=" "/>
   </div>
  </div>
</div>

        </>

    )

}