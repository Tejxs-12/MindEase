import React from "react";
import { TextScroll } from "../ui/text-scroll";
import WrapButton from "../ui/wrap-button";

const Page2 = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Marquee */}
      <div className=" mb-[5%]">
        <TextScroll
          text="You are stronger than you think💌"
          className="text-5xl font-bold text-[#3C797B]"
        />
      </div>

      {/* Headline with less gap */}
      <div className="bg-[#313352]">
        <div className="flex items-center justify-center">
          <h1 className="text-[48px] text-center leading-snug mt-12 font-bold text-[#3C797B]">
            Artificial intelligence to solve the <br />
            <span className="text-[#3C797B] font-extrabold text-gray-600">
              mental health crisis
            </span>
          </h1>
        </div>
        <div className="flex mt-20">
          <div className="mt-24 ml-[15%]">
            {/* left */}
            <h3 className="text-[26px] text-[#8B8B8B]">
              Demand for mental health support is increasing, <br /> but the
              supply of clinicians is not.
            </h3>
            <h3 className="text-[26px] text-[#8B8B8B] mt-6">
              Artificial intelligence can expand how we offer <br /> support to
              patients and extend the capabilities of <br /> the mental health
              workforce.
            </h3>
          </div>
          <div>
            {/* right */}
            <img
              src="pg-2-left.png"
              alt="left"
              className="h-[397px] ml-[30%] p-5 -mt-10"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-30">
        <div>
          {/* left */}
          <div className="ml-80">
            <h1 className="text-[48px] text-center leading-snug mt-16 font-bold text-[#3C797B]">
              Safe and clinically validated <br />
              <span className="text-[#3C797B] font-extrabold text-gray-600">
                artificial intelligence
              </span>
            </h1>
            <p className="text-[20.8px] text-center leading-snug mt-12 text-[#3C797B]">
              The foundation of Alura lies in evidence-based interventions —
              <br /> approaches that have been widely studied and shown to be
              effective.
              <br /> Alura is being designed with the vision to reduce symptoms
              of
              <br /> anxiety and depression through accessible digital support.
            </p>
          </div>
        </div>

        <div className="mr-80 -mt-6">
          {/* right */}
          <img src="pg-3-data1.webp" alt="" className="h-[204px] mt-6 mb-6" />
          <img src="pg-3-data2.webp" alt="" className="h-[204px] mt-6 mb-6" />
        </div>
      </div>

      <div className="flex justify-between mt-30">
        <div>
          {/* left */}
          <div>
            <div className="ml-80">
              <h1 className="text-[48px] text-center leading-snug mt-16 font-bold text-[#3C797B]">
                The most engaging mental <br />
                <span className="text-[#3C797B] font-extrabold text-gray-600">
                  health chatbot
                </span>
              </h1>
              <p className="text-[20.8px] text-center leading-snug mt-12 text-[#3C797B]">
                Alura combines psychology and artificial intelligence to
                understand <br /> users’ emotional needs and engage in natural
                conversations.
                <br /> Alura aspires to become an innovative digital health
                solution <br /> for supporting individuals with anxiety and
                depression.
              </p>
            </div>
          </div>
        </div>
        <div className="mr-80">
          {/* right */}
          <img src="phone2.jpg" alt="" className="h-[400px]" />
        </div>
      </div>

      <div className="mb-10 mt-15">
        {/* <button className="px-8 py-2 text-[20px] bg-red-500 rounded-full flex items-center text-gray-100 text-bold ml-[48%] ">Get Startted</button> */}
        <WrapButton className="ml-[27%]" />
      </div>
    </div>
  );
};

export default Page2;
