import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are the meal timings?",
      answer: "Our meals are served at the following times: Breakfast from 7:00 AM to 9:00 AM, Lunch from 12:00 PM to 2:00 PM, and Dinner from 6:30 PM to 8:30 PM.",
    },
    {
      question: "Can I change my meal plan?",
      answer: "Yes, you can modify your meal plan within the first 7 days of each month. Please contact the hostel management for changes.",
    },
    {
      question: "How do I give feedback on meals?",
      answer: "To provide feedback, please visit the 'Feedback' section on your dashboard and rate the meals served.",
    },
    {
      question: "Are special meals available during festivals?",
      answer: "Yes, we offer special meals during festivals. These meals will be announced in advance through the hostel notice board and app notifications.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/400"  // Add your image URL here
            alt="Meal Image"
            className="rounded-lg shadow-lg w-full md:w-3/4"
          />
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">
              Here are some answers to common questions about meal plans, timings, and feedback.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:bg-gray-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
