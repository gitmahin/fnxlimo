"use client"
import { Badge, Button } from "@radix-ui/themes";
import { MainMenu } from "../header/main-menu";
import Link from "next/link";

type SocialLinksType = {
  label: string;
  slug: string;
};

const SOCIAL_LINKS: SocialLinksType[] = [
  {
    label: "Facebook",
    slug: "#",
  },
  {
    label: "Twitter",
    slug: "#",
  },
  {
    label: "Youtube",
    slug: "#",
  },
];

export const Footer = () => {
      const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-28 border-t py-10 px-5" id="contact">
      <div className="default_layout_width">
        <div className="flex justify-between items-center">
          <Badge color="purple" radius="full" size={"3"}>
            Something is here
          </Badge>
          <Button radius="full" variant="soft" size={"3"}>
            Get a quote
          </Button>
        </div>
        <div className="flex justify-between items-end foot_menu_header">
          <h2 className="text-read-56 font-medium our_fleet_heading">Ready To Travel?</h2>

          <MainMenu />
        </div>

        <div className="border-t mt-5 grid grid-cols-3 foot_menu_grid pt-9">
          <div>
            <h5 className="uppercase text-read-15 font-medium">Head Office</h5>
            <p className="text-read-15 text-zinc-300 mt-4">
              Located in Stamford, CT
            </p>
          </div>

          <div>
            <h5 className="uppercase text-read-15 font-medium">Social Links</h5>
            <ul className="leading-7 mt-4">
              {SOCIAL_LINKS.map((item, i) => {
                return (
                  <Link href={item.slug} key={i}>
                    <li className="text-read-15 text-zinc-300 hover:text-zinc-50 transition-colors ">
                      {item.label}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>

          <div>
            <div>
              <h5 className="uppercase text-read-15 font-medium mb-2">Email</h5>

              <Link
                href={"#"}
                className="text-read-24 text-zinc-300 hover:text-zinc-50 transition-colors "
              >
                youremail@gmail.com
              </Link>
            </div>

            <div className="mt-8">
              <h5 className="uppercase text-read-15 font-medium mb-2">Phone</h5>

              <Link
                href={"#"}
                className="text-read-24 text-zinc-300 hover:text-zinc-50 transition-colors "
              >
                +44584258587525
              </Link>
            </div>
          </div>
        </div>


        {/* copyright */}
        <div className="w-full mt-10">
            <p className="w-full text-center text-read-14 font-medium text-zinc-400">
            © {currentYear} Prime Limo. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};
