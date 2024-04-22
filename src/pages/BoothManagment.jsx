import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import LatLongForm from "../components/Forms/LatLongForm";
import BoothNameForm from "../components/Forms/BoothNameForm";
import BoothAddressForm from "../components/Forms/BoothAddressForm";
import VoterDataForm from "../components/Forms/VoterDataForm";

const BoothManagment = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);


  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    { title: 'Lat-Long', form: <LatLongForm /> },
    { title: 'Booth Name', form: <BoothNameForm /> },
    { title: 'Booth Address', form: <BoothAddressForm /> },
    { title: 'Voter Data', form: <VoterDataForm /> }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-4">
      {accordionItems.map((item, index) => (
        <div key={index} className="w-full gap-2 border-b border-gray-300 ">
          <div
            className="w-full flex justify-between items-center  p-2 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white transition-colors duration-300 ${activeAccordion === index ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}"
            onClick={() => toggleAccordion(index)}
            style={{
              backgroundColor:activeAccordion === index && '#2563EB',
              color:activeAccordion === index && 'white'
            }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {
              activeAccordion === index ?
                <ChevronUp size={24} /> :
                <ChevronDown size={24} />
            }
          </div>
          {activeAccordion === index && item.form}
        </div>
      ))}
    </div>
  )
}

export default BoothManagment
