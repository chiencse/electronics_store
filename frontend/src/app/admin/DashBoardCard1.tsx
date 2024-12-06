import React from 'react';
import {
  FiShoppingCart,
  FiTrendingUp,
  FiBox,
  FiGift,
  FiAward,
} from 'react-icons/fi';


interface CardData {
  icon: JSX.Element;
  amount: string;
  title: string;
  percentage: string;
  percentageColor: string;
  backgroundIcon: JSX.Element;
}

const cardsData: CardData[] = [
  {
    icon: <FiShoppingCart className="text-3xl h-10 w-10 text-green-500" />,
    amount: '$59.6k',
    title: 'Total Sales',
    percentage: '8.72%',
    percentageColor: 'text-green-500',
    backgroundIcon: (
      <FiShoppingCart
        className="h-16 w-16 text-gray-100 absolute  -z-1"
        style={{
          animation: 'bounceDiagonal 1.5s infinite ease-in-out',
          bottom: '-0.25rem',
          right: '-0.25rem',
        }}
      />
    ),
  },
  {
    icon: <FiTrendingUp className="text-3xl h-10 w-10 text-green-500" />,
    amount: '$24.03k',
    title: 'Total Expenses',
    percentage: '3.28%',
    percentageColor: 'text-red-500',
    backgroundIcon: (
      <FiTrendingUp
        className="h-16 w-16 text-gray-100 absolute  -z-1 "
        style={{
          animation: 'bounceDiagonal 1.5s infinite ease-in-out',
          bottom: '-0.25rem',
          right: '-0.25rem',
        }}
      />
    ),
  },
  {
    icon: <FiBox className="text-3xl h-10 w-10 text-purple-500" />,
    amount: '$48.7k',
    title: 'Investments',
    percentage: '5.69%',
    percentageColor: 'text-red-500',
    backgroundIcon: (
      <FiBox
        className="h-16 w-16 text-gray-100 absolute  -z-1"
        style={{
          animation: 'bounceDiagonal 1.5s infinite ease-in-out',
          bottom: '-0.25rem',
          right: '-0.25rem',
        }}
      />
    ),
  },
  {
    icon: <FiGift className="text-3xl h-10 w-10 text-orange-500" />,
    amount: '$11.3k',
    title: 'Profit',
    percentage: '10.58%',
    percentageColor: 'text-green-500',
    backgroundIcon: (
      <FiGift
        className="h-16 w-16 text-gray-100 absolute  -z-1"
        style={{
          animation: 'bounceDiagonal 1.5s infinite ease-in-out',
          bottom: '-0.25rem',
          right: '-0.25rem',
        }}
      />
    ),
  },
  {
    icon: <FiAward className="text-3xl h-10 w-10 text-yellow-500" />,
    amount: '$5.06k',
    title: 'Savings',
    percentage: '8.72%',
    percentageColor: 'text-green-500',
    backgroundIcon: (
      <FiAward
        className="h-16 w-16 text-gray-100 absolute  -z-1"
        style={{
          animation: 'bounceDiagonal 1.5s infinite  ease-in-out',

          bottom: '-0.25rem',
          right: '-0.25rem',
        }}
      />
    ),
  },
];

const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-1 bg-white shadow-md rounded-lg py-4 px-8 border border-gray-100 overflow-hidden"
        >
          {/* Background Icon */}
          <div className="absolute z-0 h-16 w-16 text-gray-100 bottom-0 right-0">
            {card.backgroundIcon}
          </div>
          
          {/* Icon Section */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2">{card.icon}</div>
          </div>
          
          {/* Amount and Title */}
          <h2 className="relative z-10 text-xl font-bold">{card.amount}</h2>
          <p className="relative z-10 text-gray-500">{card.title}</p>
          
          {/* Percentage */}
          <span
            className={`relative z-10 ${card.percentageColor} badge rounded-md bg-gray-100 px-3 py-2 font-semibold`}
          >
            {card.percentage}
          </span>
        </div>
      ))}

      {/* Keyframes */}
      <style>
        {`
          @keyframes bounceDiagonal {
            0%, 100% {
              bottom: -0.25rem;
              right: -0.25rem;
            }
            50% {
              bottom: 0.25rem;
              right: 0.25rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardCards;
