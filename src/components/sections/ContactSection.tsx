import React, { useState } from "react";
import { motion } from "framer-motion";
import personalData from "../../data/personal.json";
import Input from "../ui/Input";
import FloatingParticles from "../ui/FloatingParticles";
const ContactSection: React.FC = () => {
    const [ formState, setFormState ] = useState( {
        name: "",
        email: "",
        message: "",
    } );

    const [ isSubmitting, setIsSubmitting ] = useState( false );
    const [ submitStatus, setSubmitStatus ] = useState<null | "success" | "error">( null );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target;
        setFormState( ( prev ) => ( {
            ...prev,
            [ name ]: value,
        } ) );
    };

    const handleSubmit = ( e: React.FormEvent ) => {
        e.preventDefault();
        setIsSubmitting( true );

        // Simulate form submission
        setTimeout( () => {
            console.log( "Form submitted:", formState );
            setIsSubmitting( false );
            setSubmitStatus( "success" );
            setFormState( {
                name: "",
                email: "",
                message: "",
            } );

            // Reset status after 5 seconds
            setTimeout( () => {
                setSubmitStatus( null );
            }, 5000 );
        }, 1500 );
    };

    return (
        <section id="contact" className="w-full py-10 bg-black text-white">
            <FloatingParticles />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.h2
                    className="text-3xl font-bold text-center mb-8"
                    initial={ { opacity: 0, y: 20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.6 } }
                >
                    Get In Touch
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Form */ }
                    <motion.div
                        initial={ { opacity: 0, x: -30 } }
                        whileInView={ { opacity: 1, x: 0 } }
                        viewport={ { once: true } }
                        transition={ { duration: 0.8, delay: 0.2 } }
                    >
                        <form onSubmit={ handleSubmit } className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Your Name
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={ formState.name }
                                    onChange={ handleChange }
                                    required
                                    placeholder="Enter your name"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={ formState.email }
                                    onChange={ handleChange }
                                    required
                                    placeholder="Enter your email"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={ formState.message }
                                    onChange={ handleChange }
                                    required
                                    rows={ 5 }
                                    placeholder="What would you like to discuss?"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={ isSubmitting }
                                    className="w-full justify-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
                                >
                                    { isSubmitting ? "Sending..." : "Send Message" }
                                </button>

                                { submitStatus === "success" && (
                                    <motion.p
                                        className="text-green-400 mt-2 text-center"
                                        initial={ { opacity: 0 } }
                                        animate={ { opacity: 1 } }
                                        transition={ { duration: 0.3 } }
                                    >
                                        Message sent successfully!
                                    </motion.p>
                                ) }

                                { submitStatus === "error" && (
                                    <motion.p
                                        className="text-red-400 mt-2 text-center"
                                        initial={ { opacity: 0 } }
                                        animate={ { opacity: 1 } }
                                        transition={ { duration: 0.3 } }
                                    >
                                        Failed to send message. Please try again.
                                    </motion.p>
                                ) }
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Information */ }
                    <motion.div
                        initial={ { opacity: 0, x: 30 } }
                        whileInView={ { opacity: 1, x: 0 } }
                        viewport={ { once: true } }
                        transition={ { duration: 0.8, delay: 0.4 } }
                        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30 h-fit"
                    >
                        <h3 className="text-xl font-semibold mb-6 text-purple-400">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="rounded-full bg-purple-900/30 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300">Email</h4>
                                    <a href={ `mailto:${ personalData.contact.email }` } className="text-purple-400 hover:text-purple-300 transition-colors">
                                        { personalData.contact.email }
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="rounded-full bg-purple-900/30 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300">Phone</h4>
                                    <a href={ `tel:${ personalData.contact.phone }` } className="text-purple-400 hover:text-purple-300 transition-colors">
                                        { personalData.contact.phone }
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="rounded-full bg-purple-900/30 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300">Location</h4>
                                    <p className="text-white">{ personalData.location }</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="rounded-full bg-purple-900/30 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300">GitHub</h4>
                                    <a
                                        href={ personalData.contact.github }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        github.com/hnagnurtme
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
