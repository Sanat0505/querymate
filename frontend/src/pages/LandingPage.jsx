import React, { useEffect } from 'react';
import { Button,Box, Typography  } from '@mui/material';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';

import { HfInference } from "@huggingface/inference";
const LandingPage = () => {

    const client = new HfInference("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");
    useEffect(() => {
      
(async()=>{

    const chatCompletion = await client.chatCompletion({
        model: "NousResearch/Hermes-3-Llama-3.1-8B",
        messages: [
            {
                role: "user",
                content: "How can I change my address in meta?"
            }
        ],
        max_tokens: 500
    });
    
    console.log(chatCompletion.choices[0].message);
}
)()


    }, [])
    

  return (
    <section className="bg-white dark:bg-gray-900">
        <Header />
        <HeroSection />
        <Features />
        <Footer />
    </section>
  );
};

export default LandingPage;
