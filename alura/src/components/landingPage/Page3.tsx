import React from "react";

const Page3 = () => {
  return (
    <div className="bg-[#F8F6F4]">
      <div className="ml-20">
        <div>
          <h1 className="text-[64px] text-center py-10 leading-snug mt-3 font-bold text-[#3C797B]">
            Mental healthcare at scale
          </h1>
          <p className="text-[20.8px] text-center leading-snug text-[#3C797B]">
            Students, employers, payers, and life science companies use Alura to
            scale their services and make
            <br /> mental healthcare accessible to more people.
          </p>
        </div>

        <div className="flex ml-93 mt-18">
          <div>
            {/* left1 */}
            <img src="patient1.png" alt="" className="h-[256px]" />
          </div>
          <div className="flex flex-col justify-center ml-24">
            {/* right1 */}
            <h3 className="text-[32px] font-bold text-[#3C797B]">Patients</h3>
            <p className="text-[20px] text-[#3C797B] font-normal">
              Alura is the first responder for someone experiencing emotional
              health <br />
              issues, providing instant support whenever and wherever needed.
            </p>
          </div>
        </div>

        <div className="flex ml-93 mt-10">
          <div className="flex flex-col justify-center mr-18">
            {/* left2 */}
            <h3 className="text-[32px] font-bold text-[#3C797B]">Students</h3>
            <p className="text-[20px] text-[#3C797B] font-normal">
              Our platform is the first responder for students experiencing
              <br /> emotional challenges, offering instant support anytime they
              need it
            </p>
          </div>
          <div className="ml-20">
            {/* right2 */}
            <img src="provider1.png" alt="" className="h-[256px]" />
          </div>
        </div>

        <div className="flex ml-93 mt-10">
          <div>
            {/* left3 */}
            <img src="Employees1.png" alt="" className="h-[256px]" />
          </div>
          <div className="flex flex-col justify-center ml-28">
            {/* right3 */}
            <h3 className="text-[32px] font-bold text-[#3C797B]">Employees</h3>
            <p className="text-[20px] text-[#3C797B] font-normal">
              Alura allows employers to provide better mental health care to
              <br /> employees, ultimately increasing the team’s productivity and motivation..
            </p>
          </div>
        </div>

        <div className="flex ml-93 mt-10">
          <div className="flex flex-col justify-center mr-18">
            {/* left2 */}
            <h3 className="text-[32px] font-bold text-[#3C797B]">Life Science</h3>
            <p className="text-[20px] text-[#3C797B] font-normal">
              Alura is suitable as a companion application to a drug or potentially as a
              <br /> standalone prescription digital therapeutics.
            </p>
          </div>
          <div className="ml-20">
            {/* right2 */}
            <img src="Life_Science.png" alt="" className="h-[256px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
