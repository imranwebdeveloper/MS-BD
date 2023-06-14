import { MetaData } from "@/lib/metaData";
import React from "react";
export const metadata = MetaData.About;

const About = () => {
  return (
    <section className="layout container">
      <article className="bg-primary-bg-light rounded-md border my-4 p-4  md:p-20 flex flex-col gap-4 max-w-3xl mx-auto leading-5">
        <header className="text-center">
          <h1 className="text-primary-text-light">About Us</h1>
        </header>
        <p>
          Welcome to <strong>{process.env.LOGO}</strong>!
        </p>
        <main className="flex flex-col gap-4 text-justify">
          <p>
            <strong>{process.env.LOGO}</strong> is a leading online resource for
            mobile phone enthusiasts and professionals. Our website provides you
            with the latest news, reviews, and information about mobile phones,
            tablets, and other related products. Our goal is to be your go-to
            source for reliable and accurate information that helps you make
            informed decisions about mobile technology.
          </p>
          <p>
            At <strong>{process.env.LOGO}</strong>, we are passionate about
            mobile technology and strive to provide you with the most
            comprehensive and up-to-date information possible. We believe that
            mobile technology is an essential part of modern life and that it
            has the power to connect people and change lives. Our team is made
            up of dedicated professionals who are experts in their fields and
            share our commitment to mobile technology. We work tirelessly to
            bring you the best content, resources, and tools to help you stay
            informed and engaged in the world of mobile technology.
          </p>
          <p>
            Our website offers a range of services to our readers, including
            detailed product reviews, news and rumors, user guides, and price
            comparison tools. We also provide a platform for users to share
            their opinions and experiences about mobile phones and other related
            products. We pride ourselves on providing an exceptional user
            experience and are always looking for ways to improve and enhance
            our website to better serve you.
          </p>

          <p>
            Thank you for visiting <strong>{process.env.LOGO}</strong> We hope
            you find our website informative, useful, and engaging. If you have
            any questions, comments, or suggestions, please don&apos;t hesitate
            to contact us. We look forward to hearing from you and hope you will
            continue to visit us for all your mobile technology-related needs.
          </p>
        </main>
      </article>
    </section>
  );
};

export default About;
