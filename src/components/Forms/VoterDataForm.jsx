import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import {  getBooth, getConstituency, getDistrict, getState, voterData } from '../../utils/networkCalls';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const VoterDataForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
    const state = watch("state");
    const district = watch("district");
    const ac = watch("ac");
    const booth = watch("booth");
  
    const {
      isLoading: isLoadingState,
      isError: isErrorState,
      data: stateList,
      refetch: refetchState,
  } = useQuery({
      queryKey: ["state"],
      queryFn: getState,
  });
  
  const {
      isLoading: isLoadingDistrict,
      isError: isErrorDistrict,
      data: districts,
      error: districtError,
      refetch: refetchDistrict,
  } = useQuery({
      queryKey: ["district", state],
      queryFn: () => getDistrict(state),
      enabled: !!state, // Only call when state is selected
  });
  
  const {
      isLoading: isLoadingConstituency,
      isError: isErrorConstituency,
      data: constituencyList,
      refetch: refetchConstituency,
  } = useQuery({
      queryKey: ["constituency", district],
      queryFn: () => getConstituency(district),
      enabled: !!district, // Only call when district is selected
  });
  
  const {
      isLoading: isLoadingBooths,
      isError: isErrorBooths,
      data: boothList,
      refetch: refetchBooths,
  } = useQuery({
      queryKey: ["booths", ac],
      queryFn: () => getBooth(ac),
      enabled: !!ac, // Only call when AC is selected
  });
  
  
    const updateVoter = useMutation({
      mutationFn: (file) => {
        return voterData(ac,booth,file);
      },
      onError: (error) => {
        // An error happened!
        console.error("An error occurred:", error);
  
        toast.error("Error while uploading voter data", {
          position: "top-right",
          autoClose: true
        });
      },
      onSuccess: (data, variables, context) => {
        toast.success("Successfully uploaded voter data!", {
          position: "top-right",
          autoClose:true
        });
  
      }
    });

    const onSubmit = (data) => {
        const file = data.file[0]; // Access the first file from the FileList
        updateVoter.mutateAsync({ talukaId: ac, boothId:booth, file });
    };

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
        <ToastContainer position="top-right" autoClose={1000} />
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center p-4 rounded-lg mt-4 gap-4'>
              
    <div className='w-full flex flex-col gap-2'>
                    <label className='text-black font-medium text-md'>State</label>
                    <select {...register("state", { required: true })}>
                        <option value="">Select State</option>
                        {stateList && stateList.map(state => (
                            <option key={state._id} value={state._id}>{state.name}</option>
                        ))}
                    </select>
                    {errors.state && <span className="text-red-500">State is required</span>}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label className='text-black font-medium text-md'>District</label>
                    <select {...register("district", { required: true })}>
                        <option value="">Select District</option>
                        {districts && districts.map(district => (
                            <option key={district._id} value={district._id}>{district.name}</option>
                        ))}
                    </select>
                    {errors.district && <span className="text-red-500">District is required</span>}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label className='text-black font-medium text-md'>AC</label>
                    <select {...register("ac", { required: true })}>
                        <option value="">Select AC</option>
                        {constituencyList && constituencyList.map(ac => (
                            <option key={ac._id} value={ac._id}>{ac.name}</option>
                        ))}
                    </select>
                    {errors.ac && <span className="text-red-500">AC is required</span>}
                </div>
               <div className='w-full flex flex-col gap-2'>
                   <label className='text-black font-medium text-md'>Booth</label>
                   <select {...register("booth", { required: true })}>
                       <option value="">Select booth</option>
                       {boothList && boothList.map(booth => (
                            <option key={booth._id} value={booth._id}>{`${booth?.booth_serial_number} - ${booth?.name}`}</option>
                        ))}
                       {/* Add options for AC */}
                   </select>
                   {errors.booth && <span className="text-red-500">Booth is required</span>}
               </div>
               <div className='w-full flex flex-col gap-2'>
                   <label className='text-black font-medium text-md'>Voter Data File</label>
                   <input type="file" accept=".csv,.xlsx" {...register("file", { required: true })} />
                   {errors.file && <span className="text-red-500">File is required</span>}
               </div>
              
               <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
       </form>
</div>
  )
}

export default VoterDataForm
