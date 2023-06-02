"use client"; // This is a client component 👈🏽

import Image from 'next/image'
import React, { useState } from 'react';
import TextBox from '../components/TextBox';


export default function Home() {

  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const handleTextChange = (newText: string) => {
    setText(newText);
  };
  const handleSubmit = async () => {
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(`https://lz2chqp1r7.execute-api.us-east-1.amazonaws.com/prod/generate_response?prompt=${encodeURIComponent(text)}`);
      const data = await response.json();
      const content = data.response.choices[0].message.content;
      setOutput(content);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the response.');
    }
    setLoading(false); // Set loading state back to false
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      // href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: 'auto' }}
    >
      {' '}
      <Image
        src="/ChatGPT_logo.png"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      </a>
      </div>

      </div>

      <div style={{ fontSize: '24px', fontWeight: 'bold', position: 'relative', top: '-70px' }}>
        Let's Talk!
      </div>
      <div style={{ fontSize: '24px', position: 'relative', top: '-10px', fontFamily: 'Arial'}}>
        <div className="text-input-container"> {/* Container element for styling */}
          <TextBox
            value={text}
            onChange={handleTextChange}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={loading} // Disable the button when loading is true
      >
        {loading ? 'Loading...' : 'Submit'} {/* Display "Loading..." when loading is true */}
      </button>

      {response && (
        <div className="response-container">
        {/* //<div style={{ fontSize: '24px', fontWeight: 'bold', position: 'relative', top: '-100px' }}> */}
          
          <p>{response}</p>
        </div>
      )}

      {output && (
          // <div className="mt-4">
          <div style={{position: 'relative', top: '-100px' }}>
            <h2 className="text-lg font-semibold">Response:</h2>
            <p>{output}</p>
          </div>
        )}

      <style jsx>{`
        .text-input-container {
          width: 500px; /* Adjust the width as desired */
          height: 300px; /* Adjust the height as desired */
        }
        .submit-button {
          position: relative; /* Add position relative */
          top: -200px; /* Adjust the value to move the button higher */
          font-weight: bold;
          background-color: grey;
          color: white;
          padding: 10px 20px; /* Adjust the padding as desired */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s; /* Add transition for smoother color change */
        }
        .submit-button:hover {
          background-color: lightgrey;
        }
        .response-container {
          font-size: 16px;
          font-weight: bold;
          margin-top: 100px; /* Add some spacing at the top */
        }
      `}</style>
      {/* <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
      </div> */}
    </main>
  )
}
