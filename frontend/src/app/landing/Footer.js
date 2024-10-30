import React from 'react';

const articles = [
  { id: 1, date: '22 Dec 2022', title: 'Make your desk more neat and beautiful', description: 'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet eros', image: 'path/to/image1' },
  { id: 2, date: '22 Dec 2022', title: 'What are the fashion trend in 2023?', description: 'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet eros', image: 'path/to/image2' },
  { id: 3, date: '22 Dec 2022', title: 'Tips for Work Life Balance', description: 'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet eros', image: 'path/to/image3' },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Article Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Lenny's Article</h2>
          <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map(article => (
            <div key={article.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-gray-400 text-xs mb-2">{article.date}</p>
                <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-16">
          <button className="border border-gray-300 text-gray-600 font-medium py-2 px-6 rounded-full hover:bg-gray-200">
            View Detail
          </button>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
            {/* Footer Logo & Description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 text-white rounded-full p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM10 17.5L5 12l1.414-1.414L10 14.672l7.586-7.586L19 8.5 10 17.5z"/></svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">Lenny</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The biggest marketplace managed by Ideologist corp, providing various kinds of daily needs and hobbies.
              </p>
            </div>

            {/* Footer Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About Lenny</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>Information</li>
                <li>Store Locator</li>
                <li>Bulk Purchase</li>
                <li>Alteration Services</li>
                <li>Gift Delivery Service</li>
                <li>Live Station</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About Lenny</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>FAQ</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
                <li>Accessibility</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>Membership</li>
                <li>Address</li>
                <li>Coupons</li>
              </ul>
              <h4 className="font-semibold text-gray-900 mt-8 mb-4">Contact Us</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>For Lenny Consumer Complaint Service</li>
                <li>(684) 555-0102 and curtisweaver@sample.com</li>
                <li>Customers Complaint Service</li>
                <li>Directorate General of the Republic of Indonesia</li>
                <li>(450) 555-0103</li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-10 border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
            <p>COPYRIGHT © LENNY CO, LTD. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <span className="hover:underline cursor-pointer">Terms of use</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;