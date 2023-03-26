import React from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { SubmitHandler, useForm } from 'react-hook-form';

import './Contact.css';


type Props = {
  phoneNumber: string;
  email: string;
  address: string;
}

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = ({phoneNumber, email, address}: Props) => {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = formData => {
    window.location.href = `mailto:broulaye@vt.edu?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`
  };

  return (
    <div className='Contact'>
      <h3 className='Contact__Title'>Contact</h3>

      <div className='Contact__Content'>
        <h4>
          I have got just what you need <span>Let's Talk</span>
        </h4>
        <div className='Contact__Icons'>
           <div className='Contact__Icon'>
            <PhoneIcon className='Icon'/>
            <p>{phoneNumber}</p>
           </div>
           <div className='Contact__Icon'>
            <EnvelopeIcon className='Icon'/>
            <p>{email}</p>
           </div>
           <div className='Contact__Icon'>
            <MapPinIcon className='Icon'/>
            <p>{address}</p>
           </div>
        </div>


        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='Contact__Form'
        >
          <div className='Contact__Info'>
            <input 
              {...register('name')} 
              placeholder='Name'
               className='Contact__Input' 
               type='text' 
            />
            <input 
              {...register('email')} 
              placeholder='Email' 
              className='Contact__Input' 
              type='email' 
            />
          </div>

          <input 
            {...register('subject')} 
            placeholder='Subject' 
            className='Contact__Input' 
            type='text' 
          />

          <textarea 
            {...register('message')} 
            placeholder='Message' 
            className='Contact__Input' 
          />
          <button 
            className='Contact__SubmitButton'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact;