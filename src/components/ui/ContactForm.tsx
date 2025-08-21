import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

function ContactForm() {
  const [state, handleSubmit] = useForm('mkgzlead')

  if (state.succeeded) {
    return (
      <div className='text-center p-8'>
        <h3 className='text-2xl font-bold text-green-400 mb-4'>Thank you!</h3>
        <p className='text-gray-300'>
          Your message has been sent successfully. We&apos;ll get back to you
          soon!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          Email Address *
        </label>
        <input
          id='email'
          type='email'
          name='email'
          required
          className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300'
          placeholder='your.email@example.com'
        />
        <ValidationError
          prefix='Email'
          field='email'
          errors={state.errors}
          className='text-red-400 text-sm mt-1'
        />
      </div>

      <div>
        <label
          htmlFor='mobile'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          Mobile Number *
        </label>
        <input
          id='mobile'
          type='tel'
          name='mobile'
          required
          className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300'
          placeholder='+91 XXXXX XXXXX'
        />
        <ValidationError
          prefix='Mobile'
          field='mobile'
          errors={state.errors}
          className='text-red-400 text-sm mt-1'
        />
      </div>

      <div>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          Message *
        </label>
        <textarea
          id='message'
          name='message'
          required
          rows={6}
          className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none'
          placeholder='Tell us about your project requirements, timeline, and any specific needs...'
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
          className='text-red-400 text-sm mt-1'
        />
      </div>

      <button
        type='submit'
        disabled={state.submitting}
        className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
