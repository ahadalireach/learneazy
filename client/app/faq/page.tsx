"use client";
import { useState } from "react";
import { Faqs, Footer, Header, PageHead } from "@/app/components";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <PageHead
        title={`Learneazy - FAQ`}
        description="Frequently Asked Questions about Learneazy. Get answers to common queries about our courses, features, and more."
        keywords="Frequently Asked Questions, Learneazy Faq, Ahad Ali LMS, Ahad Ali Project"
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <div className="pt-[80px]">
        <Faqs />
      </div>
      <Footer />
    </>
  );
};

export default Page;
