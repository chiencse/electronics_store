import Image from 'next/image';

const Article = () => {
  const articles = [
    {
      id: 1,
      title: 'Make your desk more neat and beautiful',
      date: '22 Dec 2022',
      description:
        'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras',
      image: '/path-to-image1.jpg',
    },
    {
      id: 2,
      title: 'What are the fashion trend in 2023?',
      date: '22 Dec 2022',
      description:
        'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras',
      image: '/path-to-image2.jpg',
    },
    {
      id: 3,
      title: 'Tips for Work Life Balance',
      date: '22 Dec 2022',
      description:
        'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras',
      image: '/path-to-image3.jpg',
    },
  ];

  return (
    <section className="px-4 md:px-16 py-12 mx-16">
      <h1 className="text-3xl font-bold mb-8">Lenny’s Article</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white border rounded-lg overflow-hidden shadow-md"
          >
            <div className="h-40 relative">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">{article.date}</p>
              <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-white text-green-700 border border-green-700 px-6 py-2 rounded-full hover:bg-green-100 transition">
          View Detail
        </button>
      </div>
    </section>
  );
};

export default Article;
