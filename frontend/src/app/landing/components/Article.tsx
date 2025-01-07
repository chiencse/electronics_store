import Image from 'next/image';

const Article = () => {
  const articles = [
    {
      id: 1,
      title: 'YouTube TV’s monthly cost soars to $82.99',
      date: '22 Dec 2024',
      description:
        'YouTube TV’s monthly cost soars to $82.99',
      image: '/images1art.webp',
    },
    {
      id: 2,
      title: 'Character.AI has retrained its chatbots to stop chatting up teens',
      date: '22 Dec 2024',
      description:
        'Among other newly announced changes, a specially trained under-18 model will steer minors away from romance and “sensitive” output.',
      image: '/images2art.webp',
    },
    {
      id: 3,
      title: 'Anker’s new 5K MagSafe battery is slimmer and faster',
      date: '22 Dec 2024',
      description:
        'The new power bank is Anker’s thinnest MagSafe battery and includes a boost to 15W Qi2 wireless charging speeds.',
      image: '/images3art.webp',
    },
  ];

  return (
    <section className="px-4 md:px-16 py-12 mx-16">
      <h1 className="text-3xl font-bold mb-8">Tech Article</h1>
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
